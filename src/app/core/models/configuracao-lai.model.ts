export class ConfiguracaoLai {
  id: number;
  qtdDiasVencer: number;
  qtdDiasEncaminhamento: number
  qtdDiasAlertaEncaminhamento: number
  modeloDocumentoDespacho: number
  qtdMaxProrrogaPrazoAtendimento: number
  qtdDiasPermitirAbrirRecurso: number
  qtdDiasVencerRecurso: number
  orgao: number;
  qtdDiasAlertaRecurso: number;
  disparaEmailCobrancaAtendimento: boolean;
  disparaEmailCobrancaRecurso: boolean;
}
