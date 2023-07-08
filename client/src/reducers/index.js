import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import messages from './messages';

export const reducers = combineReducers({ posts, auth , messages });
