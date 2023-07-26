import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AreaLai } from 'src/app/core/models/area-lai.model';
import { EncaminhamentoLai } from "src/app/core/models/encaminhamento-lai.model";
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { AreaLaiService } from '../../area-lai/area-lai.service';
import { EncaminhamentoLaiService } from './encaminhamento-lai.service';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { SetorLai } from "src/app/core/models/setor-lai.model";
import { SetorLaiService } from "../../setor-lai/setor-lai.service";
import { ModeloDocumentoLaiService } from "../../modelo-documento-lai/modelo-documento-lai.service";
import { AnexoLaiService } from "../anexo-lai/anexo-lai.service";

@Component({
  selector: 'app-encaminhamento-lai',
  templateUrl: './encaminhamento-lai.component.html',
  styleUrls: ['./encaminhamento-lai.component.css']
})
export class EncaminhamentoLaiComponent implements OnInit {

  setores: SetorLai[];
  displayModal: boolean;
  displayModalVisualiza: boolean;
  satisfaz = "";
  loading = false;
  codigoAtendimento: number;
  modeloDocumentos = [];
  showLoaderDialog = false;
  modelo = "";
  anexos!: any;
  selectedAnexos: string[] = [];
  encaminhamentoLai: any;
  @ViewChild(NgForm) myForm: NgForm;
  @Output() callParent = new EventEmitter();

  solucaoSatisfaz = [
    { label: "Sim", value: "S" },
    { label: "Não", value: "N" },
  ];


  constructor(
    private setorLaiService: SetorLaiService,
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private anexoLaiService: AnexoLaiService,
    private loaderService: LoaderService,
    private encaminhamentoLaiService: EncaminhamentoLaiService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
    this.showLoaderDialog = val;
  });
    this.encaminhamentoLai = new EncaminhamentoLai();
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

  showVisualizaDialog(codigoEncaminhamento: number) {
    this.consultaEncaminhamento(codigoEncaminhamento);
    this.setores = SetorLai[0];
  }

  onCloseVisualiza() {
    this.displayModalVisualiza = false;
  }


  carregarSetorSAC(codigoAtendimento: number) {
    this.setorLaiService
      .listarEspecificoSemSetorEncaminhadoAberto(codigoAtendimento)
      .then((setores) => {
        this.setores = setores.map((o: { descricao: any; id: any }) => ({
          label: o.descricao,
          value: o.id,
        }));
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  showPositionDialog(codigoAtendimento: number) {
    this.resetMyForm();
    this.carregarSetorSAC(codigoAtendimento);
    this.carregarModeloDocumento();
    this.carregarAnexos(codigoAtendimento);
    this.encaminhamentoLai = new EncaminhamentoLai();
    this.encaminhamentoLai.atendimento = codigoAtendimento;
    this.displayModal = true;
    this.modelo = "";
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoLaiService
      .listarPorTipo("1")
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



  consultaModelo(): any {
    return this.modeloDocumentoLaiService
      .consultarModeloEnc(this.encaminhamentoLai)
      .then((modelo) => {
        this.modelo = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  confirmarExclusao(codigoEncaminhamento: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja cancelar este encaminhamento?",
      accept: () => {
        this.excluir(codigoEncaminhamento);
      },
    });
  }

  excluir(codigoEncaminhamento: number) {
    this.loaderService.show();
    this.encaminhamentoLaiService
      .excluir(codigoEncaminhamento)
      .then(() => {
        this.callParent.emit();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Encaminhamento cancelado com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }




  consultaEncaminhamento(codigoEncaminhamento: number) {
    this.loaderService.show();
   this.encaminhamentoLaiService
     .consultarEncaminhamentoLai(codigoEncaminhamento)
     .then((dados) => {
       this.encaminhamentoLai = dados;
     })
   .then((dados) => {
        this.loaderService.hide();
       this.displayModalVisualiza = true;
     })
     .catch((erro) => {
       this.loaderService.hide();
       this.errorHandler.handle(erro);
     })
 }

 resetMyForm() {
  if (this.myForm.valid) {
    this.myForm.reset();
    //this.modeloDocumentos = [];
    this.encaminhamentoLai = new EncaminhamentoLai();
  }
}

onClose() {
  this.displayModal = false;
}


 salvar() {
 
  if (this.encaminhamentoLai.email === ''){
    this.loaderService.show();
      this.encaminhamentoLai.despacho = this.modelo;
      return this.encaminhamentoLaiService
        .adicionar(this.encaminhamentoLai)
        .then((res) => {})
        .then((res) => {
          this.resetMyForm();
          this.onClose();
          this.callParent.emit();
          this.loaderService.hide();
          this.messageService.add({
            severity: "success",
            detail: "Atendimento encaminhado com sucesso!",
          });
        })
        .catch((erro) => {
          this.loaderService.hide();
          this.errorHandler.handle(erro);
        });
  }else{
    Swal.fire({
      icon: 'info',
      title: "Deseja enviar resposta parcial?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
        this.encaminhamentoLai.enviarRespostaParcial = true;
      } else if (result.isDenied) {
        this.encaminhamentoLai.enviarRespostaParcial = false;
      }else if (result.isDismissed){
        return;
      }
      this.loaderService.show();
      this.encaminhamentoLai.despacho = this.modelo;
      return this.encaminhamentoLaiService
        .adicionar(this.encaminhamentoLai)
        .then((res) => {})
        .then((res) => {
          this.resetMyForm();
          this.onClose();
          this.callParent.emit();
          this.loaderService.hide();
          this.messageService.add({
            severity: "success",
            detail: "Atendimento encaminhado com sucesso!",
          });
        })
        .catch((erro) => {
          this.loaderService.hide();
          this.errorHandler.handle(erro);
        });
    });
  }
}

carregarAnexos(codigoAtendimento: number) {
  this.anexoLaiService.listar(codigoAtendimento).then((anexos) => {
    this.anexos = anexos;
  });
}

preencherEmail(setor: any) {
  return this.setorLaiService
    .editar(setor)
    .then((setor) => {
      this.encaminhamentoLai.emailEnviado = setor.setorLaiDto.emailSetor;
    })
    .catch((erro) => this.errorHandler.handle(erro));
}





}
