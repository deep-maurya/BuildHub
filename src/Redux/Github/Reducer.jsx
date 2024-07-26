import {add_social_link, update_data, update_social_link } from "../actionTypes";
const initial_state = {
    data: {
      name: "Deepak Maurya",
      job: "Software Developer",
      location: "Maharashtra, India",
      bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      socialLinks:[{
        id: 1,title: "Linkdin",url: "https://linkedin.com/in/deepakmaurya47/"
      }]
    }
  };

  const GithubReducer = (state = initial_state, action) => {
    switch (action.type) {
      case update_data:
        return {
          ...state,
          data: action.payload
        };
        case add_social_link:
          return {
            ...state,
            data: {
              ...state.data,
              socialLinks: [...state.data.socialLinks, action.payload]
            }
          };
        case update_social_link:
          return {
            ...state,
            data: {
              ...state.data,
              socialLinks: state.data.socialLinks.map(link =>
                link.id === action.payload.id ? action.payload : link
              )
            }
          };
      default:
        return state;
    }
  };
  
  export default GithubReducer;