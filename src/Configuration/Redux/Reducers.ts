import { chatReducer, playlistReducer } from 'Modules/Station/Redux/Reducer';
import { IMessage, IPlaylistState } from 'Modules/Station/Redux/Types';
import { favoriteReducer, userReducer } from 'Modules/User/Redux/Reducer';
import { IUser } from 'Modules/User/Redux/Types';
import { IFavorite } from 'Modules/User/Redux/Types/Types';
import { combineReducers, Reducer } from 'redux';

// The top-level state object
export interface IApplicationState {
  user: IUser;
  playlist: IPlaylistState;
  favoriteList: IFavorite;
  chat: IMessage;
}

export const reducers: Reducer<IApplicationState> = combineReducers<
  IApplicationState
>({
  user: userReducer,
  playlist: playlistReducer,
  favoriteList: favoriteReducer,
  chat: chatReducer,
});
