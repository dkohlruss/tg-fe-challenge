import { createAction, props } from '@ngrx/store';

export const fetchTheme = createAction('[Themes] Fetch', props<{id: number}>());