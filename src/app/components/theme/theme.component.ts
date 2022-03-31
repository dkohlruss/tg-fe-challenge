import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ThemeData } from 'src/app/services/very-real-api.service';

import { fetchTheme, updateTheme } from '../../actions/theme.actions';
 
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themeForm: FormGroup;
  themeTitle: string;
  initialTheme: ThemeData;
  hexValidation = /^#([0-9A-F]{3}){1,2}$/i;

  errorMessages: any = {
    name: {
      required: 'An entry is required'
    },
    backgroundColor: {
      required: 'An entry is required',
      pattern: 'Please enter a valid hex code'
    },
    buttonColor: {
      required: 'An entry is required',
      pattern: 'Please enter a valid hex code'
    }
  }
 
  constructor(
    private _store: Store<{ theme: ThemeData }>, 
    private _fb: FormBuilder
  ) {
    this._store.dispatch(fetchTheme({id: 1}));
  }

  ngOnInit() {
    this._store.select('theme').pipe(take(1)).subscribe((theme) => {
      this.setupForm(theme);
    });
  }

  setupForm(theme: ThemeData) {
    this.initialTheme = theme;
    this.themeTitle = theme.themeName;

    this.themeForm = this._fb.group(
      {
        id: theme?.id,
        name: [theme?.themeName, { validators: [Validators.required] }],
        backgroundColor: [theme?.css?.background, { validators: [Validators.required, Validators.pattern(this.hexValidation)] }],
        buttonColor: [theme?.css?.button, { validators: [Validators.required, Validators.pattern(this.hexValidation)] }],
      },
    );
    this.themeForm.markAsPristine();

    this.themeForm.controls.name.valueChanges.subscribe((newVal) => {
      this.themeTitle = newVal;
    });
  }

  getErrorMessage(fieldName: string) {
     const field = this.themeForm.get(fieldName);
     if (field?.errors) {
      const messages = [];
      for (const [key] of Object.entries(field.errors)) {
        if (key in this.errorMessages[fieldName]) {
          messages.push(this.errorMessages[fieldName][key]);
        }
      }

      return messages.join(', ');
    }

    return false;
  }

  submit() {
    this._store.dispatch(updateTheme({
      id: this.themeForm.controls.id.value,
      themeName: this.themeForm.controls.name.value,
      css: {
        background: this.themeForm.controls.backgroundColor.value,
        button: this.themeForm.controls.buttonColor.value
      }
    }))
  }
}