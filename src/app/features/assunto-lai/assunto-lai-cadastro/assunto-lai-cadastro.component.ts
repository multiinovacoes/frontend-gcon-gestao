import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AssuntoLai } from 'src/app/core/models/assunto-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { AreaLaiService } from '../../area-lai/area-lai.service';
import { InstituicaoService } from '../../instituicao/instituicao.service';
import { AssuntoLaiService } from '../assunto-lai.service';

@Component({
  selector: 'app-assunto-lai-cadastro',
  templateUrl: './assunto-lai-cadastro.component.html',
  styleUrls: ['./assunto-lai-cadastro.component.css']
})
export class AssuntoLaiCadastroComponent implements OnInit {

  assunto = new AssuntoLai();
  areas!: any;
  instituicoes!: any;
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];

  constructor(
    private assuntoLaiService: AssuntoLaiService,
    private messageService: MessageService,
    private areaLaiService: AreaLaiService,
    private instituicaoService: InstituicaoService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.carregarInstituicoes();
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarAssunto(routeState.data);
    }else{
      this.assunto.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarAssunto(codigo: number) {
    return this.assuntoLaiService.editar(codigo)
    .then((assunto) => {
      this.assunto = assunto.assuntoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.assunto.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarAssunto(form);
    } else {
      this.adicionarAssunto(form);
    }
  }

  adicionarAssunto(form: NgForm) {
    this.assuntoLaiService.adicionar(this.assunto)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Assunto adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarAssunto(form: NgForm) {
    this.assuntoLaiService.atualizar(this.assunto)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Assunto atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAreas() {
    this.areaLaiService.listarAreas(this.assunto.instituicao)
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
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
