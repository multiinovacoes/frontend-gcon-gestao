import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { SetorLaiPesquisaComponent } from './setor-lai-pesquisa.component';
import { SetorLaiPesquisaRoutingModule } from './setor-lai-pesquisa.routing';

@NgModule({
  imports: [
    CommonModule,
    SetorLaiPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    SetorLaiPesquisaComponent
  ]
})
export class SetorLaiPesquisaModule { }
