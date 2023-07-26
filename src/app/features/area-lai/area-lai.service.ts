import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { Area } from './../../core/models/area.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



export class AreaFiltro {
  descricao!: string;
}

@Injectable({
    providedIn: 'root',
})
export class AreaLaiService {

  areaLaiUrl: string;

  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.areaLaiUrl = `${environment.apiUrl}/area-lai`;
  }

  listar(): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.areaLaiUrl}/listar?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.areaDtoList;
     });
  }

  listarAreas(instituicao: any): Promise<any> {

    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('instituicao', instituicao);

    return this.http.get<any>(`${this.areaLaiUrl}/listar/instituicao?`, {params})
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.areaDtoList;
     });
  }


  pesquisar(filtro: AreaFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
      params = params.set('orgao', this.user.orgao.toString());
    }

    return this.http.get(`${this.areaLaiUrl}?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    editar(codigo: number): Promise<any>{
      return this.http.get<any>(`${this.areaLaiUrl}/${codigo}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(area: Area): Promise<Area> {
      return this.http.put<Area>(`${this.areaLaiUrl}/${area.id}`, area)
        .toPromise()
        .then(response => {
          const areaAlterado = response;
          return areaAlterado;
        });
    }

    adicionar(area: Area): Promise<Area> {
      this.user = this.sessionService.getItem("currentUser");
      area.orgao = this.user.orgao;

      return this.http.post<Area>(`${this.areaLaiUrl}`, area)
        .toPromise().then();
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.areaLaiUrl}/${codigo}`)
        .toPromise()
        .then(() => null);
    }


}
