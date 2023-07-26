import { SessionService } from './../../../core/services/session.service';
import { UtilService } from './../../../util.service';
import { User } from './../../../core/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { EncaminhamentoLai } from 'src/app/core/models/encaminhamento-lai.model';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoLaiService {

  encaminhamentoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private sessionService: SessionService
  ) {
    this.encaminhamentoLaiUrl = `${environment.apiUrl}/encaminhamento-lai`;
   }

   listar(codigoAtendimento: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listar/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoLaiDtoList;
     });
  }

   encaminhamentoLaiSatisfaz(codigoAtendimento: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listar/encaminhamento/resposta/${codigoAtendimento}`)
     .toPromise()
       .then(data => {
         return data.resposta;
       });
  }

  listarAbertos(codigoAtendimento: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listarAbertos/atendimento/${codigoAtendimento}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoLaiDtoList;
     });
  }

  adicionar(encaminhamento: EncaminhamentoLai): Promise<EncaminhamentoLai> {
    return this.http.post<EncaminhamentoLai>(`${this.encaminhamentoLaiUrl}`, encaminhamento)
      .toPromise();
  }

  atendimentosEnviadosLai(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listar-atendimentos-enviados?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    atendimentosRecebidosLai(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.encaminhamentoLaiUrl}/encaminhamentos-recebidos-lai?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }
  
    atendimentosEnviadosVencimentoLai(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listar-enc-enviados-vencimento?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }

      atendimentosEnviadosVencidosLai(): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
    
        return this.http.get<any>(`${this.encaminhamentoLaiUrl}/listar-enc-enviados-vencidos?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
               return data;
         });
        }

   

  consultarEncaminhamentoLai(codigo: number): Promise<any> {

    return this.http.get<any>(`${this.encaminhamentoLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoLaiDto;
     });
  }


  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.encaminhamentoLaiUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

    encaminhamentosRecebidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get(`${this.encaminhamentoLaiUrl}/encaminhamentosRecebidos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }



}
