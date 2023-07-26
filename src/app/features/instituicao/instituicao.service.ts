import { Instituicao } from './../../core/models/instituicao.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';

export class InstituicaoFiltro {
  descricao!: string;
}

@Injectable({
  providedIn: 'root'
})
export class InstituicaoService {

  instituicaoUrl: string;

  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.instituicaoUrl = `${environment.apiUrl}/instituicao`;
  }

  pesquisar(filtro: InstituicaoFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
      params = params.set('orgao', this.user.orgao.toString());
    }

    return this.http.get(`${this.instituicaoUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

  listar(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    return this.http.get<any>(`${this.instituicaoUrl}/listar`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.instituicaoDtoList;
     });
  }


    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.instituicaoUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(instituicao: Instituicao): Promise<Instituicao> {
      return this.http.put<Instituicao>(`${this.instituicaoUrl}/${instituicao.id}`, instituicao)
        .toPromise()
        .then(response => {
          const instituicaoAlterado = response;
          return instituicaoAlterado;
        });
    }

    adicionar(instituicao: Instituicao): Promise<Instituicao> {
      this.user = this.sessionService.getItem("currentUser");
      instituicao.orgao = this.user.orgao;
      return this.http.post<Instituicao>(`${this.instituicaoUrl}`, instituicao)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.instituicaoUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
}
