import * as ReviewAPIUtil from "../utils/review_api_util";

export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";

const receiveReviews = (payload) => {
  return {
    type: RECEIVE_REVIEWS,
    payload
  };
};

const receiveReview = (payload) => {
  return {
    type: RECEIVE_REVIEW,
    payload
  };
};

// payload = reviewId
const removeReview = (payload) => {
  return {
    type: REMOVE_REVIEW,
    payload
  };
};

// payload = errors
const receiveReviewErrors = (errors) => {
  return {
    type: RECEIVE_REVIEW_ERRORS,
    errors
  };
};

// thunk action creators
// functions that return other functions. the 1st function, provide parameters needed to make AJAX request
// inner (2nd) function parameter will always be dispatch
// thunk middleware will capture these fxns before they hit our store, see that they're fxns and invoke them with store's dispatch fxn

export const fetchReviews = () => dispatch => {
  return ReviewAPIUtil.fetchReviews()
    .then((reviews) => dispatch(receiveReviews(reviews))
    // dispatch (regular) action to the store that's gna send these reviews along
    // returns an action with all the reviews in it
  );
};

export const createReview = review => dispatch => {
    return ReviewAPIUtil.createReview(review)
        .then(review => dispatch(receiveReview(review)))
        .fail(errors => dispatch(receiveReviewErrors(errors.responseJSON)))
};

export const updateReview = review => dispatch => {
    return ReviewAPIUtil.updateReview(review)
        .then((updatedReview) => dispatch(receiveReview(updatedReview)))
        .fail((errors) => dispatch(receiveReviewErrors(errors.responseJSON)));
}

export const deleteReview = reviewId => dispatch => {
  // console.log("deleting reivew", reviewId);
    return ReviewAPIUtil.deleteReview(reviewId)
        .then(() => dispatch(removeReview(reviewId)))
}

