import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AreaLai } from 'src/app/core/models/area-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { InstituicaoService } from '../../instituicao/instituicao.service';
import { AreaLaiService } from '../area-lai.service';

@Component({
  selector: 'app-area-lai-cadastro',
  templateUrl: './area-lai-cadastro.component.html',
  styleUrls: ['./area-lai-cadastro.component.css']
})
export class AreaLaiCadastroComponent implements OnInit {

  area = new AreaLai();
  instituicoes!: any;
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];


  constructor(
    private areaLaiService: AreaLaiService,
    private messageService: MessageService,
    private instituicaoService: InstituicaoService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.carregarInstituicoes();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarArea(routeState.data);
    }else{
      this.area.status = 0;
    }

  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarArea(codigo: number) {
    return this.areaLaiService.editar(codigo)
    .then((area) => {
      this.area = area.areaDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.area.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarArea(form);
    } else {
      this.adicionarArea(form);
    }
  }

  adicionarArea(form: NgForm) {
    this.areaLaiService.adicionar(this.area)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Área adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarArea(form: NgForm) {
    this.areaLaiService.atualizar(this.area)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Área atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarInstituicoes() {
    this.instituicaoService.listar()
      .then(instituicoes => {
        this.instituicoes = instituicoes.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
