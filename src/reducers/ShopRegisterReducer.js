const shopRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET-BIO":
      return { ...state, bio: action.bio };
    case "SET-CREDENTIALS":
      return { ...state, credentials: action.credentials };
    case "RESET":
      return {};
    default:
      return state;
  }
};

export default shopRegisterReducer;
