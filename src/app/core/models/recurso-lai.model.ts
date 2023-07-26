import { User } from './user.model';
export class RecursoLai {
  id: number;
  atendimento: number;
  justificativa = '';
  dataRecurso: Date;
  dataPrazo: Date;
  respostaRecurso: string;
  dataResposta: Date;
  tipo: number;
  descricaoStatus: string;
  descricaoTipo: string;
  status: number;
  modeloDocumento: number;
  idUsuarioResposta: number;
  resultado: number;
  descricaoResultado: string;
  listaAnexoDto: any[] = [];
}


