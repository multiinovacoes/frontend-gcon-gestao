import { Anexo } from "./../../../core/models/anexo.model";
import { NgForm } from "@angular/forms";
import { MessageService, ConfirmationService } from "primeng/api";
import { LoaderService } from "./../../../core/services/loader.service";
import { ErrorHandlerService } from "./../../../core/services/error-handler.service";
import { AnexoLaiService } from '../anexo-lai/anexo-lai.service';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-anexo-lai",
  templateUrl: "./anexo-lai.component.html",
  styleUrls: ["./anexo-lai.component.css"],
})
export class AnexoLaiComponent implements OnInit {
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
  @ViewChild('fileUpload') fileUpload: any;
  static MYME_TYPE_PDF = 'application/pdf';
  fileUrl;

  constructor(
    private errorHandler: ErrorHandlerService,
    private loaderService: LoaderService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private anexoService: AnexoLaiService
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

  showAnexo(codigoAtendimento: number, statusAtendimento: number) {
    this.myFormAnexo.reset();
    this.anexo.atendimento = codigoAtendimento;
    this.anexo.statusAtendimento = statusAtendimento;
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
      this.fileUpload.clear();
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
        this.myFormAnexo.reset();
        this.uploadedFiles.length = 0;
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


  static baixarDocumentoBase64Pdf(conteudo, nomeArquivo) {
    AnexoLaiComponent.baixarDocumentoBase64(conteudo, nomeArquivo, AnexoLaiComponent.MYME_TYPE_PDF);
  }

  download(nomeArquivo: string){
    this.loaderService.show();
    this.anexoService
    .download(nomeArquivo)
    .then((response) => {
      const file = new Blob([response], { type: response.type });
      var url = URL.createObjectURL(file);
      this.loaderService.hide();
      window.open(url);
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  static baixarDocumentoBase64(conteudo, nomeArquivo, mymeType) {
    const blob = AnexoLaiComponent.b64toBlob(conteudo, mymeType);
    const blobUrl = URL.createObjectURL(blob); 

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = nomeArquivo;
    downloadLink.click();
    downloadLink.remove();
  }

  static b64toBlob(b64Data, contentType) {
    const sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }
}
