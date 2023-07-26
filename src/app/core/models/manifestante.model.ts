export class Manifestante {
  id: number;
  nome: string;
  codigoDocumento!: number;
  numeroDocumento!: string;
  email: string;
  confirmacaoEmail: string;
  uf: string;
  cidade: string;
  telefone: string;
  senha: string;
  confirmacaoSenha: string; 
  confirmaDados = false;
  tipo = '';
  origemContato: any;
  manifestanteDto: Manifestante;
}


