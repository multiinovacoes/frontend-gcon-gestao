import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AreaLaiCadastroRoutingModule } from './area-lai-cadastro.routing';
import { AreaLaiCadastroComponent } from './area-lai-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    AreaLaiCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AreaLaiCadastroComponent
  ]
})
export class AreaLaiCadastroModule { }
