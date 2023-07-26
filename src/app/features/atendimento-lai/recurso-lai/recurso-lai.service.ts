import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { RecursoLai } from 'src/app/core/models/recurso-lai.model';

@Injectable({
  providedIn: 'root'
})

export class RecursoLaiService {

  recursoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.recursoLaiUrl = `${environment.apiUrl}/recurso-lai`;
   }

   listar(codigoAtendimento: number): Promise<any> {
    return this.http.get<any>(`${this.recursoLaiUrl}/consultaPedido/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.recursoLaiDtoList;
     });
  }

  responder(recursoLai: RecursoLai): Promise<RecursoLai> {
    this.user = this.sessionService.getItem("currentUser");
    return this.http.post<RecursoLai>(`${this.recursoLaiUrl}/responder-recurso`, recursoLai)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.recursoLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.recursoLaiDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.recursoLaiUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }


}
