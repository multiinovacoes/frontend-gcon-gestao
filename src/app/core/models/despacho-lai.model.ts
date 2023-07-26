import { User } from './user.model';
export class DespachoLai {
  id: number;
  atendimento: number;
  setorDestino: number;
  modeloDocumento: any;
  descricao = '';
  copiaDirigente = false;
  dataDespacho: Date;
  emailEnviado: string;
  usuario = new User();
  selectedAnexos: any[] = [];
  descricaoSetorOrigem: string;
  descricaoSetorDestino: string;
  codigoEncaminhamento: number;
  
}


