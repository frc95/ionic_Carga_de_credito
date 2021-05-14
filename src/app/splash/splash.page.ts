import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '1200px',
    margin: '0 auto',
    height: '250px'
    
  };
  options:AnimationOptions = {
    path : 'assets/qr.json'
  }

  constructor(public router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 5000);
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    SplashScreen.hide();
  }

}
