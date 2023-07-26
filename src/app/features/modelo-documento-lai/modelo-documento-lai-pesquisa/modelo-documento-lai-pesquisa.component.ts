import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ModeloDocumentoLaiFiltro, ModeloDocumentoLaiService } from '../modelo-documento-lai.service';

@Component({
  selector: 'app-modelo-documento-lai-pesquisa',
  templateUrl: './modelo-documento-lai-pesquisa.component.html',
  styleUrls: ['./modelo-documento-lai-pesquisa.component.css']
})
export class ModeloDocumentoLaiPesquisaComponent implements OnInit {

  modelos = [];
  modelo!: any;
  filtro = new ModeloDocumentoLaiFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de modelos de documentos');
    this.listar();
  }

  listar() {
    
    this.modeloDocumentoLaiService.listar()
      .then(modelos =>{
        this.modelos = modelos.modeloDocumentoLaiDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarModelo(codigo: number) {
    this.routeStateService.add('Edição de Modelo Documento',
      '/main/modelo-documento-lai/modelo-documento-lai-cadastro', codigo, false);
  }

  novoModelo() {
    this.routeStateService.add('Novo Modelo Documento',
      '/main/modelo-documento-lai/modelo-documento-lai-cadastro', 0, false);
  }

  pesquisa() {
    this.modeloDocumentoLaiService.pesquisar(this.filtro)
      .then(modelos =>
        this.modelos = modelos.modeloDocumentoLaiDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(modelo: any) {
    this.modeloDocumentoLaiService.excluir(modelo.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Modelo excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(modelo: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(modelo);
      }
    });
  }

}
