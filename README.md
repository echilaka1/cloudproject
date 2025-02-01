# Simple React Authentication Project for Cloud Computing

## Front Technologies Used

- React
- JavaScript
- Bootstrap
- JWT Decode

## Commands

After you download this project, these commands are available in `package.json`.

Make sure [NodeJS](https://www.nodejs.org/) or [Yarn](https://www.yarnpkg.com) is installed on your machine.

```bash
'yarn install' or 'npm install' to install dependencies # run the app in development mode
```

## Running the app

After installing dependencies,

```bash
$ npm start or yarn start
```

## Directory structure

### Overview

```tree
├─ src/
│  ├─ assets/
|  |  ├─css
|  |  ├-images
|  ├─ components/
|  |  ├─Button
|  |  ├─inputField
|  ├─ routes/
|  |  ├─privateRoute.js
|  |  ├─routes.js
│  ├─ utils/
|  |  ├─apiUtils.js
|  |  ├-authUtils.js
|  |  ├-constants.js
|  |  ├─history.js
│  ├─ pages/
|  |  ├─ auth
|  |  |  ├─ login
|  |  |  ├─ register
|  |  ├─ dashboard
├─ package.json
├─ index.js
├─ App.js
└─ README.md
```

## Building the application

I created an env file locally to save constant e.g. backend url.
.env which uses ```bash
$ npm start - to test locally

````

To build the application:
```bash
$ npm run build - deploys to production
````

We can set up other build area based on preference.
