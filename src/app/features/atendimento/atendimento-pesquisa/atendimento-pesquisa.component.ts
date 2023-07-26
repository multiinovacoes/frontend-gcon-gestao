import { LoaderService } from 'src/app/core/services/loader.service';
import { AtendimentoService, AtendimentoFilter } from './../atendimento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-atendimento-pesquisa',
  templateUrl: 'atendimento-pesquisa.component.html',
  styleUrls: ['atendimento-pesquisa.component.css']
})
export class AtendimentoPesquisaComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  atendimento!: any;
  showLoaderDialogAtendimentoPesquisa = false;
  filtro = new AtendimentoFilter();
  @ViewChild('tabela') grid: Table;
  loading = false;
  assuntos = [];

  constructor(
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private loaderService: LoaderService,
    private title: Title,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

   ngOnInit(): void {
      this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogAtendimentoPesquisa = val;
    });
     this.title.setTitle('Pesquisa de atendimentos');
  }

   ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }


  listar() {
    this.atendimentoService.listar()
      .then(atendimentos =>{
        this.atendimentos = atendimentos.atendimentoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarAtendimento(codigo: number) {
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', codigo, false);
  }

  novoAtendimento() {
    this.routeStateService.add('Novo Atendimento',
      '/main/atendimento/atendimento-cadastro', 0, false);
  }

  pesquisa(pagina = 0) {
    this.loaderService.show();
    this.filtro.pagina = pagina;
    this.atendimentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.atendimentos.totalElements;
        this.atendimentos = resultado.atendimentos.content;
      }
      ).then(res =>{
        this.loaderService.hide();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    if (this.atendimentos.length > 0) {
      this.pesquisa(pagina);
    }
  }

  excluir(atendimento: any) {
    this.atendimentoService.excluir(atendimento.id)
      .then(() => {
        this.grid.reset();
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Atendimento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

    cancelar(atendimento: any) {
     this.loaderService.show();
     this.atendimentoService.cancelar(atendimento.id)
      .then( res => {
         this.atendimentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.totalRegistros = resultado.atendimentos.totalElements;
          this.atendimentos = resultado.atendimentos.content;
          }).then(res => {
          this.messageService.add({ severity: 'success', detail: 'Atendimento cancelado com sucesso!' });
          this.loaderService.hide();
          })
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(atendimento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja cancelar esta manifestação?',
      accept: () => {
        this.cancelar(atendimento);
      }
    });
  }
}
