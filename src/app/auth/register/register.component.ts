import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPayload } from '../register-payload';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public errorMsg;
  registerForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder:FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
      comment:''
    });
    this.registerPayload = {
      username:'',
      email:'',
      password:'',
      confirmPassword:'',
      comment:''
    };
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.registerPayload.username = this.registerForm.get('username').value;
    this.registerPayload.email = this.registerForm.get('email').value;
    this.registerPayload.password = this.registerForm.get('password').value;
    this.registerPayload.confirmPassword = this.registerForm.get('confirmPassword').value;
    this.registerPayload.comment = this.registerForm.get('comment').value;

    if (this.validateEmail(this.registerForm.get('email').value)){
      if (this.registerForm.get('password').value == this.registerForm.get('confirmPassword').value){
        this.authService.register(this.registerPayload).subscribe(data => {
          console.log('register success');
          this.router.navigateByUrl('/register-success');
        }, error => {
          console.log('register failed');
          this.errorMsg = error;
          console.log(error);
        });
      } else {
        this.errorMsg = '"Password" and "Repeated Password" are different';
      }
    } else {
      this.errorMsg = "Invalid email";
    }

    
  }

  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

}
