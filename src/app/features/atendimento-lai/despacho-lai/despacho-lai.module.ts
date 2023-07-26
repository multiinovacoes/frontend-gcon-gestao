import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { DespachoLaiComponent } from './despacho-lai.component';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    DespachoLaiComponent],
    exports: [
      DespachoLaiComponent
    ]

})
export class DespachoLaiModule { }
