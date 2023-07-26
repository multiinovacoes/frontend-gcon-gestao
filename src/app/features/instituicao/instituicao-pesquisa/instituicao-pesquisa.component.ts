import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { InstituicaoFiltro, InstituicaoService } from '../instituicao.service';

@Component({
  selector: 'app-instituicao-pesquisa',
  templateUrl: './instituicao-pesquisa.component.html',
  styleUrls: ['./instituicao-pesquisa.component.css']
})
export class InstituicaoPesquisaComponent implements OnInit {

  instituicoes = [];
  instituicao!: any;
  filtro = new InstituicaoFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private instituicaoService: InstituicaoService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Instituição');
    this.listar();
  }

  listar() {
    this.instituicaoService.listar()
      .then(instituicoes =>{
        this.instituicoes = instituicoes;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarInstituicao(codigo: number) {
    this.routeStateService.add('Edição de Instituição',
      '/main/instituicao/instituicao-cadastro', codigo, false);
  }

  novaInstituicao() {
    this.routeStateService.add('Nova Instituição',
      '/main/instituicao/instituicao-cadastro', 0, false);
  }

  pesquisa() {
    this.instituicaoService.pesquisar(this.filtro)
      .then(instituicoes =>
        this.instituicoes = instituicoes.instituicaoDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(instituicao: any) {
    this.instituicaoService.excluir(instituicao.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Instituição excluída com sucesso!' });
    })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(instituicao: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(instituicao);
      }
    });
  }  

}
