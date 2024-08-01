import {
  UPDATE_DATA,
  ADD_SOCIAL_LINK,
  UPDATE_SOCIAL_LINK,
  FETCH_GITHUB_PROFILE_REQUEST,
  FETCH_GITHUB_PROFILE_SUCCESS,
  FETCH_GITHUB_PROFILE_FAILURE,
  RESET_GITHUB_PROFILE
} from "../actionTypes";

const initial_state = {
  data: {
    name: "",
    job: "",
    location: "",
    bio: "",
    socialLinks: [],
    projects: [],
    image :'',
    repos:[],
  },
  loading: false,
  error: null
};

const GithubReducer = (state = initial_state, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return {
        ...state,
        data: action.payload
      };
    case ADD_SOCIAL_LINK:
      return {
        ...state,
        data: {
          ...state.data,
          socialLinks: [...state.data.socialLinks, action.payload]
        }
      };
    case UPDATE_SOCIAL_LINK:
      return {
        ...state,
        data: {
          ...state.data,
          socialLinks: state.data.socialLinks.map(link =>
            link.id === action.payload.id ? action.payload : link
          )
        }
      };
    case FETCH_GITHUB_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_GITHUB_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          name: action.payload.name,
          location: action.payload.location,
          bio: action.payload.bio,
          image:action.payload.avatar_url,
          socialLinks: [
            ...state.data.socialLinks,
            { id: 'github', url: action.payload.html_url }
          ]
        }
      };
    case RESET_GITHUB_PROFILE:
      return(
        {
          data: {
            name: "",
            job: "",
            location: "",
            bio: "",
            socialLinks: [],
            projects: [],
            image :''
          },
          loading: false,
          error: null
        }
      );
    case FETCH_GITHUB_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default GithubReducer;
