import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { RespostaParcialLaiComponent } from './resposta-parcial-lai.component';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    RespostaParcialLaiComponent],
    exports: [
      RespostaParcialLaiComponent
    ]

})
export class RespostaParcialLaiModule { }
