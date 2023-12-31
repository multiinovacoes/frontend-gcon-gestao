import { AtendimentoPesquisaComponent } from './atendimento-pesquisa.component';
import { AtendimentoPesquisaRoutingModule } from './atendimento-pesquisa.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    AtendimentoPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoPesquisaComponent
  ]
})
export class AtendimentoPesquisaModule { }
