import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetorLai } from 'src/app/core/models/setor-lai.model';

export class SetorLaiFiltro {
  descricao!: string;
}


@Injectable({
    providedIn: 'root',
})
export class SetorLaiService {

  setorLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.setorLaiUrl = `${environment.apiUrl}/setores-lai`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.setorLaiUrl}/listar?`,{params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }

  listarEspecificoSemSetorEncaminhadoAberto(codigoAtendimento: number): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('atendimento', codigoAtendimento.toString());

    return this.http.get<any>(`${this.setorLaiUrl}/listarEspecifico?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.setorLaiDtoList;
     });
  }


  listarEspecifico(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.setorLaiUrl}/listarEspecifico/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.setorLaiDtoList;
     });
  }

  pesquisar(filtro: SetorLaiFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.setorLaiUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.setorLaiUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(setor: SetorLai): Promise<SetorLai> {
      return this.http.put<SetorLai>(`${this.setorLaiUrl}/${setor.id}`, setor)
        .toPromise()
        .then(response => {
          const setorAlterado = response;
          return setorAlterado;
        });
    }

    adicionar(setor: SetorLai): Promise<SetorLai> {
      this.user = this.sessionService.getItem("currentUser");
      setor.orgao = this.user.orgao;
      return this.http.post<SetorLai>(`${this.setorLaiUrl}`, setor)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.setorLaiUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }
  


}
