const express = require(`express`);
const controller = require(`../controllers/controller.js`)

const app = express();

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, controller.getSignUp);

app.post(`/sign-up`, controller.postSignUp);

app.get(`/sign-up-success`, controller.getSignUpSucess);

app.get(`/sign-in`, controller.getSignIn);

app.post(`/sign-in`, controller.postSignIn);

app.get(`/sign-in-failure`, controller.getSignInFailure);

app.get(`/sign-out`, controller.getSignOut);

app.get(`/feed`, controller.getCustomFeed, controller.getHotFeed, controller.getNewFeed, controller.getTrendingTags, controller.getFeed);

app.get(`/create-post`, controller.getCreatePost);

app.get(`/profile/:username`, controller.getProfile);

module.exports = app;
