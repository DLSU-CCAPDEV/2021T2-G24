const express = require(`express`);
const controller = require(`../controllers/controller.js`)

const app = express();

// routes related to hbs

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, controller.getSignUp);

app.post(`/sign-up`, controller.postSignUp);

app.get(`/sign-up-failure`, controller.getSignUpFailure);

app.get(`/sign-up-success`, controller.getSignUpSucess);

app.get(`/sign-in`, controller.getSignIn);

app.post(`/sign-in`, controller.postSignIn);

app.get(`/sign-in-failure`, controller.getSignInFailure);

app.get(`/sign-out`, controller.getSignOut);

app.get(`/feed`, controller.getCustomFeed, controller.getHotFeed, controller.getNewFeed, controller.getTrendingTags, controller.getFeed);

app.get(`/tag/:tag`, controller.getHotTag, controller.getNewTag, controller.getTrendingTags, controller.getTag);

app.get(`/create-post`, controller.getCreatePost);

app.get(`/post/:postID`, controller.getPost);

app.get(`/profile/:username`, controller.getProfilePosts, controller.getProfileComments, controller.getProfileFollowedUsers, controller.getProfileUser, controller.getProfile);

app.get(`/settings`, controller.getProfileSettings);

app.get(`/advanced-search`, controller.getAdvancedSearch);

app.get(`/search-results`, controller.getMatchedPosts, controller.getMatchedUsers, controller.getMatchedTags, controller.getSearchResults);

// routes related to js

app.get(`/update-upvote`, controller.updateUpvote);

app.get(`/update-downvote`, controller.updateDownvote);

app.get(`/check-status`, controller.checkStatus);

module.exports = app;
