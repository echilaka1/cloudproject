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

## Testing and building the application locally

I created an .env file locally to save constant, after creating the env file, add this to the env file: REACT_APP_API_ENDPOINT=http://localhost:3001

http://localhost:3001 is to be replaced with the endpoint for the backend server.

After setting up the env file, run:

```bash
$ npm start - to test locally
```

To build the application:

```bash
$ npm run build - deploys to production
```

We can set up other build area based on preference.
