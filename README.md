# tabellius-frontend

Svelte (Sapper) and TailwindCSS powered application built for learning purposes. Allows you to browse post stamps based on open data from the Finnish Postal Museum (Postimuseo.fi).

👉 View demo: https://tabellius.vercel.app/

## Licenses

### Source code
Source code is under the GNU APGLv3 License.

Tabellius - Copyright (C) 2021 - present

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public version 3 License as published
by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
[GNU Affero General Public License](https://www.gnu.org/licenses/gpl-3.0.html) for more details.

### Data
Data is sourced from [Avoindata.fi](https://www.avoindata.fi/data/fi/dataset/suomalaiset-postimerkit) and it is provided by the [Finnish Postal Museum](https://www.postimuseo.fi/en/the-finnish-postal-museum/) under the name "Suomalaiset postimerkit".
Data source is under the [Creative Commons Attribution 4.0 Intrnational License](https://creativecommons.org/licenses/by/4.0/). Original data has been manipulated only slightly; some key mappings were renamed to url friendly format, e.g. by removing scandinavian letters.


## Getting started


### Using `degit`

To create a new project based on my source code locally, run

```bash
npx degit "msyyn/tabellius-frontend" my-app
```

[`degit`](https://github.com/Rich-Harris/degit) is a scaffolding tool that lets you create a directory from a branch in a repository.

Replace `my-app` with the path where you wish to create the project.

### Running the project

Once you have created the project and configured it, install dependencies and run the project in development mode:

```bash
cd my-app
npm install # or yarn
npm run dev
```

This will start the development server on [localhost:3000](http://localhost:3000). Open it and click around.

You now have a fully functional copy of the project. To get started developing, consult [sapper.svelte.dev](https://sapper.svelte.dev) documentation.

### Deploying to Vercel

You can deploy the build version to Vercel by installing the Vercel CLI.
```bash
npm i -g vercel
```
And then run the terminal command `vercel` in your app directory.
