import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ModeloDocumentoLai } from 'src/app/core/models/modelo-documento-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { UtilService } from 'src/app/util.service';
import { ModeloDocumentoLaiService } from '../modelo-documento-lai.service';

@Component({
  selector: 'app-modelo-documento-lai-cadastro',
  templateUrl: './modelo-documento-lai-cadastro.component.html',
  styleUrls: ['./modelo-documento-lai-cadastro.component.css']
})
export class ModeloDocumentoLaiCadastroComponent implements OnInit {

  modeloDocumento = new ModeloDocumentoLai();

  tiposModelos = [];
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];



  constructor(
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.tiposModelos = this.utilService.listaTipoModelo();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarModelo(routeState.data);
    }else{
      this.modeloDocumento.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarModelo(codigo: number) {
    return this.modeloDocumentoLaiService.editar(codigo)
    .then((modeloDocumento) => {
      this.modeloDocumento = modeloDocumento.modeloDocumentoLaiDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.modeloDocumento.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarModelo(form);
    } else {
      this.adicionarModelo(form);
    }
  }

  adicionarModelo(form: NgForm) {
    this.modeloDocumentoLaiService.adicionar(this.modeloDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Modelo adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarModelo(form: NgForm) {
    this.modeloDocumentoLaiService.atualizar(this.modeloDocumento)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Modelo atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
