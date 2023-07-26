import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { InstituicaoCadastroRoutingModule } from './instituicao-cadastro.routing';
import { InstituicaoCadastroComponent } from './instituicao-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    InstituicaoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    InstituicaoCadastroComponent
  ]
})
export class InstituicaoCadastroModule { }
