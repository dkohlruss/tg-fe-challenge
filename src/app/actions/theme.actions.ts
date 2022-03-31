import { createAction, props } from '@ngrx/store';

export const fetchTheme = createAction('[Themes] Fetch', props<{id: number}>());
export const fetchThemeSuccess = createAction('[Themes] Fetch Success');
export const fetchThemeFail = createAction('[Themes] Fetch Fail');
export const updateTheme = createAction('[Themes] Update', props<{id: number, themeName?: string, css?: {background?: string, text?: string, button?: string}}>());
export const updateThemeSuccess = createAction('[Themes] Update Success');
export const updateThemeFail = createAction('[Themes] Update Fail');