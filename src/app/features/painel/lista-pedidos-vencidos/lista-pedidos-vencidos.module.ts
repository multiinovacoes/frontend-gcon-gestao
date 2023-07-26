import { ListaPedidosVencidosComponent } from './lista-pedidos-vencidos.component';
import { ListaPedidosVencidosRoutingModule } from './lista-pedidos-vencidos.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    ListaPedidosVencidosRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaPedidosVencidosComponent]
})
export class ListaPedidosVencidosModule { }
