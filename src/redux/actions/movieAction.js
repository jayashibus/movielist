import { ActionTypes } from "../contants/actiontypes";
export const setMovies = (movies) => {
  return {
    type: ActionTypes.SET_MOVIES,
    payload: [...movies],
  };
};

export const setCategoryMovie = (movies, type) => {
  return {
    type,
    payload: [...movies],
  };
};

export const setCategoryTV = (movies) => {
  return {
    type: ActionTypes.SELECTED_CATEGORY_TV,
    payload: [...movies],
  };
};
