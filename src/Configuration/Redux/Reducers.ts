import { playlistReducer } from 'Modules/Station/Redux/Reducer';
import { IPlaylistState } from 'Modules/Station/Redux/Types';
import { userReducer } from 'Modules/User/Redux/Reducer';
import { IUser } from 'Modules/User/Redux/Types';
import { combineReducers, Reducer } from 'redux';

import { NotificationsState, reducer as notificationsReducer } from 'react-notification-system-redux';

// The top-level state object
export interface IApplicationState {
  user: IUser;
  playlist: IPlaylistState;
  notifications: NotificationsState;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
  notifications: notificationsReducer,
});
