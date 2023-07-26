import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ListaEncaminhamentosLaiEnviadosRoutingModule } from './lista-encaminhamentos-lai-enviados.routing';
import { ListaEncaminhamentosLaiEnviadosComponent } from './lista-encaminhamentos-lai-enviados.component';

@NgModule({
  imports: [
    CommonModule,
    ListaEncaminhamentosLaiEnviadosRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaEncaminhamentosLaiEnviadosComponent]
})
export class ListaEncaminhamentosLaiEnviadosModule { }
