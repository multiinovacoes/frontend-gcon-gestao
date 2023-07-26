import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { ConfiguracaoLai } from './../../core/models/configuracao-lai.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root',
})
export class ConfiguracaoLaiService {

  configuracaoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    this.configuracaoLaiUrl = `${environment.apiUrl}/configuracoes-lai`;
  }

    editar(): Promise<any>{
      return this.http.get<any>(`${this.configuracaoLaiUrl}`)
      .toPromise()
       .then(res => <any>res)
           .then(data => {
             return data;
       });

    }

    atualizar(configuracao: ConfiguracaoLai): Promise<ConfiguracaoLai> {
      return this.http.put<ConfiguracaoLai>(`${this.configuracaoLaiUrl}/${configuracao.id}`, configuracao)
        .toPromise()
        .then(response => {
          const configuracaoAlterado = response;
          return configuracaoAlterado;
        });
    }

    adicionar(configuracao: ConfiguracaoLai): Promise<ConfiguracaoLai> {
      this.user = this.sessionService.getItem("currentUser");
      configuracao.orgao = this.user.orgao;
      return this.http.post<ConfiguracaoLai>(`${this.configuracaoLaiUrl}`, configuracao)
        .toPromise().then();
    }

}
