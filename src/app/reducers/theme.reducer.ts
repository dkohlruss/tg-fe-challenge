import { createReducer, on } from '@ngrx/store';
import { fetchTheme } from '../actions/theme.actions';

export const initialState = {};

export const themeReducer = createReducer(
  initialState,
  on(fetchTheme, (state) => state),
);