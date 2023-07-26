import { NgxPrintModule } from 'ngx-print';
import { EncaminhamentoComponent } from './encaminhamento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { RespostaManualComponent } from '../resposta-manual/resposta-manual.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    EncaminhamentoComponent,
    RespostaManualComponent],
    exports: [
      EncaminhamentoComponent,
      RespostaManualComponent
    ]

})
export class EncaminhamentoModule { }
