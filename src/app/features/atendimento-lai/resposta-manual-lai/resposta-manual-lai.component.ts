import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EncaminhamentoLai } from 'src/app/core/models/encaminhamento-lai.model';
import { EncaminhamentoRespostaLai } from 'src/app/core/models/encaminhamento-resposta-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { EncaminhamentoRespostaService } from '../../atendimento/encaminhamento/encaminhamento-resposta.service';
import { ModeloDocumentoLaiService } from '../../modelo-documento-lai/modelo-documento-lai.service';
import { EncaminhamentoLaiService } from '../encaminhamento-lai/encaminhamento-lai.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { EncaminhamentoRespostaLaiService } from '../encaminhamento-lai/encaminhamento-resposta-lai.service';

@Component({
  selector: 'app-resposta-manual-lai',
  templateUrl: './resposta-manual-lai.component.html',
  styleUrls: ['./resposta-manual-lai.component.css']
})
export class RespostaManualLaiComponent  {

  @ViewChild(NgForm) myFormRetornoManual: NgForm;
  @Output() callParent = new EventEmitter();
  encaminhamento = new EncaminhamentoLai();
  encaminhamentoResposta = new EncaminhamentoRespostaLai();
  displayModalRetornoManual: boolean;
  modeloDocumentos = [];
  statusPedido: number;

  solucaoSatisfaz = [
    { label: 'Sim', value: 1 },
    { label: 'Não', value: 0 }
  ];

  constructor(
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private encaminhamentoLaiService: EncaminhamentoLaiService,
    private encaminhamentoRespostaLaiService: EncaminhamentoRespostaLaiService,
    private modeloDocumentoLaiService: ModeloDocumentoLaiService
  ) { }

  resetMyFormRetornoManual(){
    if (this.myFormRetornoManual.valid){
      this.myFormRetornoManual.reset();
    }
  }

  onCloseRetornoManual(){
    this.displayModalRetornoManual = false;
  }

  showVisualizaResposta(codigoResposta: number, statusPedido: number) {
    this.statusPedido = statusPedido;
    this.loaderService.show();
    this.resetMyFormRetornoManual();
    this.carregarModeloDocumento();
    this.encaminhamentoRespostaLaiService.consultar(codigoResposta)
    .then((dados) => {
      this.encaminhamentoResposta = dados;
    })
    .then((dados) => {
      this.loaderService.hide();
      this.displayModalRetornoManual = true;
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  showRetornoManual(codigoEncaminhamento: number) {
    this.loaderService.show();
    this.encaminhamentoRespostaLaiService.
     verificaResposta(codigoEncaminhamento).
       then(resultado => {
         if (resultado == true){
          this.loaderService.hide();
           Swal.fire({
             title: 'Encaminhamento já respondido.',
             width: 400,
             //padding: '3em',
             })
           return false;
         }else{
           this.resetMyFormRetornoManual();
           this.consultaEncaminhamento(codigoEncaminhamento);
         }
       })

 }

  get editando() {
    return Boolean(this.encaminhamentoResposta.id)
  }


  salvar(): Promise<void>{
    this.loaderService.show();
    if (this.editando){
      return this.encaminhamentoRespostaLaiService.
      atualizar(this.encaminhamentoResposta).
      then(res => {
        this.resetMyFormRetornoManual();
        this.onCloseRetornoManual();
        this.callParent.emit();
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta manual atualizada com sucesso!",
        });
      })
       .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
    }else{
      return this.encaminhamentoRespostaLaiService.
      adicionar(this.encaminhamentoResposta).
      then(res => {
        this.resetMyFormRetornoManual();
        this.onCloseRetornoManual();
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta manual adicionada com sucesso!",
        })
      })
       .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
    }
  }

  consultaEncaminhamento(codigoEncaminhamento: number) {
    this.encaminhamentoLaiService.consultarEncaminhamentoLai(codigoEncaminhamento)
      .then((dados) => {
        this.encaminhamento = dados;
      })
     .then((dados) => {
         this.loaderService.hide();
         this.carregarModeloDocumento();
         this.encaminhamentoResposta.encaminhamento = codigoEncaminhamento;
         this.displayModalRetornoManual = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  consultaResposta(codigoResposta: number): any {
    this.encaminhamentoRespostaLaiService.consultar(codigoResposta)
      .then((dados) => {
        this.encaminhamentoResposta = dados;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  consultaModelo(): any {
    this.encaminhamento.modeloDocumento = this.encaminhamentoResposta.modeloDocumento;
    return this.modeloDocumentoLaiService.consultarModeloEnc(this.encaminhamento)
      .then(modelo => {
        this.encaminhamentoResposta.despacho = modelo;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarModeloDocumento(): any {
    return this.modeloDocumentoLaiService.listarPorTipo('1')
     .then(modeloDocumentos => {
       this.modeloDocumentos = modeloDocumentos.
       map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
     })
     .catch(erro => this.errorHandler.handle(erro));
 }

}
