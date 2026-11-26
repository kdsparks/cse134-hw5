# Using Astro as a Static Site Generator

## Setup
In a terminal of your choosing (e.g. Terminal for macOS/Linux, Command Prompt for Windows), either install Node.js or verify you have already installed it.

To check if Node.js is already installed, run:

```sh
node -v
```
If a version number is returned, Node.js is already installed. If not, visit [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install.

To create an Astro project, you can use the Astro setup wizard:

```sh
npm create astro@latest
```
When prompted, enter 'y', then the name for the new directory (make sure it is not a directory that already exists!).
For starter templates, you can select the minimal (empty) template.

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name. You can add additional pages to this directory.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

To preview the project as a website, run the `npm run dev` command and click on the `localhost` link.