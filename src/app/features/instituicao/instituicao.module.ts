import { AppCommonModule } from './../../app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstituicaoRoutingModule } from './instituicao.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InstituicaoRoutingModule,
    AppCommonModule

  ]
})
export class InstituicaoModule { }
