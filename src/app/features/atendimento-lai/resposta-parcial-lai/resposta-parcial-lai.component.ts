import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from "@angular/core";

import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RespostaParcialLai } from 'src/app/core/models/resposta-parcial-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { UtilService } from 'src/app/util.service';
import { ModeloDocumentoLaiService } from '../../modelo-documento-lai/modelo-documento-lai.service';
import { RespostaParcialLaiService } from './resposta-parcial-lai.service';

@Component({
  selector: 'app-resposta-parcial-lai',
  templateUrl: './resposta-parcial-lai.component.html',
  styleUrls: ['./resposta-parcial-lai.component.css']
})
export class RespostaParcialLaiComponent  {

  displayModal: boolean;
  respostaParcial = new RespostaParcialLai();
  modeloDocumentos: any;
  displayModalVisualizaResposta: boolean;
  @Output() onCallParentRespostaParcialLai = new EventEmitter();
  @ViewChild(NgForm) myForm: NgForm;
  habilitaEmail = true;
  tipoUsuario = false;

  formasResposta = [];

  constructor(
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private confirmation: ConfirmationService,
    private utilService: UtilService,
    private respostaParcialLaiService: RespostaParcialLaiService
  ) {}



  salvar() {
    this.loaderService.show();
    return this.respostaParcialLaiService
      .adicionar(this.respostaParcial)
      .then((res) => {
        this.onClose();
        this.onCallParentRespostaParcialLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta parcial adicionada com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onClose() {
    this.displayModal = false;
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
      .consultarModeloOutros(codigo, this.respostaParcial.atendimento)
      .then((modelo) => {
        this.respostaParcial.descricao = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showVisualizaDialog(codigoResposta: number) {
    this.consultaResposta(codigoResposta);
  }

  onCloseVisualiza() {
        this.myForm.reset();
    this.displayModalVisualizaResposta = false;
  }

  showPositionDialog(codigoAtendimento: number, email: string) {

    this.carregarModeloDocumento();
    this.formasResposta = this.utilService.listaFormaEnvioResposta();
    this.habilitaEmail = true;
    this.respostaParcial = new RespostaParcialLai();
    this.respostaParcial.formaEnvio = 0;
    this.respostaParcial.atendimento = codigoAtendimento;
    this.respostaParcial.emailEnviado = email;
    if (email != null){
      this.respostaParcial.formaEnvio = 0;
      this.tipoUsuario = true;
    }else{
      this.tipoUsuario = false;
    }
    this.displayModal = true;
  }

  consultaResposta(codigoResposta: number) {
    this.loaderService.show();
    this.respostaParcialLaiService
      .consultar(codigoResposta)
      .then((dados) => {
        this.respostaParcial = dados;
        this.respostaParcial.descricaoFormaEnvio = "Email";
      })
      .then((dados) => {
        this.loaderService.hide();
        this.displayModalVisualizaResposta = true;
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
      message: "Tem certeza que deseja excluir esta resposta parcial?",
      accept: () => {
        this.excluir(codigoResposta);
      },
    });
  }

  excluir(codigoResposta: number) {
    this.loaderService.show();
    this.respostaParcialLaiService
      .excluir(codigoResposta)
      .then(() => {
        this.onCallParentRespostaParcialLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Resposta Parcial excluída com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

}
