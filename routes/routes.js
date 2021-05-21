const express = require(`express`);
const signUpController = require(`../controllers/sign-up-controller.js`);
const signInController = require(`../controllers/sign-in-controller.js`);
const searchResultsController = require(`../controllers/search-results-controller.js`);
const postController = require(`../controllers/post-controller.js`);
const createPostController = require(`../controllers/create-post-controller.js`);
const createFeaturedWorkController = require(`../controllers/create-featured-work-controller.js`);
const settingsController = require(`../controllers/settings-controller.js`);
const controller = require(`../controllers/controller.js`);

const app = express();

// routes related to hbs

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, signUpController.getSignUp);

app.post(`/sign-up`, signUpController.postSignUp);

app.get(`/sign-up-failure`, signUpController.getSignUpFailure);

app.get(`/sign-up-success`, signUpController.getSignUpSucess);

app.get(`/sign-in`, signInController.getSignIn);

app.post(`/sign-in`, signInController.postSignIn);

app.get(`/sign-in-failure`, signInController.getSignInFailure);

app.get(`/sign-out`, controller.getSignOut);

app.get(`/feed`, controller.getCustomFeed, controller.getHotFeed, controller.getNewFeed, controller.getTrendingTags, controller.getFeed);

app.get(`/tag/:tag`, controller.getHotTag, controller.getNewTag, controller.getTrendingTags, controller.getTag);

app.get(`/create-post`, createPostController.getCreatePost);

app.post(`/create-post`, createPostController.uploadImage, createPostController.postCreatePost);

app.get(`/delete-post/:postID`, controller.postDeletePost);

app.get(`/post/:postID`, postController.getComments, postController.getPost);

app.get(`/create-comment/:postID`, controller.getCreateComment);

app.post(`/create-comment/:postID`, controller.postCreateComment);

app.get(`/edit-comment/:commentID`, controller.getEditComment);

app.post(`/edit-comment/:commentID`, controller.postEditComment);

app.get(`/delete-comment/:commentID`, controller.getDeleteComment);

app.post(`/delete-comment/`, controller.postDeleteComment);

app.get(`/create-featured-work`, settingsController.getCreateFeatured);

app.post(`/create-featured-work`, settingsController.postCreateFeatured);

/*
app.get(`/create-featured-work`, createFeaturedWorkController.getCreateFeatured);

app.post(`/create-featured-work`, createFeaturedWorkController.uploadImage, createFeaturedWorkController.postCreateFeatured);
*/

app.get(`/edit-featured-work/:title`, settingsController.getEditFeatured);

app.get(`/get-check-featured-work`, settingsController.getCheckFeaturedWork);

app.post(`/edit-featured-work/:title`, settingsController.postEditFeatured);

app.get(`/profile/:username`, controller.getProfilePosts, controller.getProfileComments, controller.getProfileFollowedUsers, controller.getProfileUser, controller.getProfile);

app.get(`/settings`, settingsController.getProfileSettings);

app.post(`/settings`, settingsController.postProfileSettings);

app.get(`/advanced-search`, controller.getAdvancedSearch);

app.get(`/search-results`, searchResultsController.getPosts, searchResultsController.getUsers, searchResultsController.getTags, searchResultsController.getSearchResults);

app.get(`/add-favorite`, settingsController.getAddFavorite);

app.get(`/delete-favorite`, settingsController.getDeleteFavorite);

app.get(`/delete-featured`, settingsController.getDeleteFeatured);

app.get(`/get-check-username`, controller.getCheckUsername);

// routes related to js

app.get(`/update-post-upvote`, controller.updatePostUpvote);

app.get(`/update-post-downvote`, controller.updatePostDownvote);

app.get(`/update-comment-upvote`, controller.updateCommentUpvote);

app.get(`/update-comment-downvote`, controller.updateCommentDownvote);

app.get(`/update-followed-users`, controller.updateFollowedUsers);

app.get(`/update-followed-tags`, controller.updateFollowedTags);

app.get(`/check-post-votes`, controller.checkPostVotes);

app.get(`/check-comment-votes`, controller.checkCommentVotes);

app.get(`/check-following`, controller.checkFollowing);

app.get(`/check-status`, controller.checkStatus);

module.exports = app;
