import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AssuntoLaiPesquisaRoutingModule } from './assunto-lai-pesquisa.routing';
import { AssuntoLaiPesquisaComponent } from './assunto-lai-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    AssuntoLaiPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AssuntoLaiPesquisaComponent
  ]
})
export class AssuntoLaiPesquisaModule { }
