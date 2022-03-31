import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeData } from 'src/app/services/very-real-api.service';
 
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  themeForm: FormGroup;
  themeTitle: string | undefined;
  initialTheme: ThemeData | undefined;
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
  ) {}

  ngOnInit() {
    this.setupForm(undefined);
  }

  setupForm(theme: ThemeData | undefined) {
    this.initialTheme = theme;
    this.themeTitle = theme?.themeName;

    this.themeForm = this._fb.group(
      {
        id: '',
        name: '',
        backgroundColor: '',
        buttonColor: '',
      },
    );
    this.themeForm.markAsPristine();
  }

  getErrorMessage(fieldName: string): string | boolean {
     const field = this.themeForm?.get(fieldName);
     if (field?.errors) {}

    return false;
  }

  submit(): void {}
}