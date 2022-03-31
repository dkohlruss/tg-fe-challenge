import { createReducer, on } from '@ngrx/store';
import { fetchTheme, fetchThemeSuccess, updateTheme, updateThemeSuccess } from '../actions/theme.actions';

export const initialState = {};

export const themeReducer = createReducer(
  initialState,
  on(fetchTheme, (state) => state),
  on(fetchThemeSuccess, (state, {payload}: any) => {
    return payload;
  }),
  on(updateTheme, (state) => state),
  on(updateThemeSuccess, (state, {payload}: any) => {
    return payload;
  })
);