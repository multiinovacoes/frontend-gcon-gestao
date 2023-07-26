import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { ModeloDocumento } from './../../core/models/modelo-documento.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Encaminhamento } from 'src/app/core/models/encaminhamento.model';
import { ModeloDocumentoLai } from 'src/app/core/models/modelo-documento-lai.model';


export class ModeloDocumentoLaiFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class ModeloDocumentoLaiService {

  modeloDocumentoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.modeloDocumentoLaiUrl = `${environment.apiUrl}/modelos-doc-lai`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  listarPorTipo(tipo: string): Promise<any[]> {

    let params = new HttpParams()
    params = params.set('tipo', tipo);
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());


    return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/modeloDocTipos?`, { params })
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.modeloDocumentoLaiDtoList;
     });
  }

  pesquisar(filtro: ModeloDocumentoLaiFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.modeloDocumentoLaiUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.modeloDocumentoLaiUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });
    }

    atualizar(modeloDocumento: ModeloDocumentoLai): Promise<ModeloDocumentoLai> {
      return this.http.put<ModeloDocumento>(`${this.modeloDocumentoLaiUrl}/${modeloDocumento.id}`, modeloDocumento)
        .toPromise()
        .then(response => {
          const modeloAlterado = response;
          return modeloAlterado;
        });
    }

    adicionar(modeloDocumento: ModeloDocumentoLai): Promise<ModeloDocumento> {
      this.user = this.sessionService.getItem("currentUser");
      modeloDocumento.orgao = this.user.orgao;

      return this.http.post<ModeloDocumento>(`${this.modeloDocumentoLaiUrl}`, modeloDocumento)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.modeloDocumentoLaiUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


    consultarModelo(codigo: number): Promise<ModeloDocumentoLai>{
      return this.http.get<ModeloDocumentoLai>(`${this.modeloDocumentoLaiUrl}/${codigo}`)
      .toPromise()
       .then(data => {
         return data.modeloDocumentoLaiDto;
       });
    }

    consultarModeloEnc(encaminhamento: any): Promise<any>{

      let params = new HttpParams()
      params = params.set('atendimento', encaminhamento.atendimento);
      params = params.set('setorDestino', encaminhamento.setorDestino);
      params = params.set('modeloDocumento',  encaminhamento.modeloDocumento);

      return this.http.get<ModeloDocumentoLai>(`${this.modeloDocumentoLaiUrl}/modeloDocEnc?`, { params })
      .toPromise()
       .then(data => {
         return data.resposta;
       });
    }

    consultarModeloOutros(codigoModelo: any, codigoAtendimento: any): Promise<any>{

      let params = new HttpParams()
      params = params.set('codigoAtendimento', codigoAtendimento);
      params = params.set('codigoModelo',  codigoModelo);

      return this.http.get<ModeloDocumentoLai>(`${this.modeloDocumentoLaiUrl}/modeloDocOutros?`, { params })
      .toPromise()
       .then(data => {
         return data.resposta;
       });
    }

}
