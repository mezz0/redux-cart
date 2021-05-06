const initialState = {
  loading: false,
  error: "",
  data: [],
  config: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        products: action.payload.products,
        config: action.payload.config,
        error: "",
      };
    case "FETCH_DATA_FAILURE":
      return {
        loading: false,
        data: [],
        config: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
