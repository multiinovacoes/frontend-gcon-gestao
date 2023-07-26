import { SessionService } from './../../../core/services/session.service';
import { UtilService } from './../../../util.service';
import { User } from './../../../core/models/user.model';
import { Encaminhamento } from './../../../core/models/encaminhamento.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoService {

  encaminhamentoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private sessionService: SessionService
  ) {
    this.encaminhamentoUrl = `${environment.apiUrl}/encaminhamentos`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDtoList;
     });
  }

   encaminhamentoSatisfaz(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/listar/encaminhamento/resposta/${codigoAtendimento}`)
     .toPromise()
       .then(data => {
         return data.resposta;
       });
  }

  listarAbertos(codigoAtendimento: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoUrl}/listarAbertos/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDtoList;
     });
  }

  adicionar(encaminhamento: Encaminhamento): Promise<Encaminhamento> {
    return this.http.post<Encaminhamento>(`${this.encaminhamentoUrl}`, encaminhamento)
      .toPromise();
  }

  consultarEncaminhamento(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.encaminhamentoUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

    encaminhamentosRecebidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.encaminhamentoUrl}/encaminhamentosRecebidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }



}
