import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { VeryRealApiService } from '../services/very-real-api.service';
 
@Injectable()
export class ThemeEffects {
  fetchThemes$ = createEffect(() => this.actions$.pipe(
    ofType('[Themes] Fetch'),
    switchMap((params: any) => {
      return this.veryRealApiService.fetchTheme(params.id)}
    ),
    map(theme => ({ type: '[Themes] Fetch Success', payload: theme })),
    catchError(() => EMPTY)
  ));

  updateTheme$ = createEffect(() => this.actions$.pipe(
    ofType('[Themes] Update'),
    switchMap((params: any) => {
      return this.veryRealApiService.updateTheme(params)}
    ),
    map(theme => {
      return ({ type: '[Themes] Update Success', payload: theme })}),
    catchError(() => EMPTY)
  ));
 
  constructor(
    private actions$: Actions,
    private veryRealApiService: VeryRealApiService
  ) {}
}