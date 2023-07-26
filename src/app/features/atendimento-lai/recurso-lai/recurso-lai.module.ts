import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { RecursoLaiComponent } from './recurso-lai.component';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    RecursoLaiComponent],
    exports: [
      RecursoLaiComponent
    ]

})
export class RecursoLaiModule { }
