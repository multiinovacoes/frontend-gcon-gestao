import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { RespostaParcialLai } from 'src/app/core/models/resposta-parcial-lai.model';

@Injectable({
  providedIn: 'root'
})
export class RespostaParcialLaiService {

  respostaParcialLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.respostaParcialLaiUrl = `${environment.apiUrl}/resposta-parcial-lai`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.respostaParcialLaiUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.respostaParcialLaiDtoList;
     });
  }

  adicionar(respostaParcial: RespostaParcialLai): Promise<RespostaParcialLai> {

    this.user = this.sessionService.getItem("currentUser");

    return this.http.post<RespostaParcialLai>(`${this.respostaParcialLaiUrl}`, respostaParcial)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.respostaParcialLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.respostaParcialLaiDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.respostaParcialLaiUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
