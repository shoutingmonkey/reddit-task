import * as Actions from '../actions/action';

const initialState = {
  token: null,
  subRedditData: null,
  commentData: null,
  headerImage: null,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GLOBAL_TOKEN: {
      return {...state, token: action.payload};
    }
    case Actions.SUBREDDIT_DATA: {
      return {...state, subRedditData: action.payload};
    }
    case Actions.SET_COMMENTS_DATA: {
      return {...state, commentData: action.payload};
    }
    case Actions.SET_HEADER_IMAGE: {
      return {...state, headerImage: action.payload};
    }
    default:
      return {...state};
  }
};

export default stateReducer;
