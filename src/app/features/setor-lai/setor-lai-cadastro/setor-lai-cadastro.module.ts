import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { SetorLaiCadastroRoutingModule } from './setor-lai-cadastro.routing';
import { SetorLaiCadastroComponent } from './setor-lai-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    SetorLaiCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    SetorLaiCadastroComponent
  ]
})
export class SetorLaiCadastroModule { }
