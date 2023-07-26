import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { DespachoLai } from 'src/app/core/models/despacho-lai.model';

@Injectable({
  providedIn: 'root'
})
export class DespachoLaiService {

  despachoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.despachoLaiUrl = `${environment.apiUrl}/despacho-lai`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.despachoLaiUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.despachoLaiDtoList;
     });
  }

  adicionar(despachoLai: DespachoLai): Promise<DespachoLai> {

    this.user = this.sessionService.getItem("currentUser");

    return this.http.post<DespachoLai>(`${this.despachoLaiUrl}`, despachoLai)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.despachoLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.despachoLaiDto;
     });
  }

  insertDespacho(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.despachoLaiUrl}/insert-despacho/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.despachoLaiDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.despachoLaiUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
