const shopRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET-BIO":
      return { ...state, bio: action.bio };
    case "SET-CREDENTIALS":
      return { ...state, credentials: action.credentials };
    case "SET-SERVICES":
      return { ...state, services: action.services };
    case "SET-GOALS":
      return { ...state, goals: action.goals };
    case "RESET":
      return {};
    default:
      return state;
  }
};

export default shopRegisterReducer;
