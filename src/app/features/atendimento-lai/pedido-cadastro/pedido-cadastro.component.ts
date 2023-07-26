import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AtendimentoLai } from 'src/app/core/models/atendimento-lai.model';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { UtilService } from 'src/app/util.service';
import { AreaLaiService } from '../../area-lai/area-lai.service';
import { AssuntoLaiService } from '../../assunto-lai/assunto-lai.service';
import { InstituicaoService } from '../../instituicao/instituicao.service';
import { AtendimentoLaiService } from '../atendimento-lai.service';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { EncaminhamentoLaiComponent } from '../encaminhamento-lai/encaminhamento-lai.component';
import { EncaminhamentoLaiService } from '../encaminhamento-lai/encaminhamento-lai.service';
import { RespostaParcialLaiComponent } from '../resposta-parcial-lai/resposta-parcial-lai.component';
import { RespostaParcialLaiService } from '../resposta-parcial-lai/resposta-parcial-lai.service';
import { RespostaManualLaiComponent } from '../resposta-manual-lai/resposta-manual-lai.component';
import { ModeloDocumentoLaiService } from '../../modelo-documento-lai/modelo-documento-lai.service';
import { AnexoLaiComponent } from '../anexo-lai/anexo-lai.component';
import { AnexoLaiService } from '../anexo-lai/anexo-lai.service';
import { DespachoLaiComponent } from '../despacho-lai/despacho-lai.component';
import { DespachoLaiService } from '../despacho-lai/despacho-lai.service';
import { RecursoLaiComponent } from '../recurso-lai/recurso-lai.component';
import { RecursoLaiService } from '../recurso-lai/recurso-lai.service';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.component.html',
  styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {

  atendimentoLai = new AtendimentoLai();

  manifestante = new Manifestante();
  
  encaminhamentos = [];

  despachos = [];

  recursos = [];

  idDespachoSelecao: any;

  idEncaminhamentoSelecao: any;

  showLoaderDialog = false;
  index = 0;
  respostasParciais!: any;
  idRespostaParcialSelecao: any;

  listaInstituicoes!: any;

  listaAreas!: any;

  listaAssuntos!: any;

  tipoDocumentos!: any;

  origensContato!: any;

  modeloDocumentos = [];

  resultadosPedido = [];

  resultadoPedido: any;

  modeloDocumento: any;

  modelo = "";

  ufs!: any;

  anexos!: any;
  selectedAnexos: string[] = [];

  idRecursoSelecao: any;

  displayModalResponderPedido: boolean;

  @ViewChild(EncaminhamentoLaiComponent)
  encaminhamentoLaiComponent: EncaminhamentoLaiComponent;

  @ViewChild(RespostaParcialLaiComponent)
  respostaParcialLaiComponent: RespostaParcialLaiComponent;

  @ViewChild(DespachoLaiComponent)
  despachoLaiComponent: DespachoLaiComponent;

  @ViewChild(RecursoLaiComponent)
  recursoLaiComponent: RecursoLaiComponent;

  @ViewChild(RespostaManualLaiComponent)
  respostaManualLaiComponent: RespostaManualLaiComponent;

  @ViewChild(AnexoLaiComponent)
  anexoComponent: AnexoLaiComponent;


  constructor(
    private cdref: ChangeDetectorRef,
    private utilService: UtilService,
    private areaLaiService: AreaLaiService,
    private instituicaoService: InstituicaoService,
    private assuntoLaiService: AssuntoLaiService,
    private anexoLaiService: AnexoLaiService,
    private loaderService: LoaderService,
    private messageService: MessageService,
    private atendimentoLaiService: AtendimentoLaiService,
    private encaminhamentoLaiService: EncaminhamentoLaiService,
    private respostaParcialLaiService: RespostaParcialLaiService,
    private despachoLaiService: DespachoLaiService,
    private modeloDocumentoLaiService: ModeloDocumentoLaiService,
    private recursoLaiService: RecursoLaiService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService
  ) { }

  ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {  
    this.loaderService.status.subscribe((val: boolean) => {
    this.showLoaderDialog = val;
  });
    this.listaTiposDocumento();
    this.listaOrigemContato();
    this.ufs = this.utilService.listaUfs();
    this.carregarInstituicoes();

    var routeState = this.routeStateService.getCurrent();
    if (routeState.data > 0) {

      this.editarPedido(routeState.data);
      
    } else {
      this.loaderService.hide();
    }
  }

  showAnexo() {
    this.anexoComponent.showAnexo(this.atendimentoLai.id, this.atendimentoLai.statusAtendimento);
  }

  showVisualizaDespacho(codigoDespacho: number) {
    this.despachoLaiComponent.showVisualizaDialog(codigoDespacho);
  }

  showVisualizaRecurso(codigoRecurso: number){
    this.recursoLaiComponent.showVisualizaRecurso(codigoRecurso);
  }


  showDespacho(){
    this.despachoLaiComponent.showPositionDialog(
      this.atendimentoLai.id,
      this.atendimentoLai.email
    );
  }

  showExcluirDespacho(codigoDespacho: number) {
    this.despachoLaiComponent.confirmarExclusao(codigoDespacho);
  }


  responderPedido(){
    this.loaderService.show();
    this.atendimentoLai.resposta = this.modelo;
    this.atendimentoLai.status = 1;
    this.atendimentoLai.resultadoPedido = this.resultadoPedido;
    this.atendimentoLaiService
    .concluirAtendimento(this.atendimentoLai)
    .then((response) => {
      this.atendimentoLai = response.atendimentoLaiDto;
    })
    .then(() => {
      this.displayModalResponderPedido = false;
      this.loaderService.hide();
      this.messageService.add({
        severity: "success",
        detail: "Pedido respondido com sucesso!",
      });
    })    
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });

  }

  consultaModelo(): any {
    return this.modeloDocumentoLaiService
      .consultarModeloOutros(this.modeloDocumento, this.atendimentoLai.id)
      .then((modelo) => {
        this.modelo = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  onClose(){
    this.displayModalResponderPedido = false;
  }

  voltar(){
    this.routeStateService.add('Consulta de Pedido',
    '/main/atendimento-lai/pedido-consulta', 0, false);
  }


  showProrrogarPrazo(){
    Swal.fire({
      icon: 'info',
      title: "Deseja prorrogar o prazo de resposta por mais 10 dias?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Sim",
      denyButtonText: `Não`
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderService.show();
        return this.atendimentoLaiService
          .prorrogarPrazo(this.atendimentoLai.id)
          .then((res) => {
            this.atendimentoLai = res;
          })
          .then((res) => {
            this.onClose();
         
            this.loaderService.hide();
            this.messageService.add({
              severity: "success",
              detail: "Prazo prorrogado com sucesso!",
            });
          })
          .catch((erro) => {
            this.loaderService.hide();
            this.errorHandler.handle(erro);
          });
        } else if (result.isDenied) {
          return;
        }else if (result.isDismissed){
        return;
      }
    });
  }


  showResponderPedido(){
      return this.encaminhamentoLaiService
        .encaminhamentoLaiSatisfaz(this.atendimentoLai.id)
        .then((resposta) => {
          if (resposta === null){
            Swal.fire("Conclusão", "Para Concluir um atendimento o usuário precisa escolher uma solução que satisfaça", "warning");
            this.loaderService.hide();
            return;
          }else{
            this.carregarModeloDocumento();
            this.listaResultadosPedidos();
            this.carregarAnexos();
            this.loaderService.hide();
            this.displayModalResponderPedido = true;
          }
        })
        .catch((erro) => this.errorHandler.handle(erro));
  }

  carregarAnexos() {
    this.anexoLaiService.listar(this.atendimentoLai.id).then((anexos) => {
      this.anexos = anexos;
    });
  }


  showRespostaParcial() {
    this.respostaParcialLaiComponent.showPositionDialog(
      this.atendimentoLai.id,
      this.atendimentoLai.email
    );
  }

  showExcluir(codigoResposta: number) {
    this.respostaParcialLaiComponent.confirmarExclusao(codigoResposta);
  }

  onCallParentDespachoLai() {
    this.index = 4;
    this.carregarDespachos();
  }  


  onCallParentRecursoLai(){
    this.index = 6;
    this.carregarRecursos();
  }

  onCallParentRespostaParcialLai() {
    this.index = 3;
    this.carregarRespostas();
  }

  showVisualizaRespostaParcial(codigoResposta: number) {
    this.respostaParcialLaiComponent.showVisualizaDialog(codigoResposta);
  }

  showVisualizaResposta(codigoResposta: number) {
    this.respostaManualLaiComponent.showVisualizaResposta(codigoResposta, this.atendimentoLai.status);
  }

  showVisualizaDialog(codigoEncaminhamento: number) {
    this.encaminhamentoLaiComponent.showVisualizaDialog(codigoEncaminhamento);
  }

  showPosition() {
    this.encaminhamentoLaiComponent.showPositionDialog(this.atendimentoLai.id);
  }

  showCancela(codigoEncaminhamento: number) {
    this.encaminhamentoLaiComponent.confirmarExclusao(codigoEncaminhamento);
  }

  onCallParent() {
    this.index = 2;
    this.idEncaminhamentoSelecao = null;
    this.carregarEncaminhamentos();
    this.carregarRespostas();
  }


  carregarEncaminhamentos() {
    this.encaminhamentoLaiService.listar(this.atendimentoLai.id).then((enc) => {
      this.encaminhamentos = enc;
    });
  }

  carregarModeloDocumento() {
    return this.modeloDocumentoLaiService
      .listarPorTipo("6")
      .then((modeloDocumentos) => {
        this.modeloDocumentos = modeloDocumentos.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  editarPedido(codigo: number) {
    this.atendimentoLaiService
      .editar(codigo)
      .then((atendimento) => {
        this.atendimentoLai = atendimento;
        this.manifestante = atendimento.manifestanteDto;
        this.carregarEncaminhamentos();
        this.carregarRespostas();
        this.carregarDespachos();
        this.carregarRecursos();
      }).then(res => {
        this.carregarAssuntos();
        this.carregarAreas();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      })
  }

  carregarRespostas() {
    this.respostaParcialLaiService
      .listar(this.atendimentoLai.id)
      .then((respostasParciais) => {
        this.respostasParciais = respostasParciais;
      });
  }

  carregarDespachos() {
    this.despachoLaiService
      .listar(this.atendimentoLai.id)
      .then((despachos) => {
        this.despachos = despachos;
      });
  }

  carregarRecursos() {
    this.recursoLaiService
      .listar(this.atendimentoLai.id)
      .then((recursos) => {
        console.log(recursos);
        this.recursos = recursos;
      });
  }

  get editando() {
    return Boolean(this.atendimentoLai.id);
  }


  salvar(form: NgForm) {
    this.loaderService.show();
    if (this.editando) {
      this.atualizarPedido();
    } else {
      this.adicionarPedido();
    }
  }

  adicionarPedido() {
    this.loaderService.show();
    this.atendimentoLaiService
      .adicionar(this.atendimentoLai)
      .then((response) => {
        this.atendimentoLai = response.atendimentoLaiDto;
        this.loaderService.hide();
        Swal.fire("Atendimento adicionado com sucesso", "success");
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarPedido() {
    this.loaderService.show();
    this.atendimentoLaiService
      .atualizar(this.atendimentoLai)
      .then((response) => {
        this.atendimentoLai = response.atendimentoLaiDto;
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Pedido atualizado com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }



  listaTiposDocumento(): any[]{
    this.tipoDocumentos = [
      { label: 'CPF', value: 1 },
      { label: 'RG', value: 2 },
      { label: 'CNH', value: 3 },
      { label: 'Passaporte', value: 4 },
      { label: 'Carteira de Identidade Indígena', value: 5 },
      { label: 'Certidão de Nascimento', value: 6 },
      { label: 'CNPJ', value: 7 }
    ];
    return this.tipoDocumentos;
  }

  listaOrigemContato(): any[]{
    this.origensContato = [
      { label: 'Site', value: 1 },
      { label: 'Email', value: 2 },
      { label: 'Presencial', value: 3 },
      { label: 'Telefone', value: 4 },
      { label: 'Carta', value: 5 }
    ];
    return this.origensContato;
  }

  listaResultadosPedidos(): any[]{
    this.resultadosPedido = [
      { label: 'Procedente', value: 1 },
      { label: 'Procedente Parcial', value: 2 },
      { label: 'Improcedente', value: 3 }
    ];
    return this.resultadosPedido;
  }

  carregarAreas() {
    this.areaLaiService.listarAreas(this.atendimentoLai.instituicao)
      .then(areas => {
        this.listaAreas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarInstituicoes() {
    this.instituicaoService.listar()
      .then(instituicoes => {
        this.listaInstituicoes = instituicoes.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarAssuntos() {
    this.assuntoLaiService.pesquisarAssunto(this.atendimentoLai.area)
      .then(assuntos => {
        this.listaAssuntos = assuntos.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
