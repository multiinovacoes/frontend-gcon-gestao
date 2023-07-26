import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AreaLaiPesquisaRoutingModule } from './area-lai-pesquisa.routing';
import { AreaLaiPesquisaComponent } from './area-lai-pesquisa.component';

@NgModule({
  imports: [
    CommonModule,
    AreaLaiPesquisaRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    AreaLaiPesquisaComponent
  ]
})
export class AreaLaiPesquisaModule { }
