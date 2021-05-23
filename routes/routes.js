const express = require(`express`);
const signInController = require(`../controllers/sign-in-controller.js`);
const searchController = require(`../controllers/search-controller.js`);
const feedController = require(`../controllers/feed-controller.js`);
const tagController = require(`../controllers/tag-controller.js`);
const postController = require(`../controllers/post-controller.js`);
const commentController = require(`../controllers/comment-controller.js`);
const profileController = require(`../controllers/profile-controller.js`);
const settingsController = require(`../controllers/settings-controller.js`);
const controller = require(`../controllers/controller.js`);
const validation = require('../helpers/validation.js');

const app = express();

// routes related to hbs

app.get(`/`, controller.getIndex);

app.get(`/sign-up`, signInController.getSignUp);

app.post(`/sign-up`, validation.signupValidation(), signInController.postSignUp);

app.get(`/sign-up-failure`, signInController.getSignUpFailure);

app.get(`/sign-up-success`, signInController.getSignUpSucess);

app.get(`/sign-in`, signInController.getSignIn);

app.post(`/sign-in`, signInController.postSignIn);

app.get(`/sign-in-failure`, signInController.getSignInFailure);

app.get(`/sign-out`, signInController.getSignOut);

app.get(`/feed`, feedController.getCustomFeed, feedController.getHotFeed, feedController.getNewFeed, tagController.getTrendingTags, feedController.getFeed);

app.get(`/tag/:tag`, tagController.getHotTag, tagController.getNewTag, tagController.getTrendingTags, tagController.getTag);

app.get(`/create-post`, postController.getCreatePost);

app.post(`/create-post`, postController.uploadPostImage, postController.postCreatePost);

app.get(`/delete-post/:postID`, postController.getDeletePost);

app.get(`/post/:postID`, commentController.getComments, postController.getPost);

app.get(`/edit-post/:postID`, postController.getEditPost);

app.post(`/edit-post/:postID`, postController.uploadPostImage, postController.postEditPost);

app.get(`/create-comment/:postID`, commentController.getCreateComment);

app.post(`/create-comment/:postID`, validation.commentValidation(), commentController.postCreateComment);

app.get(`/edit-comment/:commentID`, commentController.getEditComment);

app.post(`/edit-comment/:commentID`, validation.commentValidation(), commentController.postEditComment);

app.get(`/delete-comment/:commentID`, commentController.getDeleteComment);

app.post(`/delete-comment/`, commentController.postDeleteComment);

app.get(`/create-featured-work`, settingsController.getCreateFeatured);

app.post(`/create-featured-work`, settingsController.uploadFeaturedImage, settingsController.postCreateFeatured);

app.get(`/edit-featured-work/:title`, settingsController.getEditFeatured);

app.get(`/get-check-featured-work`, settingsController.getCheckFeaturedWork);

app.post(`/edit-featured-work/:title`, settingsController.postEditFeatured);

app.get(`/profile/:username`, profileController.getProfilePosts, profileController.getProfileComments, profileController.getProfileFollowedUsers, profileController.getProfileUser, profileController.getProfile);

app.get(`/settings`, settingsController.getProfileSettings);

app.post(`/settings`, settingsController.uploadProfilePicture, settingsController.postProfileSettings);

app.get(`/advanced-search`, searchController.getAdvancedSearch);

app.get(`/search-results`, searchController.getPosts, searchController.getUsers, searchController.getTags, searchController.getSearchResults);

app.get(`/add-favorite`, settingsController.getAddFavorite);

app.get(`/delete-favorite`, settingsController.getDeleteFavorite);

app.get(`/delete-featured`, settingsController.getDeleteFeatured);

app.get(`/get-check-username`, controller.getCheckUsername);

// routes related to js

app.get(`/update-post-upvote`, postController.updatePostUpvote);

app.get(`/update-post-downvote`, postController.updatePostDownvote);

app.get(`/update-comment-upvote`, commentController.updateCommentUpvote);

app.get(`/update-comment-downvote`, commentController.updateCommentDownvote);

app.get(`/update-followed-users`, profileController.updateFollowedUsers);

app.get(`/update-followed-tags`, tagController.updateFollowedTags);

app.get(`/check-post-votes`, postController.checkPostVotes);

app.get(`/check-comment-votes`, commentController.checkCommentVotes);

app.get(`/check-following`, profileController.checkFollowing);

app.get(`/check-status`, controller.checkStatus);

app.get(`*`, controller.getPageNotFound);

app.post(`*`, controller.getPageNotFound);

module.exports = app;
