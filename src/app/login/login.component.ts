import { Component, OnInit , Inject } from '@angular/core';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl , Validator , FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckRequiredField } from '../_shared/helpers/form.helper';
import { AuthService } from '../_auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  processing: Boolean = false;
  error: Boolean = false;

  checkField  = CheckRequiredField;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http : HttpClient,
    public toastrService : ToastrService
  ) { }

  ngOnInit() {
    if (this.authService.hasToken()) {
      this.handleLoginSuccess();
    } else {
      this.initForm();
    }
  }

  // checkRequiredClass(frmControl: string) {
  //   const t  = this.loginForm.get()
  //   return {
  //     'required' : false
  //   };
  // }

  onSubmitButtonClicked() {
    this.error  = false;
    this.processing  = false;
    if (this.loginForm.valid) {
      this.login();
    }
  }

  private login() {
    this.authService.clearData();
    this.processing = true;
    const payload = {
      'email': this.loginForm.value.username,
      'password': this.loginForm.value.password,
    }

    this.http.post(environment.apiBaseUrl + '/auth/login', payload).subscribe(response => {
      if(response) {
        this.authService.setDataAfterLogin(response);
        this.toastrService.success('You are sucessfully login','');
        this.handleLoginSuccess();
      }
    }, err => {
      const errMsg = err.error.message;
      this.toastrService.error(errMsg,'');
      this.handleLoginError();
    }, () => {

    })

  
    // this.authService.login(this.loginForm.value).then(
    //   data => {
    //     if (data) {
    //       this.handleLoginSuccess();
    //     } else {
    //       this.handleLoginError();
    //     }
    //   },
    //   err => {
    //     console.log('---- ERROR ---- ');
    //     console.log(err);
    //     this.handleLoginError();
    //   });
  }

  private handleLoginSuccess() {
    this.processing = false;
    this.error  = false;
    this.router.navigate(['/dashboard']);
  }

  private handleLoginError() {
    this.processing = false;
    this.error  = true;
  }

  private initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [ Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

}
