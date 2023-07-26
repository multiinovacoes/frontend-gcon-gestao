import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { Encaminhamento } from '../../../core/models/encaminhamento.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { EncaminhamentoRespostaLai } from 'src/app/core/models/encaminhamento-resposta-lai.model';

@Injectable({
  providedIn: 'root'
})
export class EncaminhamentoRespostaLaiService {

  encaminhamentoRespostaLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.encaminhamentoRespostaLaiUrl = `${environment.apiUrl}/encaminhamento-resposta-lai`;
   }

  adicionar(encaminhamentoResposta: EncaminhamentoRespostaLai) {
    encaminhamentoResposta.usuario = this.sessionService.getItem("currentUser");
    return this.http.post<Encaminhamento>(`${this.encaminhamentoRespostaLaiUrl}`, encaminhamentoResposta)
      .toPromise();
  }

  atualizar(encaminhamentoResposta: EncaminhamentoRespostaLai) {
    return this.http.put<Encaminhamento>(`${this.encaminhamentoRespostaLaiUrl}`, encaminhamentoResposta)
      .toPromise();
  }

  consultar(codigo: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoRespostaLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.encaminhamentoRespostaLaiDto;
     });
  }

  verificaResposta(codigoResposta: number): Promise<any> {
    return this.http.get<any>(`${this.encaminhamentoRespostaLaiUrl}/enc/${codigoResposta}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
  }


}
