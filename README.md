# React Social-Net App

[![Netlify Status](https://api.netlify.com/api/v1/badges/57e1f85b-fe7b-488d-815b-7cf3a853c831/deploy-status)](https://app.netlify.com/sites/snoapp/deploys)\
A training Front End  project for creating a multi-page social-net app. The application receives data from the api through rest api requests. The social network receives a list of users and information about users. Message exchange is implemented via a web socket. \
This course is on the YouTube channel [IT-KAMASUTRA](https://www.youtube.com/channel/UCTW0FUhT0m-Bqg2trTbSs0g).

![Example site](https://user-images.githubusercontent.com/70297692/133305131-2c31a0ac-f681-4d0e-8aa2-30765b978290.gif)

## Technologies used

- [React](https://reactjs.org/) single page application
- [TypeScript](https://www.typescriptlang.org) - a strongly typed programming language
- Routing done using [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
- [Hooks](https://reactjs.org/docs/hooks-intro.html)
- API via [Axios](https://axios-http.com/) and [WebSocket](https://developer.mozilla.org/ru/docs/Web/API/WebSocket)
- Store: [Redux](https://redux.js.org/), [Redux-Thunk](https://github.com/reduxjs/redux-thunk), [Reselect](https://github.com/reduxjs/reselect)
- Design: [Ant Design](https://ant.design/)
- ... \[other technologies\]

## Setup

1. Clone the repository and install the dependencies
```bash
yarn install
```
2. Start the frontend application locally
```bash
yarn start
```
3. For Login use this:

Email: `free@free.com`
Password: `12345`

## Testing

The testing strategy for this project is based on [Jest](https://jestjs.io/): test runner developed by Facebook, it ships with `create-react-app`. It is also used to mock some of the modules that are required on the tests.

The main principle behind the testing philosophy of this approach is:
> The more your tests resemble the way your software is used, the more confidence they can give you.


### How to run tests

To start watch mode, just do:

```bash
yarn test
```

It is suggested that you keep your terminal opened while in watch mode. As you edit your code, your tests will be automatically re-run. Look at the terminal for more instructions on the watch mode usage.

## Routes

This project is using [`react-router-dom`](https://reacttraining.com/react-router/core).

There are several routes to navigate to different pages of the app:

- Profile - user info page.
- *Messages - maintained*
- Friends - users list with sorting
- Chat - websocket public chat

## State management

Redux whith Redux middleware.

### Test deployment

The `clientSN` branch deploys to https://snoapp.netlify.app/

---

This app was bootstraped based on the template provided by [`create-react-app`](https://github.com/facebook/create-react-app)
