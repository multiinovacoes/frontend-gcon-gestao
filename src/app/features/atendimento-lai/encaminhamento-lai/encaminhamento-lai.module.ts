import { NgxPrintModule } from 'ngx-print';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { EncaminhamentoLaiComponent } from './encaminhamento-lai.component';
import { RespostaManualLaiComponent } from '../resposta-manual-lai/resposta-manual-lai.component';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    NgxPrintModule
  ],
  declarations: [
    EncaminhamentoLaiComponent,
    RespostaManualLaiComponent
  ],
    exports: [
      EncaminhamentoLaiComponent,
      RespostaManualLaiComponent
    ]
})
export class EncaminhamentoLaiModule { }
