const initialState = {
  tasks: [],
  searchTask: "",
  loading: false,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_TASK":
      return {
        ...state,
        searchTask: action.payload,
      };
    case "GET_ALL_TASK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "GET_ALL_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null,
      };

    case "GET_ALL_TASK_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "POST_TASK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "POST_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        error: null,
      };

    case "POST_TASK_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "DELETE_TASK_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        error: null,
      };

    case "DELETE_TASK_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default taskReducer;
