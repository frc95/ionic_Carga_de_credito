import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { FormGroup ,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  emailPattern : string="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.minLength(3),Validators.pattern(this.emailPattern)]),
    password: new FormControl('',  [Validators.required,Validators.minLength(3)])
  });

  email='';
  password='';
  alert=false;
  alertMsj='';

  constructor(private service : LoginService, 
    private route : Router, 
    public loadingController: LoadingController) { }

  ngOnInit() {
  }

  Login(form){
    this.service.Login(form).then(res =>{
      this.presentLoading();
      setTimeout(() => {
        this.route.navigateByUrl('home');
      }, 3000);
    }).catch(err => {

      this.alert=true;
      if(err.code == "auth/wrong-password")
      {
        this.alertMsj="Error en la contraseña";
      }
      else if(err.code == "auth/user-not-found")
      {
        this.alertMsj="El usuario no existe";
      }
      else if(err.code == "auth/invalid-email")
      {
        this.alertMsj="Error en el correo electrónico";
      }
      else
      {
        this.alertMsj=err.message;
      }

      setTimeout(() => {
        this.alert=false;
      }, 3000);
    });
  }

  LoginAdmin(){
    this.email="admin@admin.com";
    this.password="111111";
  }
  LoginInvitado(){
    this.email="invitado@invitado.com";
    this.password="222222";
  }
  LoginUsuario(){
    this.email="usuario@usuario.com";
    this.password="333333";
  }
  LoginAnonimo(){
    this.email="anonimo@anonimo.com";
    this.password="444444";
  }
  LoginTester(){
    this.email="tester@tester.com";
    this.password="555555";
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Cargando',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



}
