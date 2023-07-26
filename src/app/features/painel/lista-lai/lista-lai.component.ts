import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AtendimentoLaiService } from '../../atendimento-lai/atendimento-lai.service';


export class PaginacaoPainel {
  pagina = 0;
  itensPorPagina = 10;
}

@Component({
  selector: 'app-lista-lai',
  templateUrl: './lista-lai.component.html',
  styleUrls: ['./lista-lai.component.css']
})
export class ListaLaiComponent implements OnInit {

  totalRegistros = 0;
  atendimentos = [];
  @ViewChild('tabela') grid: Table;
  filtro = new PaginacaoPainel();
  loading = false;
  showLoaderDialogPainel = false;

  constructor(
    private atendimentoLaiService: AtendimentoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private loaderService: LoaderService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogPainel = val;
    });
    this.title.setTitle('Lista de Novos Pedidos de Informação');
    this.loaderService.show();
    this.listar();
  }

  listar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.atendimentoLaiService.listaNovosAtendimentosLai(this.filtro)
      .then(resultado =>{
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
      this.listar(pagina);
    }
  }

  
  showAtendimento(idAtendimento: number){
    this.routeStateService.add('Pedido de Informação',
      '/main/atendimento-lai/pedido-cadastro', idAtendimento, false);
  }


}
