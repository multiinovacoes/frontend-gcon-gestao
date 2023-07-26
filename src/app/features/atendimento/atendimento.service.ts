import { PaginacaoPainel } from './../painel/lista-novas-manifestacoes/lista-novas-manifestacoes.component';
import { AtendimentoConclusao } from './../../core/models/atendimentoConclusao.model';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { UtilService } from './../../util.service';
import { Atendimento } from './../../core/models/atendimento.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class AtendimentoFilter {
  solicitante!: string;
  dataInicio!: any;
  dataFinal!: any;
  assunto!: any;
  palavraChave!: string;
  protocolo!: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
    providedIn: 'root',
})
export class AtendimentoService {

  atendimentoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private sessionService: SessionService
  ) {
    this.atendimentoUrl = `${environment.apiUrl}/atendimentos`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  pesquisar(filtro: AtendimentoFilter): Promise<any> {
    let params = new HttpParams()
    if (filtro.solicitante) {
      params = params.set('solicitante', filtro.solicitante);
    }

    if (filtro.dataInicio) {
      params = params.set('dataInicio', filtro.dataInicio);
    }

    if (filtro.dataFinal) {
      params = params.set('dataFinal', filtro.dataFinal);
    }

    if (filtro.protocolo) {
      params = params.set('protocolo', filtro.protocolo);
    }

    if (filtro.palavraChave) {
      params = params.set('palavraChave', filtro.palavraChave);
    }

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.atendimentoDtoList,
            total: data.atendimentoDtoList.totalElements
          };

           return resultado;
     });
    }

  novosAtendimentos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoUrl}/listarNovos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  qtdAtendimentosMes(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosMes?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  qtdAtendimentosMesConcluidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosMesConcluidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  qtdAtendimentosNatureza(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosNatureza?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  qtdAtendimentosSecretaria(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.atendimentoUrl}/totalAtendimentosSecretaria?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    novo(): Promise<any>{
      return this.http.get<any>(`${this.atendimentoUrl}/novo-atendimento`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

    editar(codigo: number): Promise<any>{
      let params = new HttpParams()
      params = params.set('codigo', codigo.toString());
      return this.http.get<any>(`${this.atendimentoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

      pesquisaProtocolo(numeroProtocolo: string): Promise<any>{
         let params = new HttpParams()
         params = params.set('numeroProtocolo', numeroProtocolo);
      return this.http.get<any>(`${this.atendimentoUrl}/pesquisar-protocolo?`, { params })
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data.atendimentoDto;
       });
    }

    atualizar(atendimento: Atendimento): Promise<Atendimento> {
      return this.http.put<Atendimento>(`${this.atendimentoUrl}/${atendimento.id}`, atendimento)
        .toPromise()
        .then(response => {
          return response;
        });
    }

    concluir(atendimentoConclusao: AtendimentoConclusao): Promise<any> {
      return this.http.put<Atendimento>(`${this.atendimentoUrl}/concluir-atendimento`, atendimentoConclusao)
        .toPromise()
        .then(response => {
          return response;
        });
    }

    adicionar(atendimento: Atendimento): Promise<Atendimento> {
      this.user = this.sessionService.getItem("currentUser");
      atendimento.orgao = this.user.orgao;

      return this.http.post<Atendimento>(`${this.atendimentoUrl}`, atendimento)
        .toPromise();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.atendimentoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }

    cancelar(codigo: number): Promise<void> {
      return this.http.delete(`${this.atendimentoUrl}/cancelar/${codigo}`)
        .toPromise()
        .then(() => null);
    }

    listaNovosAtendimentos(filtro: PaginacaoPainel): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}/novos-atendimentos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.atendimentoDtoList,
            total: data.atendimentoDtoList.totalElements
          };

           return resultado;
     });
    }

  listaEncaminhamentosRecebidos(filtro: PaginacaoPainel): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    return this.http.get(`${this.atendimentoUrl}/atendimentos-recebidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
          const resultado = {
            atendimentos: data.modeloListaAtendimentosRecebidos,
            total: data.modeloListaAtendimentosRecebidos.totalElements
          };

           return resultado;
     });
    }

    historicoUsuario(codigoAtendimento: number): Promise<any> {
    let params = new HttpParams()
    params = params.set('codigoAtendimento', codigoAtendimento.toString());

    return this.http.get(`${this.atendimentoUrl}/historico-usuario?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data.historicoManifestanteDtoList;
     });
    }


}
