const initialState = {
  accessToken: null,
  userId: null,
  role: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "REGISTER_USER_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "REGISTER_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "LOGIN_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "LOGIN_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
