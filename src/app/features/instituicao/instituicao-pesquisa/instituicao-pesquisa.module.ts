import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { InstituicaoPesquisaRoutingModule } from './instituicao-pesquisa.routing';
import { InstituicaoPesquisaComponent } from './instituicao-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    InstituicaoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    InstituicaoPesquisaComponent
  ]
})
export class InstituicaoPesquisaModule { }
