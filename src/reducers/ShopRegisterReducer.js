const shopRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET-BIO":
      return { ...state, bio: action.bio };
    case "SET-CREDENTIALS":
      return { ...state, bio: action.credentials };
    case "SET-SERVICES":
      return { ...state, bio: action.services };
    case "SET-GOALS":
      return { ...state, bio: action.goals };
    case "RESET":
      return {};
    default:
      return state;
  }
};

export default shopRegisterReducer;
