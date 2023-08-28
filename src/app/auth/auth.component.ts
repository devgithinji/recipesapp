import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onsubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      console.log('login');
    } else {
      this.authService.signUp(email, password).subscribe(responseData => {
        console.log(responseData);
        this.isLoading = false;
      }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      });
    }

    form.reset();
  }
}
