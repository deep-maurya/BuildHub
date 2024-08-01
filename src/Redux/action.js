import axios from "axios";
import {
  FETCH_GITHUB_PROFILE_REQUEST,
  FETCH_GITHUB_PROFILE_SUCCESS,
  FETCH_GITHUB_PROFILE_FAILURE
} from "./actionTypes";

export const fetchGithubProfileRequest = () => ({
  type: FETCH_GITHUB_PROFILE_REQUEST
});

export const fetchGithubProfileSuccess = (data) => ({
  type: FETCH_GITHUB_PROFILE_SUCCESS,
  payload: data
});

export const fetchGithubProfileFailure = (error) => ({
  type: FETCH_GITHUB_PROFILE_FAILURE,
  payload: error
});

export const fetchGithubProfile = (username) => {
  return async (dispatch) => {
    dispatch(fetchGithubProfileRequest());
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      console.log(response.data);
      dispatch(fetchGithubProfileSuccess(response.data));
      const repos = await axios.get(`https://api.github.com/users/${username}/repos`);
      console.log(repos.data);
      dispatch(fetchGithubProfileSuccess(response.data));
    } catch (error) {
      dispatch(fetchGithubProfileFailure(error.message));
    }
  };
};
