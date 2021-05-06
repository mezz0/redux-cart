import axios from "axios";

export const fetchDataRequest = () => {
  return {
    type: "FETCH_DATA_REQUEST",
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: "FETCH_DATA_SUCCESS",
    payload: data,
  };
};

export const fetchDataFailure = (error) => {
  return {
    type: "FETCH_DATA_FAILURE",
    payload: error,
  };
};

export const fetchData = (url) => {
  return (dispatch) => {
    dispatch(fetchDataRequest);
    axios
      .get(url)
      .then((response) => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};
