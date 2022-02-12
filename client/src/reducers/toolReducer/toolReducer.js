const initialState = {};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        toggle: action.payload.toggle,
      };
    case "ENDTOOGLE":
      return {
        ...state,
        toggle: action.payload.toggle,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SIGNUP":
      return {
        ...state,
        signloading: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        logout: action.payload,
      };
    case "AFFICHE":
      return {
        ...state,
        affiche: action.payload.afficheToggle,

      };
    default:
      return state;
  }
};
