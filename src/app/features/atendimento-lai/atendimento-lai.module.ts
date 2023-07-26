import { AppCommonModule } from '../../app.common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoLaiRoutingModule } from './atendimento-lai.routing';


@NgModule({
  imports: [
    CommonModule,
    AtendimentoLaiRoutingModule,
    AppCommonModule

  ],
  declarations: []})
export class AtendimentoLaiModule { }
