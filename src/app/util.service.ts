import { ErrorHandlerService } from './core/services/error-handler.service';
import { ModeloDocumentoService } from './features/modelo-documento/modelo-documento.service';
import { Atendimento } from './core/models/atendimento.model';
import { Injectable } from '@angular/core';


import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private modeloDocumentoService: ModeloDocumentoService,
    private errorHandler: ErrorHandlerService
  ) { }
  prioridadesPadrao = [];
  tiposResposta = [];
  ufs = [];
  tipoModelo = [];
  statusManifestacao = [];


  listaStatusManifestacao(): any[]{
    this.statusManifestacao = [
      { label: 'Selecione a opção', value: '' },
      { label: 'Manifestação não concluídas', value: 0 },
      { label: 'Manifestações concluídas', value: 1 }
    ];
    return this.statusManifestacao;
  }

  listaPrioridades(): any[]{
    this.prioridadesPadrao = [
      { label: 'Alta', value: 1 },
      { label: 'Média', value: 2 },
      { label: 'Baixa', value: 3 }
    ];
    return this.prioridadesPadrao;
  }

  listaUfs(): any[]{
    this.ufs = [
      { label: 'Acre', value: 'AC'},
      { label: 'Alagoas', value: 'AL'},
      { label: 'Amazonas', value: 'AM'},
      { label: 'Amapá', value: 'AP'},
      { label: 'Bahia', value: 'BA'},
      { label: 'Ceará', value: 'CE'},
      { label: 'Distrito Federal', value: 'DF'},
      { label: 'Espírito Santo', value: 'ES'},
      { label: 'Goias', value: 'GO'},
      { label: 'Maranhão', value: 'MA'},
      { label: 'Minas Gerais', value: 'MG'},
      { label: 'Mato Grosso do Sul', value: 'MS'},
      { label: 'Mato Grosso', value: 'MT'},
      { label: 'Pará', value: 'PA'},
      { label: 'Paraíba', value: 'PB'},
      { label: 'Pernambuco', value: 'PE'},
      { label: 'Piaui', value: 'PI'},
      { label: 'Paraná', value: 'PR'},
      { label: 'Rio de Janeiro', value: 'RJ'},
      { label: 'Rio Grande do Norte', value: 'RN'},
      { label: 'Rondônia', value: 'RO'},
      { label: 'Rio Grande do Sul', value: 'RS'},
      { label: 'Santa Catarina', value: 'SC'},
      { label: 'Sergipe', value: 'SE'},
      { label: 'São Paulo', value: 'SP'},
      { label: 'Tocantins', value: 'TO'},
      { label: 'Roraima', value: 'RR'}
    ];
    return this.ufs;
  }

  listaTipoModelo(): any[]{
    this.tipoModelo = [
      { label: 'Modelo de Encaminhamento', value: 1 },
      { label: 'Modelo de Despacho', value: 2 },
      { label: 'Modelo de Resposta Parcial', value: 3 },
      { label: 'Modelo de Prorrogação de Prazo', value: 4 },
      { label: 'Modelo de Resposta do Setor', value: 5 },
      { label: 'Modelo de Conclusão Final', value: 6 }
    ];
    return this.tipoModelo;
  }

  listaEstadoCivil(): any[]{
    this.tipoModelo = [
      { label: 'Solteiro', value: 1 },
      { label: 'Casado', value: 2 },
      { label: 'Viuvo', value: 3 },
      { label: 'Divorciado', value: 4 },
    ];
    return this.tipoModelo;
  }

  listaFormaEnvioResposta(): any[]{
    this.tiposResposta = [
      { label: 'Não informado', value: 0 },
//      { label: 'Carta', value: 1 },
      { label: 'Email', value: 2 },
      { label: 'Telefone', value: 4 },
      { label: 'Presencial', value: 5 }

    ];
    return this.tiposResposta;
  }

  public descricaoTipoResposta(codigo: number): string{
    if (codigo == 1)
      return "Carta";
    else if (codigo == 2)
      return "Email";
    else if (codigo == 4)
      return "Telefone";
    else if (codigo == 5)
      return "Presencial";
    else
    return "";
  }

  public converterStringsParaDatas(data: string): Date {
    return moment(data,
      'YYYY-MM-DD').toDate();
  }

  public formataData(data: Date): string {
    return moment(data, "YYYY-MM-DD").format('DD/MM/YYYY');
  }




}
