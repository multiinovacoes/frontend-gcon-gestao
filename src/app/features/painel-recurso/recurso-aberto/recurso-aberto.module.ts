import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { RecursoAbertoComponent } from './recurso-aberto.component';
import { RecursoAbertoRoutingModule } from './recurso-aberto.routing';

@NgModule({
  imports: [
    CommonModule,
    RecursoAbertoRoutingModule,
    HeaderBreadCrumbModule,
    AppCommonModule
  ],
  declarations: [RecursoAbertoComponent]
})
export class RecursoAbertoModule { }