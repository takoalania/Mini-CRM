import {Component, ComponentFactoryResolver, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from 'src/app/shared/validators';
import { AuthService } from 'src/app/shared/auth/auth.service';
import {Router} from '@angular/router';
import {AlertComponent} from '../../shared/alert/alert.component';
import {PlaceholderDirective} from '../../shared/placeholder.directive';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bg-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  error;
  closeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertPlaceholder: PlaceholderDirective;

  constructor(private authService: AuthService,
              private router: Router,
              private cfr: ComponentFactoryResolver) {}

  ngOnInit() {
    this.initForm();
  }

  onRegister() {
    if (this.form.invalid) {
      return;
    }
    const name = this.get('name').value;
    const username = this.get('username').value;
    const password = this.get('password').value;
    this.authService.register(name, username, password).subscribe(
      (resData) => {
        this.router.navigate(['/bpm']);
        this.form.reset();
      },
      (error) => {
        this.error = error;
        this.showError(error);
      }
    );
  }

  get(controlName) {
    return this.form.get(controlName);
  }

  errors(controlName) {
    return this.get(controlName)?.errors
      ? Object.values(this.get(controlName).errors)
      : [];
  }

  formErrors() {
    if (this.form.errors) {
      return Object.values(this.form.errors);
    }
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      username: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(/^\S*$/, 'სფეისების გარეშე'),
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
      ]),
    }, Validators.passwordMatchValidator);
  }

  private showError(error: string) {
    const alertComponentFactory = this.cfr.resolveComponentFactory(AlertComponent);
    this.alertPlaceholder.viewContainerRef.clear();
    const alertRef = this.alertPlaceholder.viewContainerRef.createComponent(alertComponentFactory);
    alertRef.instance.error = error;
    this.closeSub = alertRef.instance.closeClick.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertPlaceholder.viewContainerRef.clear();
    });
  }
}
