import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AtendimentoLaiFilter, AtendimentoLaiService } from '../atendimento-lai.service';

@Component({
  selector: 'app-pedido-consulta',
  templateUrl: './pedido-consulta.component.html',
  styleUrls: ['./pedido-consulta.component.css']
})
export class PedidoConsultaComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  atendimento!: any;
  showLoaderDialogAtendimentoPesquisa = false;
  filtro = new AtendimentoLaiFilter();
  @ViewChild('tabela') grid: Table;
  loading = false;
  assuntos = [];

  constructor(
    private atendimentoLaiService: AtendimentoLaiService,
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
    this.atendimentoLaiService.listar()
      .then(atendimentos =>{
        this.atendimentos = atendimentos.atendimentoLaiDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarAtendimento(codigo: number) {
    this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento-lai/pedido-cadastro', codigo, false);
  }

  novoAtendimento() {
    this.routeStateService.add('Novo Atendimento',
      '/main/atendimento-lai/pedido-cadastro', 0, false);
  }



  pesquisa(pagina = 0) {
    this.loaderService.show();
    this.filtro.pagina = pagina;
    this.atendimentoLaiService.pesquisar(this.filtro)
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
    this.atendimentoLaiService.excluir(atendimento.id)
      .then(() => {
        this.grid.reset();
        this.listar();
        this.messageService.add({ severity: 'success', detail: 'Atendimento excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

    cancelar(atendimento: any) {
     this.loaderService.show();
     this.atendimentoLaiService.cancelar(atendimento.id)
      .then( res => {
         this.atendimentoLaiService.pesquisar(this.filtro)
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
