import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface ThemeData {
  id: number;
  themeName: string;
  css: {
    background: string;
    text: string;
    button: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class VeryRealApiService {
  private themesData: ThemeData[] = [{
    id: 1,
    themeName: 'My Cool Theme',
    css: {
      background: '#84d9d3',
      text: '#000000',
      button: '#ff7d8e'
    }
  },
  {
    id: 2,
    themeName: 'Also Cool',
    css: {
      background: '#2dbbc1',
      text: '#FFCC33',
      button: '#2d9c91'
    }
  }];

  constructor() { }

  selectTheme(id: number): ThemeData | undefined {
    return this.themesData.find((theme) => {
    return theme.id === id
  })}

  fetchThemes(): Observable<ThemeData[]> {
    return of(this.themesData)
  }
  
  fetchTheme(id: number): Observable<ThemeData> {
    const selectedTheme = this.selectTheme(id);

    if (selectedTheme) {
      return of(selectedTheme)
    } else {
      return throwError(new Error("Theme Not Found"))
    }
  }

  updateTheme(params: any) {
    this.themesData = this.themesData.map((theme) => {
      if (theme.id === params.id) {
        return {
          id: theme.id,
          themeName: params.themeName || theme.themeName,
          css: {...theme.css, ...params.css}
        };
      }

      console.log(theme);

      return theme;
    })

    const selectedTheme = this.selectTheme(params.id);

    return of(selectedTheme);
  }
}
