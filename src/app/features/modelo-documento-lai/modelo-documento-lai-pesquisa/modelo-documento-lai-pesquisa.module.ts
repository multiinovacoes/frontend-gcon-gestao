import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ModeloDocumentoLaiPesquisaRoutingModule } from './modelo-documento-lai-pesquisa.routing';
import { ModeloDocumentoLaiPesquisaComponent } from './modelo-documento-lai-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    ModeloDocumentoLaiPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ModeloDocumentoLaiPesquisaComponent
  ]
})
export class ModeloDocumentoLaiPesquisaModule { }
