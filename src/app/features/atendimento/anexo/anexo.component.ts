import { AnexoService } from "./anexo.service";
import { Anexo } from "./../../../core/models/anexo.model";
import { NgForm } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { LoaderService } from "./../../../core/services/loader.service";
import { ErrorHandlerService } from "./../../../core/services/error-handler.service";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";

@Component({
  selector: "app-anexo",
  templateUrl: "./anexo.component.html",
  styleUrls: ["./anexo.component.css"],
})
export class AnexoComponent implements OnInit {
  displayModal: boolean;
  showLoaderDialog = false;
  fileName = "";
  uploadedFiles: any[] = [];
  fileSelected?: File;
  base64: string = "Base64...";
  anexo = new Anexo();
  anexos!: any;
  idAnexoSelecao: any;
  @ViewChild("myFormAnexo", { static: false }) myFormAnexo: NgForm;

  constructor(
    private errorHandler: ErrorHandlerService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private anexoService: AnexoService
  ) {}

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialog = val;
    });
  }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

  showAnexo(codigoAtendimento: number) {
    this.myFormAnexo.reset();
    this.anexo.atendimento = codigoAtendimento;
    this.carregarAnexos(codigoAtendimento);
    this.displayModal = true;
  }

  excluirAnexo(codigoAnexo: number) {
    this.confirmarExclusao(codigoAnexo);
  }

  carregarAnexos(codigoAtendimento: number) {
    this.anexoService.listar(codigoAtendimento).then((anexos) => {
      this.anexos = anexos;
    });
  }

  /**
   * Convert File To Base64
   */
  convertFileToBase64(
    file: File,
    index: number,
    event: { target: { files: File[] }; files: any }
  ) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let anexo = new Anexo();
      anexo.stringBase64 = reader.result as string;
      anexo.nomeArquivo = file.name;
      this.anexo.listaAnexoDto[index] = anexo;
      this.adicionar(event);
    };
  }

  carregaArquivo(event: { target: { files: File[] }; files: any }) {
    for (let index = 0; index < event.files.length; index++) {
      const file: File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, event);
      }
    }
  }

  adicionar(event: any) {
    this.loaderService.show();
    this.anexoService
      .adicionar(this.anexo)
      .then((response) => {
        this.carregarAnexos(this.anexo.atendimento);
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Anexo adicionado com sucesso!",
        });
      })
      .then((response) => {
        event.files.length = 0;
        this.idAnexoSelecao = false;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onClose() {
    this.displayModal = false;
  }

  confirmarExclusao(codigoAnexo: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir este anexo?",
      accept: () => {
        this.excluir(codigoAnexo);
      },
    });
  }

  excluir(codigoAnexo: number) {
    this.loaderService.show();
    this.anexoService
      .excluir(codigoAnexo)
      .then(() => {
        this.loaderService.hide();
        this.carregarAnexos(this.anexo.atendimento);
        this.messageService.add({
          severity: "success",
          detail: "Anexo excluído com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }
}
