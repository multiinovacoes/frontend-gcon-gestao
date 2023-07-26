import { AtendimentoArea } from './../core/models/relatorios/atendimento-area.model';
import { User } from 'src/app/core/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SessionService } from 'src/app/core/services/session.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export class RelatorioFiltro {
  dataInicial!: any;
  dataFinal!: any;
  area!: any;
  status!: any;
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  relatorioUrl: string;

  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,

  ) {
    this.relatorioUrl = `${environment.apiUrl}/relatorio`;
 }


  pesquisar(filtro: RelatorioFiltro): Promise<any> {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');

    return this.http.get(`${this.relatorioUrl}/atendimento-area?`,{ params })
        .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data;
     });
    }


    atendimentoAreaPDF(filtro: RelatorioFiltro) {
    let params = new HttpParams()
    this.user = this.sessionService.getItem("currentUser");
    params = params.set('dataInicial', filtro.dataInicial);
    params = params.set('dataFinal', filtro.dataFinal);
    params = params.set('orgao', this.user.orgao.toString());
    params = params.set('area', filtro.area != null ? filtro.area : '');
    params = params.set('status', filtro.status != null ? filtro.status : '');

  return this.http.get<Blob>(`${this.relatorioUrl}/atendimento-area/impressao`, { params, responseType: 'blob' as 'json' }).subscribe(res => {
     const file = new Blob([res], { type: 'application/pdf' });
          var url = URL.createObjectURL(file);
          window.open(url);
  });
  }

   relatorioAtendimento(idAtendimento: number) {
    let params = new HttpParams()
    params = params.set('idAtendimento', idAtendimento.toString());

  return this.http.get<Blob>(`${this.relatorioUrl}/atendimento`, { params, responseType: 'blob' as 'json' }).subscribe(res => {
     const file = new Blob([res], { type: 'application/pdf' });
          var url = URL.createObjectURL(file);
          window.open(url);
  });
  }




}
