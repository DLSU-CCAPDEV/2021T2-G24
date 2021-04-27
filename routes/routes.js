const express = require(`express`);
const controller = require(`../controllers/controller.js`)

const app = express();

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, controller.getSignUp);

// app.post(`/sign-up`, controller.postSignUp);

app.get(`/sign-in`, controller.getSignIn);

// app.post(`/sign-in`, controller.postSignIn);

app.get(`/profile/:username`, controller.getProfile);

module.exports = app;
