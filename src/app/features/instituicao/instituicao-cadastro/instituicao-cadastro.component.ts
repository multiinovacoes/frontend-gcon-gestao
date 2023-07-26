
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Instituicao } from 'src/app/core/models/instituicao.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { InstituicaoService } from '../instituicao.service';

@Component({
  selector: 'app-instituicao-cadastro',
  templateUrl: './instituicao-cadastro.component.html',
  styleUrls: ['./instituicao-cadastro.component.css']
})
export class InstituicaoCadastroComponent implements OnInit {

  instituicao = new Instituicao();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];


  constructor(
    private instituicaoService: InstituicaoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarInstituicao(routeState.data);
    }else{
      this.instituicao.status = 0;
    }

  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarInstituicao(codigo: number) {
    return this.instituicaoService.editar(codigo)
    .then((instituicao) => {
      this.instituicao = instituicao.instituicaoDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.instituicao.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarInstituicao(form);
    } else {
      this.adicionarInstituicao(form);
    }
  }

  adicionarInstituicao(form: NgForm) {
    this.instituicaoService.adicionar(this.instituicao)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Instituição adicionada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarInstituicao(form: NgForm) {
    this.instituicaoService.atualizar(this.instituicao)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Instituição atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}
