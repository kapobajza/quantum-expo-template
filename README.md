# Quantum expo template <!-- omit in toc -->

Welcome to the Quantum expo template!

## Table of Contents <!-- omit in toc -->

- [Git rules](#git-rules)
- [Getting started](#getting-started)
- [Running the app](#running-the-app)
- [Styling guide](#styling-guide)
- [Testing](#testing)
- [Adding new translations](#adding-new-translations)
  - [Updating `translation-schema.json`](#updating-translation-schemajson)
  - [Adding the actual translations](#adding-the-actual-translations)
  - [Adding validation translations](#adding-validation-translations)
- [Adding new icons/SVGs](#adding-new-iconssvgs)


## Git rules

We recommend using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. You should also consider it, since the commit messages are validated by the [commitlint](https://commitlint.js.org/) tool.

## Getting started

Before running the app, there are some prerequisites which need to be met:

- Node v23.11.0. We're using [Node Version Manager](https://github.com/nvm-sh/nvm) to manage Node versions. If you'd like to do it as well, then install `nvm` and run `nvm install` followed by `nvm use` from the root of the repo.
- pnpm v10.10.0 - you can run `corepack enable` and it will be installed automatically.

Once you have all the prerequisites met, run

```sh
pnpm install
```

## Running the app

To run the app you can use:

```sh
# run the iOS app
pnpm run ios

# run the Android app
pnpm run android
```

## Styling guide

The styling guide is available [here](./.github/resources/Styling.md).

## Testing

[Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) is used for testing.

To run tests, you can use:

```sh
# run tests
pnpm test

# run tests in watch mode
pnpm test:watch
```

> [!WARNING]
> Since React Native Testing Library is not used, it essentially means that the UI is not being tested. Which means you will be able to test whatever you want to (hooks, functions, etc.), except React Native components. To test the UI and everything else as a whole, you can use something like [Detox](https://wix.github.io/Detox/).

## Adding new translations

To add new translations follow the steps below.

### Updating `translation-schema.json`

To add new translations, make sure to first add the relevant key to the [`translation-schema.json`](./translation-schema.json) file.

Translations should be categorized by screens. If we had a `Foo` screen that has a `bar` translation key, then we would add the following to the `translation-schema.json` file:

```json
{
  ...
  "properties": {
    "foo": {
      "type": "object",
      "required": ["bar"],
      "properties": {
        "bar": { "type": "string" }
      }
    },
  }
}
```

### Adding the actual translations

After you're done updating the `translation-schema.json` file, you can add the translations to the appropriate language file located in the [`src/locale/resources`](./src/locale/resources) directory. If your VSCode editor is properly set up, you should get warnings until you add the missing translations. For example:

```json
{
  "foo": {
    "bar": "baz"
  }
}
```

After that make sure to run

```sh
pnpm generate_translation_types
```

This will run the script to generate translation types in watch mode, it will watch json files in the `src/locale/resources` directory.

### Adding validation translations

To add new validation translations, first make sure to add your fields to the `validation.fields` object inside of the [`translation-schema.json`](./translation-schema.json) file:

```json
...
"validation": {
  "type": "object",
  "required": ["fields"],
  "properties": {
    "fields": {
      "type": "object",
      "required": ["email", "firstName"],
      "properties": {
        "email": { "type": "string" },
        "firstName": { "type": "string" }
      }
    },
    ...
  }
},
```

Now you should also add the appropriate message, if it doesn't exist, to the `validation.messages` object inside of the same [`translation-schema.json`](./translation-schema.json) file:

```json
...
"validation": {
  "type": "object",
  "required": ["fields"],
  "properties": {
    "messages": {
      "type": "object",
      "required": ["required", "other", "email", "min"],
      "properties": {
        "required": { "type": "string" },
        "email": { "type": "string" },
        "other": { "type": "string" },
        "min": { "type": "string" }
      }
    }
  }
},
```

Now you can add the actual translations to the appropriate language resource files, as described in [Adding the actual translations](#adding-the-actual-translations).

To create a new validation schema in your code, use the [`createValidationSchema`](src/validation/util.ts) function, which will give you type safety for your fields:

```ts
const { control, handleSubmit } = useForm({
  schema: createValidationSchema({
    email: z.string().min(5).email(),
  }),
});
```

## Adding new icons/SVGs

To add new icons/SVGs, first run:

```sh
pnpm run generate_svg_icons
```

This will start the icon generator CLI in watch mode.

After that place the `.svg` file inside of the [`assets/icons`](assets/icons). This will detect new file changes and will cause the icon generator CLI to run.

Let's say we added an `assets/icons/home.svg` file. After adding it, and after the CLI finishes generating the TSX file, we can use the [`Icon`](src/components/Icon/Icon.tsx) component and its name property to display it:

```tsx
import { Icon } from '@/components/Icon';

...

<Icon name="Home" width="4" height="4" color="primary.500" />
```
