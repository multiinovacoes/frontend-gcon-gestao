import { AnexoLaiComponent } from './anexo-lai.component';
import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';


@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    AnexoLaiComponent],
    exports: [
      AnexoLaiComponent
    ]

})
export class AnexoLaiModule { }
