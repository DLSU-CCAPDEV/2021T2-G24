const express = require(`express`);
const controller = require(`../controllers/controller.js`)

const app = express();

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, controller.getSignUp);

app.post(`/sign-up`, controller.postSignUp);

app.post(`/sign-up-success`, controller.postSignUpSucess);

app.get(`/sign-in`, controller.getSignIn);

app.post(`/sign-in`, controller.postSignIn);

app.get(`/sign-in-failure`, controller.getSignInFailure);

app.get(`/feed`, controller.getHotFeed, controller.getNewFeed, controller.getFeed);

app.post(`/feed`, controller.getCustomFeed, controller.getHotFeed, controller.getNewFeed, controller.postFeed);

app.get(`/profile/:username`, controller.getProfile);

module.exports = app;
