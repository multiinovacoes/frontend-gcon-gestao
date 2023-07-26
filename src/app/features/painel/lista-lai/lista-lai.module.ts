import { ListaLaiComponent } from './lista-lai.component';
import { ListaLaiRoutingModule } from './lista-lai.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';

@NgModule({
  imports: [
    CommonModule,
    ListaLaiRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [ListaLaiComponent]
})
export class ListaLaiModule { }
