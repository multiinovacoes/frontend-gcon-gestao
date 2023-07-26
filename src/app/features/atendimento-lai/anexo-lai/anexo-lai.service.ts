import { Anexo } from "./../../../core/models/anexo.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "./../../../../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnexoLaiService {
  anexoUrl: string;

  constructor(private http: HttpClient) {
    this.anexoUrl = `${environment.apiUrl}/anexos-lai`;
  }

  listar(codigoAtendimento: any): Promise<any> {
    let params = new HttpParams();
    params = params.set("atendimento", codigoAtendimento);

    return this.http
      .get<any>(`${this.anexoUrl}/listar?`, { params })
      .toPromise()
      .then((res) => <any>res)
      .then((data) => {
        return data.anexoLaiDtoList;
      });
  }

  adicionar(anexo: Anexo): Promise<Anexo> {
    return this.http.post<Anexo>(`${this.anexoUrl}`, anexo).toPromise();
  }

  excluir(codigo: number): Promise<void> {
    return this.http
      .delete(`${this.anexoUrl}/${codigo}`) 
      .toPromise()
      .then(() => null);
  }

  download(fileName: string): Promise<any> {
    return this.http
      .get<Blob>(`${this.anexoUrl}/file/${fileName}`, { responseType: 'blob' as 'json' }) 
      .toPromise().then((response) => {
      return response;
      });
    }
}
