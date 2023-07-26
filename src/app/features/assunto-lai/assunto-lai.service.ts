import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Assunto } from './../../core/models/assunto.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class AssuntoLaiFiltro {
  area!: any;
}

@Injectable({
  providedIn: 'root',
})
export class AssuntoLaiService {

  assuntoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.assuntoLaiUrl = `${environment.apiUrl}/assunto-lai`;

  }


  pesquisarAssunto(codigo: any): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (codigo) {
      params = params.set('area', codigo);
    }
    return this.http.get(`${this.assuntoLaiUrl}/listar/assuntos?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data.assuntoDtoList;
      });
  }


  listar(): Promise<any> {

    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.assuntoLaiUrl}/listar?`, {params})
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });
  }

  pesquisar(filtro: AssuntoLaiFiltro): Promise<any> {
    let params = new HttpParams()

    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    if (filtro.area) {
      params = params.set('area', filtro.area);
    }

    return this.http.get(`${this.assuntoLaiUrl}/listar/assuntos?`, { params })
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data.assuntoDtoList;
      });
  }

  editar(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.assuntoLaiUrl}/${codigo}`)
      .toPromise()
      .then(res => <any>res)
      .then(data => {
        return data;
      });

  }

  atualizar(assunto: Assunto): Promise<Assunto> {
    return this.http.put<Assunto>(`${this.assuntoLaiUrl}/${assunto.id}`, assunto)
      .toPromise()
      .then(response => {
        const assuntoAlterado = response;
        return assuntoAlterado;
      });
  }

  adicionar(assunto: Assunto): Promise<Assunto> {
    this.user = this.sessionService.getItem("currentUser");
    assunto.orgao = this.user.orgao;

    return this.http.post<Assunto>(`${this.assuntoLaiUrl}`, assunto)
      .toPromise().then();
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.assuntoLaiUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
