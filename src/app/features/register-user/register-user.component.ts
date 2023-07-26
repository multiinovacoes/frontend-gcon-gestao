import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { birthDateValidator } from 'src/app/core/validators/birthdate.validators';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { LoginService } from 'src/app/features/login/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  styleUrls: ['register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  userform: FormGroup;

  name: string;

  emailId: string;

  password: string;

  version: string;

  constructor(private userService: UserDataService, private router: Router, private fb: FormBuilder, private toastService: ToastService, private loginService: LoginService) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'emailId': new FormControl('', [Validators.required, Validators.email])
    });

    this.version = environment.version;
  }

  redefinicaoSenha() {
    this.loginService.esqueceuSenha(this.userform.controls["emailId"].value)
    .then(() => {
      this.toastService.addSingle("success", "", "Foi enviado link de redefinição de senha para o email.")
      this.router.navigate(['/login']);
      return;
      })
    .catch(erro => {
      this.toastService.addSingle('error', '', erro);
      return;
    });
  }

  onClickGoToLogin() {
    this.router.navigate(['/login']);
  }

}

