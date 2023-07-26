import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { PedidoCadastroRoutingModule } from './pedido-cadastro.routing';
import { PedidoCadastroComponent } from './pedido-cadastro.component';
import { EncaminhamentoLaiModule } from '../encaminhamento-lai/encaminhamento-lai.module';
import { RespostaParcialLaiModule } from '../resposta-parcial-lai/resposta-parcial-lai.module';
import { AnexoLaiModule } from '../anexo-lai/anexo-lai.module';
import { DespachoLaiModule } from '../despacho-lai/despacho-lai.module';
import { RecursoLaiModule } from '../recurso-lai/recurso-lai.module';


@NgModule({
  imports: [
    CommonModule,
    PedidoCadastroRoutingModule,
    EncaminhamentoLaiModule,
    RespostaParcialLaiModule,
    DespachoLaiModule,
    RecursoLaiModule,
    AnexoLaiModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    PedidoCadastroComponent
  ]
})
export class PedidoCadastroModule { }
