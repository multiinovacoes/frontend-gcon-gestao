import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AssuntoLaiCadastroRoutingModule } from './assunto-lai-cadastro.routing';
import { AssuntoLaiCadastroComponent } from './assunto-lai-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    AssuntoLaiCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AssuntoLaiCadastroComponent
  ]
})
export class AssuntoLaiCadastroModule { }
