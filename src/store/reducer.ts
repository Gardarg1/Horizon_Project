import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import posts from './posts';
import servers from './servers';

export const reducer = combineReducers({
  user,
  users,
  posts,
  servers,
});
