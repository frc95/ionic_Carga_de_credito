import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashPageRoutingModule } from './splash-routing.module';

import { SplashPage } from './splash.page';

import { LottieModule } from 'ngx-lottie'; //importamos Lottie Module
import player from 'lottie-web'; //importamos player

export function playerFactory(){  //Creamos una funcion para exportarla
  return player;
}

@NgModule({
  imports: [
    LottieModule.forRoot({player:playerFactory}), //en imports colocamos el lottie module
    CommonModule,
    FormsModule,
    IonicModule,
    SplashPageRoutingModule
  ],
  declarations: [SplashPage]
})
export class SplashPageModule {}
