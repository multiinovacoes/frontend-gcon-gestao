import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SetorLaiFiltro, SetorLaiService } from '../setor-lai.service';

@Component({
  selector: 'app-setor-lai-pesquisa',
  templateUrl: './setor-lai-pesquisa.component.html',
  styleUrls: ['./setor-lai-pesquisa.component.css']
})
export class SetorLaiPesquisaComponent implements OnInit {

  setores = [];
  setor!: any;
  filtro = new SetorLaiFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private setorLaiService: SetorLaiService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) {

  }

  ngOnInit() {
    this.title.setTitle('Pesquisa de setor');
    this.listar();
  }

  listar() {
    this.setorLaiService.listar()
      .then(setores =>{
        this.setores = setores.setorLaiDtoList;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarSetor(codigo: number) {
    this.routeStateService.add('Edição de Setor',
      '/main/setor-lai/setor-lai-cadastro', codigo, false);
  }

  novoSetor() {
    this.routeStateService.add('Novo Setor',
      '/main/setor-lai/setor-lai-cadastro', 0, false);
  }

  pesquisa() {
    this.setorLaiService.pesquisar(this.filtro)
      .then(setores =>
        this.setores = setores.setorLaiDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(setor: any) {
    this.setorLaiService.excluir(setor.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Setor excluído com sucesso!' });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(setor: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(setor);
      }
    });
  }

}
