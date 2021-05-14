import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Plugins } from "@capacitor/core";
import { AlertController, LoadingController } from '@ionic/angular';
import {Howl} from 'howler';
const { BarcodeScanner } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  result=null;
  scanActive=false;

  credito=0;
  user="";

  alert=false;

  codigos : any [] = [
    {
      credito : 100,
      codigo : "2786f4877b9091dcad7f35751bfcf5d5ea712b2f",
      leido : false,
      contador : 0
    },
    {
      credito : 10,
      codigo : "8c95def646b6127282ed50454b73240300dccabc",
      leido : false,
      contador : 0
    },
    {
      credito : 50,
      codigo : "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ",
      leido : false,
      contador : 0
    }
  ];

  constructor(public router : Router,
     private loginSvc: LoginService,
     private alertController : AlertController,
     public loadingController: LoadingController) {}

  ngAfterViewInit(){
    BarcodeScanner.prepare();
  }
  ngOnDestroy(){
    BarcodeScanner.stopScan();
  }



  Logout(){
    let sound = new Howl({
      src: ['assets/logout/logout.mp3']
    });
    sound.play();
    this.presentLoading();
    setTimeout(() => {
        this.loginSvc.Logout();
        this.router.navigateByUrl('login');
    }, 3000);
  }

  Limpiar()
  {
    this.credito=0;
  }

  async startScanner()
  {
    
    const allowed = this.checkPermission();
    if(allowed){
      this.scanActive = true;
      const result = await BarcodeScanner.startScan();
      console.log(result);
      if(result.hasContent){
        this.result = result.content;
        this.scanActive = false;

        this.user=this.loginSvc.getEmail().split("@")[0];

        if(this.user!="admin")
        {
          this.codigos.forEach(element => {
            if(element.codigo==this.result && !element.leido)
            {
              this.credito += element.credito;
              element.leido = true;
            }
            else if (element.codigo==this.result && element.leido)
            { 
              this.alert=true;
              setTimeout(() => {
                this.alert=false;
              }, 2000);
            }
          });
        }
        else{
          this.codigos.forEach(element => {
            if(element.codigo==this.result && element.contador<2)
            {
              this.credito += element.credito;
              element.contador++;
            }
            else if (element.codigo==this.result && element.contador==2)
            { 
              this.alert=true;
              setTimeout(() => {
                this.alert=false;
              }, 2000);
            }
          });
        }
        
      }
    }
  
  }

  async checkPermission(){
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted){
        resolve(true);
      } else if (status.denied) {
        const alert = await this.alertController.create({
          header: 'No permission',
          message: 'Please allow camera access in your settings',
          buttons: [{
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Open Settings',
            handler: () => {
              BarcodeScanner.openAppSettings();
              resolve(false);
            }
          }]
        });

        await alert.present();
      } else {
        resolve(false);
      }
    });
  }

  stopScanner(){
    BarcodeScanner.stopScan();
    this.scanActive = false;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Saliendo',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }



}
