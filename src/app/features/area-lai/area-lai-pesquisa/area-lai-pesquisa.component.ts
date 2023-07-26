import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AreaFiltro } from '../../area/area.service';
import { AreaLaiService } from '../area-lai.service';

@Component({
  selector: 'app-area-lai-pesquisa',
  templateUrl: './area-lai-pesquisa.component.html',
  styleUrls: ['./area-lai-pesquisa.component.css']
})
export class AreaLaiPesquisaComponent implements OnInit {

  areas = [];
  area!: any;
  filtro = new AreaFiltro();
  @ViewChild('tabela') grid: Table;

  constructor(
    private areaLaiService: AreaLaiService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de área');
    this.listar();
  }

  listar() {
    this.areaLaiService.listar()
      .then(areas =>{
        this.areas = areas;
      }
      )
      .catch(erro => this.errorHandler.handle(erro));
  }


  editarArea(codigo: number) {
    this.routeStateService.add('Edição de Área',
      '/main/area-lai/area-lai-cadastro', codigo, false);
  }

  novaArea() {
    this.routeStateService.add('Nova Área',
      '/main/area-lai/area-lai-cadastro', 0, false);
  }

  pesquisa() {
    this.areaLaiService.pesquisar(this.filtro)
      .then(areas =>
        this.areas = areas.areaDtoList)
      .catch(erro => this.errorHandler.handle(erro));
  }

  excluir(area: any) {
    this.areaLaiService.excluir(area.id)
      .then(() => {
        this.listar();
        this.grid.reset();
        this.messageService.add({ severity: 'success', detail: 'Área excluída com sucesso!' });
    })
      .catch(erro => this.errorHandler.handle(erro));
  }


  confirmarExclusao(area: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(area);
      }
    });
  }  

}
