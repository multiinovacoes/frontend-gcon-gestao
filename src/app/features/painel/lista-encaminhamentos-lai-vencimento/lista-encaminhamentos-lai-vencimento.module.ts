import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaEncaminhamentosLaiVencimentoRoutingModule } from './lista-encaminhamentos-lai-vencimento.routing';
import { ListaEncaminhamentosLaiVencimentoComponent } from './lista-encaminhamentos-lai-vencimento.component';

@NgModule({
  imports: [
    CommonModule,
    ListaEncaminhamentosLaiVencimentoRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaEncaminhamentosLaiVencimentoComponent]
})
export class ListaEncaminhamentosLaiVencimentoModule { }
