const fs = require('fs');
const { parse, TYPE } = require('@formatjs/icu-messageformat-parser');
const path = require('path');
const { spawnSync } = require('child_process');

/** @type {Record<string, string>} */
const translations = JSON.parse(
  fs.readFileSync('./src/locale/resources/en.json', 'utf8'),
);

/** @type {Record<string, string>} */
const translationSchema = JSON.parse(
  fs.readFileSync('./src/locale/translation-schema.json', {
    encoding: 'utf-8',
  }),
);

/** @param {import('@formatjs/icu-messageformat-parser').MessageFormatElement[]} elements */
const extractParams = (elements) => {
  /** @type {Map<string, string>} */
  const paramsMap = new Map();

  for (const element of elements) {
    if (element.type === TYPE.tag) {
      const childParams = extractParams(element.children);
      for (const { key, tsType } of childParams) {
        if (!paramsMap.has(key) || tsType === 'number') {
          paramsMap.set(key, tsType);
        }
      }
    }

    if (element.type === TYPE.select) {
      const value = Object.keys(element.options)
        .filter((key) => key !== 'other')
        .map((option) => `'${option}'`)
        .join(' | ');

      if (!paramsMap.has(element.value) || value === 'number') {
        paramsMap.set(element.value, value);
      }
    }

    if (element.type === TYPE.plural) {
      paramsMap.set(element.value, 'number');
    }

    if (element.type === TYPE.argument) {
      if (!paramsMap.has(element.value)) {
        paramsMap.set(element.value, 'string | number | undefined');
      }
    }
  }

  const params = Array.from(paramsMap, ([key, value]) => ({
    key,
    tsType: value,
  }));

  return params;
};

/**
 * @param {Record<string, any>} object The nested translations object
 * @param {string} prefix Current path prefix
 * @returns {Record<string, string>} Flattened translations
 */
function getFlattenedTranslationsObj(object, prefix = '') {
  if (!object || typeof object !== 'object') {
    return {};
  }

  let result = {};

  for (const [key, value] of Object.entries(object)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === 'object') {
      result = {
        ...result,
        ...getFlattenedTranslationsObj(value, currentPath),
      };
    } else {
      result[currentPath] = value;
    }
  }

  return result;
}

/**
 *
 * @param {Record<string, string>} schema
 * @param {string[]} path
 * @returns {string[]}
 */
function flattenSchemaKeys(schema, path = []) {
  let keys = [];

  if (schema.type === 'object' && schema.properties) {
    for (const [key, value] of Object.entries(schema.properties)) {
      const currentPath = [...path, key];
      if (value.type === 'object') {
        keys.push(...flattenSchemaKeys(value, currentPath));
      } else {
        keys.push(currentPath.join('.'));
      }
    }
  }

  return keys;
}

const schemaKeys = flattenSchemaKeys(translationSchema);
const flattenedTranslationsObj = getFlattenedTranslationsObj(translations);

const filePath = path.join(__dirname, '..', 'src/types/translation.type.ts');

const stream = fs.createWriteStream(filePath);

stream.write(
  "// This file is auto-generated, you shouldn't modify it manually\n\nexport interface TranslationKeyParam {\n",
);

const possibleTranslationObj = Object.entries(flattenedTranslationsObj).filter(
  ([key]) => schemaKeys.includes(key),
);

for (const [key, value] of possibleTranslationObj) {
  const astElements = parse(value);
  const params = extractParams(astElements).map(
    ({ key, tsType }) => `${key}: ${tsType}`,
  );
  stream.write(
    `'${key}': ${
      params.length > 0
        ? `{ 
            ${params.join(',')} 
          }`
        : 'undefined'
    },`,
  );
}

stream.write('};');
stream.end(
  '\n\nexport type TranslationKey = keyof TranslationKeyParam;',
  async () => {
    spawnSync('npx', ['prettier', '--write', filePath], { stdio: 'inherit' });
    console.log(`Translation types generated in this file: \n${filePath}\n`);
  },
);
