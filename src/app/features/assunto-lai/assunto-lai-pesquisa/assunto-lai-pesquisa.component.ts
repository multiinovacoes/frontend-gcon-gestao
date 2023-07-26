import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AreaLaiService } from '../../area-lai/area-lai.service';
import { AssuntoLaiFiltro, AssuntoLaiService } from '../assunto-lai.service';

@Component({
  selector: 'app-assunto-lai-pesquisa',
  templateUrl: './assunto-lai-pesquisa.component.html',
  styleUrls: ['./assunto-lai-pesquisa.component.css']
})
export class AssuntoLaiPesquisaComponent implements OnInit {

  assuntos = [];
  assunto!: any;
  filtro = new AssuntoLaiFiltro();
  @ViewChild('tabela') grid: Table;
  areas = [];


  constructor(
    private assuntoLaiService: AssuntoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title,
    private confirmation: ConfirmationService,
    private areaLaiService: AreaLaiService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de assunto');
    this.carregarAreas();
  }

  listar() {
    this.assuntoLaiService.listar()
      .then(assuntos =>{
        this.assuntos = assuntos.assuntoDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarAssunto(codigo: number) {
    this.routeStateService.add('Edição de Assunto',
      '/main/assunto-lai/assunto-lai-cadastro', codigo, false);
  }

  novoAssunto() {
    this.routeStateService.add('Novo Assunto',
      '/main/assunto-lai/assunto-lai-cadastro', 0, false);
  }

  pesquisa() {
    this.assuntoLaiService.pesquisar(this.filtro)
      .then(assuntos =>
        this.assuntos = assuntos)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(assunto: any) {
    this.assuntoLaiService.excluir(assunto.id)
      .then(() => {
        this.pesquisa();
//        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Assunto excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(assunto: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(assunto);
      }
    });
  }


  carregarAreas() {
    this.areaLaiService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
