const userReducer = (state = {}, action) => {
  if (action.type === "SET-USER") {
    return action.user;
  }
  if (action.type === "LOGOUT") {
    return {};
  } else {
    return state;
  }
};

export default userReducer;
