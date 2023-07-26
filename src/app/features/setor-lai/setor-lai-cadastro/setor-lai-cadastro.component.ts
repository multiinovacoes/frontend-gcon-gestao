import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SetorLai } from 'src/app/core/models/setor-lai.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SetorLaiService } from '../setor-lai.service';

@Component({
  selector: 'app-setor-lai-cadastro',
  templateUrl: './setor-lai-cadastro.component.html',
  styleUrls: ['./setor-lai-cadastro.component.css']
})
export class SetorLaiCadastroComponent implements OnInit {

  setor = new SetorLai();
  status = [
    { label: 'Ativo', value: 0 },
    { label: 'Inativo', value: 1 },
  ];

  constructor(
    private setorLaiService: SetorLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService) { }

  ngOnInit() {
    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {
      this.editarSetor(routeState.data);
    }else{
      this.setor.status = 0;
    }
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  editarSetor(codigo: number) {
    return this.setorLaiService.editar(codigo)
    .then((setor) => {
      this.setor = setor.setorLaiDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.setor.id)
  }


  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }

  adicionar(form: NgForm) {
    this.setorLaiService.adicionar(this.setor)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Setor adicionado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizar(form: NgForm) {
    this.setorLaiService.atualizar(this.setor)
    .then(() => {
      this.back();
      this.messageService.add({ severity: 'success', detail: 'Setor atualizado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
