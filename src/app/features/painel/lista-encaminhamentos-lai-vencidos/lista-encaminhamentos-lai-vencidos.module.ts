import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaEncaminhamentosLaiVencidosRoutingModule } from './lista-encaminhamentos-lai-vencidos.routing';
import { ListaEncaminhamentosLaiVencidosComponent } from './lista-encaminhamentos-lai-vencidos.component';

@NgModule({
  imports: [
    CommonModule,
    ListaEncaminhamentosLaiVencidosRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaEncaminhamentosLaiVencidosComponent]
})
export class ListaEncaminhamentosLaiVencidosModule { }
