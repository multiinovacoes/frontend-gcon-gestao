import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { RecursoVencidoRoutingModule } from './recurso-vencido.routing';
import { RecursoVencidoComponent } from './recurso-vencido.component';

@NgModule({
  imports: [
    CommonModule,
    RecursoVencidoRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [RecursoVencidoComponent]
})
export class RecursoVencidoModule { }