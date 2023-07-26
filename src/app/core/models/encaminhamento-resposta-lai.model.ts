import { Setor } from './setor.model';
import { User } from './user.model';
import { Encaminhamento } from './encaminhamento.model';

export class EncaminhamentoRespostaLai {
  encaminhamento: number;
  modeloDocumento: any;
  despacho = '';
  dataEncaminhamento: Date;
  usuario = new User();
  satisfaz: number;
  id: number;
  status: any;
  descricaoSetorOrigem: any;
  setorOrigem: any;
  setorDestino: any;
}


