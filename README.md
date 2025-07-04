# Quantum expo template <!-- omit in toc -->

Welcome to the Quantum expo template!

This template contains a lot of prebuilt stuff, including:

- ESLint and TS strictest configurations
- Prettier configuration
- Commitlint and Lefthook for commit message validation
- Vitest and React Testing Library for testing
- Zod for validation
- React Query for data fetching
- Persisted React Query cache, which makes the app work offline out of the box
- SQLite database with Drizzle ORM
- Ready-made API client for easier REST API interactions
- React Hook Form for form management
- i18n for translations
- Custom theming solution
- SVG icon generator
- And much more!

## Table of Contents <!-- omit in toc -->

- [Git rules and hooks](#git-rules-and-hooks)
- [Getting started](#getting-started)
- [Running the app](#running-the-app)
- [UI Styling and Theming guide](#ui-styling-and-theming-guide)
- [Testing](#testing)
- [Adding new translations](#adding-new-translations)
  - [Updating `translation-schema.json`](#updating-translation-schemajson)
  - [Adding the actual translations](#adding-the-actual-translations)
  - [Adding validation translations](#adding-validation-translations)
- [Adding new icons/SVGs](#adding-new-iconssvgs)


## Git rules and hooks

We recommend using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages. You should also consider it, since the commit messages are validated by the [commitlint](https://commitlint.js.org/) tool.

To enable commitlint to run on every commit, you can run

```sh
pnpm dlx lefthook install
```

And to enable it for everyone else on the team, you can add the following to your `package.json` file:

```json
{
  "scripts": {
    "postinstall": "lefthook install"
  }
}
```

## Getting started

Before running the app, there are some recommendations which you could follow to ensure a smooth development experience:

- Use a pinned Node version. `v23.11.0` is the one I would recommend. Using [Node Version Manager](https://github.com/nvm-sh/nvm) is highly recommended. If you'd like to do so, then install `nvm`. After that add a `.nvmrc` file to the root directory with the Node version you would like to use. Recommend other team members to install `nvm` also and run `nvm use` to switch to the correct Node version. **NOTE**: `nvmrc` is also being used in the CI, so if you don't add a `.nvmrc` file, update the [code_checks.yml](.github/workflows/code_checks.yaml) file to update the Node version. Otherwise, the CI will fail.
- pnpm v10.12.4 - you can run `corepack enable` and it will be installed automatically.
- For some reason the `.prettierrc.js` file is missing after the app is installed. So you will have to add it manually. Add a `.prettierrc.js` file to the root of the repo, with the following content:

```js
/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  bracketSpacing: true,
  bracketSameLine: false,
  trailingComma: 'all',
};
```

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

> [!NOTE]
> Since we're working with development builds from the get go, you should be aware of the `pnpm run ios:clean` or `pnpm run android:clean` commands. You can use them to run a clean `expo prebuild`, which is useful when you install a new package that requires native code changes, or when you want to reset the native code to the state it was in when you first cloned the repo.

## UI Styling and Theming guide

The UI Styling and Theming guide is available [here](./.github/resourcees/Styling.md).

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
