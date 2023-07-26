import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DespachoLai } from 'src/app/core/models/despacho-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModeloDocumentoLaiService } from '../../modelo-documento-lai/modelo-documento-lai.service';
import { DespachoLaiService } from './despacho-lai.service';

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'app-despacho-lai',
  templateUrl: './despacho-lai.component.html',
  styleUrls: ['./despacho-lai.component.css']
})
export class DespachoLaiComponent  {

  displayDespachoLaiModal: boolean;
  despachoLai = new DespachoLai();
  modeloDocumentos: any;
  displayModalVisualizaDespachoLai: boolean;
  @Output() onCallParentDespachoLai = new EventEmitter();
  @ViewChild(NgForm) myForm: NgForm;
  habilitaEmail = true;

  constructor(
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private confirmation: ConfirmationService,
    private despachoLaiService: DespachoLaiService
  ) { }



  salvar() {
    this.loaderService.show();
    return this.despachoLaiService
      .adicionar(this.despachoLai)
      .then((res) => {
        this.onClose();
        this.onCallParentDespachoLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Despacho enviado com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onClose() {
    this.displayDespachoLaiModal = false;
  }

  habilitaCampoEmail(codigo: any) {
    if (codigo == 2) {
      this.habilitaEmail = false;
    } else {
      this.habilitaEmail = true;
    }
  }

  consultaModelo(codigo: number): any {
    return this.modeloDocumentoLaiService
      .consultarModeloOutros(codigo, this.despachoLai.atendimento)
      .then((modelo) => {
        this.despachoLai.descricao = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showVisualizaDialog(codigoResposta: number) {
    this.consultaResposta(codigoResposta);
  }

  onCloseVisualiza() {
        this.myForm.reset();
    this.displayModalVisualizaDespachoLai = false;
  }

  showPositionDialog(codigoAtendimento: number, email: string) {
    this.loaderService.show();
    this.despachoLaiService
    .insertDespacho(codigoAtendimento)
    .then((dados) => {
      this.despachoLai = dados;
    })
    .then((dados) => {
      this.loaderService.hide();
      if (this.despachoLai.atendimento != null){
        this.carregarModeloDocumento();
        this.habilitaEmail = true;
        this.displayDespachoLaiModal = true;
      }else{
        Swal.fire("Despacho", "Não existe nenhum encaminhamento em aberto", "warning");
      }
      })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    })
  }

  consultaResposta(codigoResposta: number) {
    this.loaderService.show();
    this.despachoLaiService
      .consultar(codigoResposta)
      .then((dados) => {
        this.despachoLai = dados;
      })
      .then((dados) => {
        this.loaderService.hide();
        this.displayModalVisualizaDespachoLai = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

 

  carregarModeloDocumento() {
    return this.modeloDocumentoLaiService
      .listarPorTipo("3")
      .then((modeloDocumentos) => {
        this.modeloDocumentos = modeloDocumentos.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(codigoResposta: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir este despacho?",
      accept: () => {
        this.excluir(codigoResposta);
      },
    });
  }

  excluir(codigoResposta: number) {
    this.loaderService.show();
    this.despachoLaiService
      .excluir(codigoResposta)
      .then(() => {
        this.onCallParentDespachoLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Despacho excluído com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

}
