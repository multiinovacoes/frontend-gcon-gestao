import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { RecursoVencimentoComponent } from './recurso-vencimento.component';
import { RecursoVencimentoRoutingModule } from './recurso-vencimento.routing';

@NgModule({
  imports: [
    CommonModule,
    RecursoVencimentoRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [RecursoVencimentoComponent]
})
export class RecursoVencimentoModule { }