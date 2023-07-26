import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaEncaminhamentosLaiRecebidosRoutingModule } from './lista-encaminhamentos-lai-recebidos.routing';
import { ListaEncaminhamentosLaiRecebidosComponent } from './lista-encaminhamentos-lai-recebidos.component';

@NgModule({
  imports: [
    CommonModule,
    ListaEncaminhamentosLaiRecebidosRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaEncaminhamentosLaiRecebidosComponent]
})
export class ListaEncaminhamentosLaiRecebidosModule { }
