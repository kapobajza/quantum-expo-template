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
- Type-safe translations
- Type-safe environment variables
- Custom theming solution
- SVG icon generator
- And much more!



## Table of Contents <!-- omit in toc -->

- [Demo](#demo)
- [Git rules and hooks](#git-rules-and-hooks)
- [Getting started](#getting-started)
  - [(Optional) Getting started with Supabase](#optional-getting-started-with-supabase)
- [Running the app](#running-the-app)
- [UI Styling and Theming guide](#ui-styling-and-theming-guide)
- [Testing](#testing)
- [Adding new translations](#adding-new-translations)
  - [Setting up your VSCode editor](#setting-up-your-vscode-editor)
  - [Updating `translation-schema.json`](#updating-translation-schemajson)
  - [Adding the actual translations](#adding-the-actual-translations)
  - [Adding validation translations](#adding-validation-translations)
- [Adding new icons/SVGs](#adding-new-iconssvgs)


## Demo

Here is a demo of the template in action:

https://github.com/user-attachments/assets/287c821c-1c2b-42f2-98dd-d8a99c4d800f

## Git rules and hooks

Using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages is recommended. You should also consider it, since the commit messages can be validated by the [commitlint](https://commitlint.js.org/) tool.

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

- Expo doesn't allow copying dot files into your project from a template, so we will need to rename these files by adding a dot at the beginning of their names. You can do this by running the command: `pnpm run rename_to_dot_files`. Or rename them manually:
  - `env.example` to `.env.example`
  - `prettierrc.js` to `.prettierc.js`
  - `github` to `.github`
- Use a pinned Node version. `v23.11.0` is the one I would recommend. Using [Node Version Manager](https://github.com/nvm-sh/nvm) is highly recommended. If you'd like to do so, then follow these steps:
  -  Install `nvm`
  -  Add a `.nvmrc` file to the root directory with the Node version you would like to use.
  -  Recommend other team members to install `nvm` also and run `nvm use` to switch to the correct Node version.
  -  **NOTE**: `nvmrc` is also being used in the CI, so if you don't add a `.nvmrc` file, update the [code_checks.yml](.github/workflows/code_checks.yaml) file to and set your desired Node version. Otherwise, the CI will fail.
- pnpm v10.12.4 - you can run `corepack enable` and it will be installed automatically.

Now you can install the dependencies by running:

```sh
pnpm install
```

### (Optional) Getting started with Supabase

This template is designed to work with [Supabase](https://supabase.com/). However, Supabase's REST API has been used directly with axios, instead of using the Supabase client. This is because I didn't use Supabase for any project I built with this template, but I wanted to add it just because it is easy to set up and use. I also wanted to show you an example on how to create and use your own custom REST API client, which is located in the [`src/api/factory`](./src/api/factory) directory. Feel free to remove it if you don't need it.

If you want to use Supabase, you can follow these steps:
1. Create a new Supabase project at [Supabase](https://supabase.com/)
2. Add your Supabase URL and API key to the `.env` file. See the [`.env.example`](.env.example) file for reference.
3. Add your deep linking `scheme` to the `app.json` file, for example:
   ```json
   {
     "scheme": "my-app"
   }
   ```
4. Under "Authentication" > "URL Configuration", find the "Redirect URLs" section and add the following deep linking URL:
   ```
   <scheme>://auth/email-confirmed
   # <scheme> should be replaced with the one you set in the `app.json` file, in step 3.
   # For example, if your scheme is `my-app`, then the URL should be `my-app://auth/email-confirmed`
   ```
5. That's it. Congratulations!

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

The UI Styling and Theming guide is available [here](./.github/resources/Styling.md).

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

### Setting up your VSCode editor

To display warnings for missing translations keys in your VSCode editor, you should add this to your `.vscode/settings.json` file:

```json
{
  "json.schemas": [
    {
      "fileMatch": ["src/locale/resources/*.json"],
      "url": "./src/locale/translation-schema.json"
    }
  ]
}
```

### Updating `translation-schema.json`

To add new translations, make sure to first add the relevant key to the [`translation-schema.json`](./src/locale/translation-schema.json) file.

My recommendation is to categorize translations by screens. If we had a `Foo` screen that has a `bar` translation key, then we would add the following to the `translation-schema.json` file:
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
