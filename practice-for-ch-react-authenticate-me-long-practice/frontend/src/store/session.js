import csrfFetch from './csrf';
import { storeCSRFToken } from './csrf';

const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

const removeCurrentUser = () => {
  return {
    type: REMOVE_CURRENT_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  });
  
  const data = await response.json();
  dispatch(setCurrentUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  await csrfFetch('/api/session', {
    method: 'DELETE',
  });

  storeCurrentUser(null);
  dispatch(removeCurrentUser());
};



export const restoreSession = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  storeCSRFToken(res);
  const body = await res.json();
  storeCurrentUser(body.user);
  dispatch(setCurrentUser(body.user));
  return res;
}

const storeCurrentUser = (user) => {
  if (!user) {
    sessionStorage.removeItem('currentUser');
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
}

const initialState = {
  user: JSON.parse(sessionStorage.getItem('currentUser')),
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case REMOVE_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;