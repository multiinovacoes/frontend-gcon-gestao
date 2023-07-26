import { AtendimentoAreaImpressaoComponent } from './atendimento-area-impressao.component';
import { HeaderBreadCrumbModule } from './../../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AtendimentoAreaImpressaoRoutingModule } from './atendimento-area-impressao.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoAreaImpressaoRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AtendimentoAreaImpressaoComponent
  ]
})
export class AtendimentoAreaImpressaoModule { }
