import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { ModeloDocumentoLaiCadastroRoutingModule } from './modelo-documento-lai-cadastro.routing';
import { ModeloDocumentoLaiCadastroComponent } from './modelo-documento-lai-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    ModeloDocumentoLaiCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ModeloDocumentoLaiCadastroComponent
  ]
})
export class ModeloDocumentoLaiCadastroModule { }
