import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Anexo } from 'src/app/core/models/anexo.model';
import { RecursoLai } from 'src/app/core/models/recurso-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ModeloDocumentoLaiService } from '../../modelo-documento-lai/modelo-documento-lai.service';
import { AnexoLaiService } from '../anexo-lai/anexo-lai.service';
import { RecursoLaiService } from './recurso-lai.service';

@Component({
  selector: 'app-recurso-lai',
  templateUrl: './recurso-lai.component.html',
  styleUrls: ['./recurso-lai.component.css']
})
export class RecursoLaiComponent  {


  resultadosRecurso = [];

  modeloDocumentos = [];
  uploadedFiles: any[] = [];
  fileSelected?: File;
  base64: string = "Base64...";
  anexo = new Anexo();
  anexos!: any;
  idAnexoSelecao: any;

  displayRecursoLaiModal: boolean;
  recursoLai = new RecursoLai();
  displayModalVisualizaRecursoLai: boolean;
  @Output() onCallParentRecursoLai = new EventEmitter();
  @ViewChild(NgForm) myForm: NgForm;
  
  

  constructor(
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private loaderService: LoaderService,
    private anexoService: AnexoLaiService,
    private confirmation: ConfirmationService,
    private recursoLaiService: RecursoLaiService
  ) { }

  convertFileToBase64(file: File, index: number, anexo: Anexo) {
    let reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onload = () => {
      anexo.stringBase64 = reader.result as string;
      anexo.nomeArquivo = file.name;
      this.recursoLai.listaAnexoDto[0] = anexo;
    }
  }
  
  carregaArquivo(event: { target: { files: File[]; }; files: any; }) {
  
    for (let index = 0; index < event.files.length; index++) {
      let anexo = new Anexo();
      const file:File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, anexo);
      }
    }
  }
  


  responderRecurso() {
    this.loaderService.show();
    return this.recursoLaiService
      .responder(this.recursoLai)
      .then((res) => {
        this.onClose();
        this.onCallParentRecursoLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Recurso respondido com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onClose() {
    this.displayRecursoLaiModal = false;
  }

  showVisualizaRecurso(codigoRecurso: number) {
    this.consultaRecurso(codigoRecurso);
  }

  consultaRecurso(codigoRecurso: number) {
    this.loaderService.show();
    this.recursoLaiService
      .consultar(codigoRecurso)
      .then((dados) => {
        this.recursoLai = dados;
      })
      .then((dados) => {
        this.listaResultadosRecurso();
        this.carregarModeloDocumento();
        this.loaderService.hide();
        this.displayRecursoLaiModal = true;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      })
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoLaiService
      .listarPorTipo("6")
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


  confirmarExclusao(codigoRecurso: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja cancelar este recurso?",
      accept: () => {
        this.excluir(codigoRecurso);
      },
    });
  }

  excluir(codigoRecurso: number) {
    this.loaderService.show();
    this.recursoLaiService
      .excluir(codigoRecurso)
      .then(() => {
        this.onCallParentRecursoLai.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Recurso cancelado com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }


  consultaModelo(): any {
    return this.modeloDocumentoLaiService
      .consultarModeloOutros(this.recursoLai.modeloDocumento, this.recursoLai.atendimento)
      .then((modelo) => {
        this.recursoLai.respostaRecurso = modelo;
        console.log(this.recursoLai);
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }



  listaResultadosRecurso(): any[]{
    this.resultadosRecurso = [
      { label: 'Procedente', value: 1 },
      { label: 'Procedente Parcial', value: 2 }, 
      { label: 'Improcedente', value: 3 }
    ];
    return this.resultadosRecurso;
  }



}
