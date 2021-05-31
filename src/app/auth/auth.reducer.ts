import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { Usuario } from '../models/user.model';

export interface State {
    user: Usuario; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,

    on(actions.setUser, (state, { user }) => ({ ...state, user: {...user}})),
    on(actions.setUser, state => ({ ...state, user: null})),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}