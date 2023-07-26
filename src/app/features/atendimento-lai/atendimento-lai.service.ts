import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtendimentoLai } from 'src/app/core/models/atendimento-lai.model';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { environment } from 'src/environments/environment';
import { UtilService } from '../../util.service';
import { PaginacaoPainel } from '../painel/lista-novas-manifestacoes/lista-novas-manifestacoes.component';

export class AtendimentoLaiFilter {
  solicitante!: string;
  dataInicio!: any;
  dataFinal!: any;
  assunto!: any;
  palavraChave!: string;
  protocolo!: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class AtendimentoLaiService {

  
  atendimentoLaiUrl: string;
  recursoLaiUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private sessionService: SessionService
  ) {
    this.atendimentoLaiUrl = `${environment.apiUrl}/atendimentos-lai`;
    this.recursoLaiUrl = `${environment.apiUrl}/recurso-lai`;
   }

   editar(codigo: number): Promise<any>{
    let params = new HttpParams()
    params = params.set('codigo', codigo.toString());
    return this.http.get<any>(`${this.atendimentoLaiUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.atendimentoLaiDto;
     });
  }

  prorrogarPrazo(codigo: number): Promise<any>{
    let params = new HttpParams()
    params = params.set('codigo', codigo.toString());
    return this.http.get<any>(`${this.atendimentoLaiUrl}/prorrogar-prazo/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.atendimentoLaiDto;
     });
  }

  

  
  adicionar(atendimento: AtendimentoLai): Promise<AtendimentoLai> {
    this.user = this.sessionService.getItem("currentUser");
    atendimento.orgao = this.user.orgao;

    return this.http.post<AtendimentoLai>(`${this.atendimentoLaiUrl}`, atendimento)
      .toPromise();
  }

  atualizar(atendimento: AtendimentoLai): Promise<AtendimentoLai> {
    return this.http.put<AtendimentoLai>(`${this.atendimentoLaiUrl}/${atendimento.id}`, atendimento)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  concluirAtendimento(atendimento: AtendimentoLai): Promise<AtendimentoLai> {
    return this.http.put<AtendimentoLai>(`${this.atendimentoLaiUrl}/concluir-atendimento/${atendimento.id}`, atendimento)
      .toPromise()
      .then(response => {
        return response;
      });
  }

  recursosLaiVencidos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoLaiUrl}/pedidos-recurso-vencido?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }
  recursosLaiAbertos(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    return this.http.get<any>(`${this.atendimentoLaiUrl}/pedidos-recurso-aberto?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    recursosLaiVencimentoProx(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.recursoLaiUrl}/listar-recurso-vencimento?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }

  novosAtendimentosLai(): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('orgao', this.user.orgao.toString());

    console.log(params);

    return this.http.get<any>(`${this.atendimentoLaiUrl}/listar-novos-atendimentos?`,{ params })
         .toPromise()
         .then(res => <any>res)
         .then(data => {
           return data;
     });
    }

    atendimentosVencidosLai(): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
  
      return this.http.get<any>(`${this.atendimentoLaiUrl}/listar-atendimentos-vencidos?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
             return data;
       });
      }
  
  
      listaRecursosAbertoLai(filtro: PaginacaoPainel): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());
    
        return this.http.get(`${this.atendimentoLaiUrl}/lista-recurso-aberto?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
              const resultado = {
                atendimentos: data.atendimentoLaiDtoList,
                total: data.atendimentoLaiDtoList.totalElements
              };
    
               return resultado;
         });
        }

        listaRecursosVencidoLai(filtro: PaginacaoPainel): Promise<any> {
          let params = new HttpParams()
          this.user = this.sessionService.getItem("currentUser");
          params = params.set('orgao', this.user.orgao.toString());
          params = params.set('page', filtro.pagina.toString());
          params = params.set('size', filtro.itensPorPagina.toString());
      
          return this.http.get(`${this.atendimentoLaiUrl}/lista-recurso-vencido?`,{ params })
               .toPromise()
               .then(res => <any>res)
               .then(data => {
                const resultado = {
                  atendimentos: data.atendimentoLaiDtoList,
                  total: data.atendimentoLaiDtoList.totalElements
                };
      
                 return resultado;
           });
          } 
          
          listaRecursosVencimentoLai(filtro: PaginacaoPainel): Promise<any> {
            let params = new HttpParams()
            this.user = this.sessionService.getItem("currentUser");
            params = params.set('orgao', this.user.orgao.toString());
            params = params.set('page', filtro.pagina.toString());
            params = params.set('size', filtro.itensPorPagina.toString());
        
            return this.http.get(`${this.atendimentoLaiUrl}/listar-recurso-vencimento?`,{ params })
                 .toPromise()
                 .then(res => <any>res)
                 .then(data => {
                  const resultado = {
                    atendimentos: data.atendimentoLaiDtoList,
                    total: data.atendimentoLaiDtoList.totalElements
                  };
        
                   return resultado;
             });
            }                  
  

    listaNovosAtendimentosLai(filtro: PaginacaoPainel): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
  
      return this.http.get(`${this.atendimentoLaiUrl}/novos-pedidos?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
            const resultado = {
              atendimentos: data.atendimentoLaiDtoList,
              total: data.atendimentoLaiDtoList.totalElements
            };
  
             return resultado;
       });
      }

      listaAtendimentosVencidosLai(filtro: PaginacaoPainel): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());
    
        return this.http.get(`${this.atendimentoLaiUrl}/atendimentos-vencidos?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
              const resultado = {
                atendimentos: data.atendimentoLaiDtoList,
                total: data.atendimentoLaiDtoList.totalElements
              };
    
               return resultado;
         });
        }

      
    listaAtendimentosLaiEnviados(filtro: PaginacaoPainel): Promise<any> {
      let params = new HttpParams()
      this.user = this.sessionService.getItem("currentUser");
      params = params.set('orgao', this.user.orgao.toString());
      params = params.set('page', filtro.pagina.toString());
      params = params.set('size', filtro.itensPorPagina.toString());
  
      return this.http.get(`${this.atendimentoLaiUrl}/listar-atendimentos-encaminhados?`,{ params })
           .toPromise()
           .then(res => <any>res)
           .then(data => {
            const resultado = {
              atendimentos: data.atendimentoLaiDtoList,
              total: data.atendimentoLaiDtoList.totalElements
            };
  
             return resultado;
       });
      }

      listaAtendimentosLaiRecebidos(filtro: PaginacaoPainel): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());
    
        return this.http.get(`${this.atendimentoLaiUrl}/listar-atendimentos-encaminhados-rec?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
              const resultado = {
                atendimentos: data.atendimentoLaiDtoList,
                total: data.atendimentoLaiDtoList.totalElements
              };
    
               return resultado;
         });
        }

      listaAtendimentosLaiEnviadosVencimento(filtro: PaginacaoPainel): Promise<any> {
        let params = new HttpParams()
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());
    
        return this.http.get(`${this.atendimentoLaiUrl}/listar-atendimentos-encaminhados-vencimento?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
              const resultado = {
                atendimentos: data.atendimentoLaiDtoList,
                total: data.atendimentoLaiDtoList.totalElements
              };
    
               return resultado;
         });
        }

        listaAtendimentosLaiEnviadosVencidos(filtro: PaginacaoPainel): Promise<any> {
          let params = new HttpParams()
          this.user = this.sessionService.getItem("currentUser");
          params = params.set('orgao', this.user.orgao.toString());
          params = params.set('page', filtro.pagina.toString());
          params = params.set('size', filtro.itensPorPagina.toString());
      
          return this.http.get(`${this.atendimentoLaiUrl}/listar-atendimentos-encaminhados-vencidos?`,{ params })
               .toPromise()
               .then(res => <any>res)
               .then(data => {
                const resultado = {
                  atendimentos: data.atendimentoLaiDtoList,
                  total: data.atendimentoLaiDtoList.totalElements
                };
      
                 return resultado;
           });
          }

      pesquisar(filtro: AtendimentoLaiFilter): Promise<any> {
        let params = new HttpParams()
        if (filtro.solicitante) {
          params = params.set('solicitante', filtro.solicitante);
        }
    
        if (filtro.dataInicio) {
          params = params.set('dataInicio', filtro.dataInicio);
        }
    
        if (filtro.dataFinal) {
          params = params.set('dataFinal', filtro.dataFinal);
        }
    
        if (filtro.protocolo) {
          params = params.set('protocolo', filtro.protocolo);
        }
    
        if (filtro.palavraChave) {
          params = params.set('palavraChave', filtro.palavraChave);
        }
    
        this.user = this.sessionService.getItem("currentUser");
        params = params.set('orgao', this.user.orgao.toString());
    
        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());
    
        return this.http.get(`${this.atendimentoLaiUrl}?`,{ params })
             .toPromise()
             .then(res => <any>res)
             .then(data => {
              const resultado = {
                atendimentos: data.atendimentoLaiDtoList,
                total: data.atendimentoLaiDtoList.totalElements
              };
    
               return resultado;
         });
        }

        excluir(codigo: number): Promise<void> {
          return this.http.delete(`${this.atendimentoLaiUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
        }
    
        cancelar(codigo: number): Promise<void> {
          return this.http.delete(`${this.atendimentoLaiUrl}/cancelar/${codigo}`)
            .toPromise()
            .then(() => null);
        }
    
        listar(): Promise<any> {

          let params = new HttpParams()
      
          this.user = this.sessionService.getItem("currentUser");
          params = params.set('orgao', this.user.orgao.toString());
      
          return this.http.get<any>(`${this.atendimentoLaiUrl}/listar?`,{params})
          .toPromise()
           .then(res => <any>res)
               .then(data => {
                 return data;
           });
        }
      

}
