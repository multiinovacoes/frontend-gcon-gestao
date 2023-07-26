import { MessageService } from 'primeng/api';
import { UtilService } from './../../util.service';
import { ConfiguracaoLaiService } from './configuracao-lai.service';
import { ConfiguracaoLai } from './../../core/models/configuracao-lai.model';
import { Component, OnInit } from '@angular/core';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { NgForm, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-configuracao-lai',
  templateUrl: './configuracao-lai.component.html',
  styleUrls: ['./configuracao-lai.component.css']
})
export class ConfiguracaoLaiComponent implements OnInit {

  configuracao = new ConfiguracaoLai();


  constructor(
    private configuracaoLaiService: ConfiguracaoLaiService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private routeStateService: RouteStateService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.editar();
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizar(form);
    } else {
      this.adicionar(form);
    }
  }


  editar() {
    return this.configuracaoLaiService.editar()
    .then((configuracao) => {
      this.configuracao = configuracao.configuracaoLaiDto
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.configuracao.id)
  }

  adicionar(form: NgForm) {
    this.configuracaoLaiService.adicionar(this.configuracao)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Configuração cadastrada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizar(form: NgForm) {
    this.configuracaoLaiService.atualizar(this.configuracao)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Configuração atualizada com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  valor(c: FormControl): boolean {
    if (c.value == 0) {
        return true;
    }
    return false;
  }

}
