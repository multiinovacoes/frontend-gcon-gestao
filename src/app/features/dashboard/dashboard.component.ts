import { LoaderService } from 'src/app/core/services/loader.service';
import { EncaminhamentoLaiService } from './../atendimento-lai/encaminhamento-lai/encaminhamento-lai.service';
import { AtendimentoLaiService } from './../atendimento-lai/atendimento-lai.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

import { Chart } from "chart.js";
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  barChartData: any;

  barChartDataSecretaria: any;

  dataSourceSecretaria = {};

  dataSourceNatureza = {};

  chartDataSecretaria: any;

  chartDataNatureza: any;

  qtdNovosPedidos!: number;
  qtdPedidosEncaminhados!: number;
  qtdPedidosEncaminhadosVencidos!: number;
  qtdPedidosVencidos!: number;

  showLoaderDialogDashboard = false;

  dataSource: Object;
  chartConfig: Object;

  dataSourcePie: Object;
  chartConfigPie: Object;



  constructor(
    private translate: TranslateService,
    private loaderService: LoaderService,
     private title: Title,
     private errorHandler: ErrorHandlerService,
    private atendimentoLaiService: AtendimentoLaiService,
    private encaminhamentoLaiService: EncaminhamentoLaiService) {


      this.chartConfig = {
        width: '500',
        height: '400',
        type: 'column3d',
        dataFormat: 'json',
    };

    this.dataSource = {
        "chart": {
          "caption": "Pedidos por Área",
          "subCaption": "2022",
          "xAxisName": "Área",
          "yAxisName": "Quantidade de Pedidos",
          //"numberSuffix": "K",
          "theme": "gammel",
        },
        "data": [{
          "label": "Comercial",
          "value": "290"
        }, {
          "label": "Educação",
          "value": "260"
        }, {
          "label": "Tecnologia e Inovação",
          "value": "180"
        }]
      };

      this.chartConfigPie = {
        width: '500',
        height: '400',
        type: 'pie3d',
        dataFormat: 'json',
    };

    this.dataSourcePie = {
        "chart": {
          "caption": "Atendimentos Respondidos",
          "subCaption": "2022",
          "xAxisName": "Country",
          "yAxisName": "Reserves (MMbbl)",
          //"numberSuffix": "K",
          "theme": "fusion",
        },
        "data": [{
          "label": "Procedentes",
          "value": "290"
        }, {
          "label": "Procedentes Parcial",
          "value": "260"
        }, {
          "label": "Improcedentes",
          "value": "180"
        }]
      };

  }

 ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
        this.showLoaderDialogDashboard = val;
    });
    this.title.setTitle('Dashboard');
    this.loaderService.show();
    this.qtdNovosAtendimentosLai();
    this.qtdAtendimentosLaiEnviados();
    this.qtdAtendimentosLaiEnviadosVencidos();
    this.qtdAtendimentosVencidosLai();
  }


  
  qtdNovosAtendimentosLai(){
    this.atendimentoLaiService.novosAtendimentosLai()
    .then(resultado =>{
         this.qtdNovosPedidos = resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  qtdAtendimentosVencidosLai(){
    this.atendimentoLaiService.atendimentosVencidosLai()
    .then(resultado =>{
         this.qtdPedidosVencidos = resultado;
         this.loaderService.hide();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
  

  qtdAtendimentosLaiEnviados(){
    this.encaminhamentoLaiService.atendimentosEnviadosLai()
    .then(resultado =>{
         this.qtdPedidosEncaminhados = resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  
  qtdAtendimentosLaiEnviadosVencidos(){
    this.encaminhamentoLaiService.atendimentosEnviadosVencidosLai()
    .then(resultado =>{
         this.qtdPedidosEncaminhadosVencidos = resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


}




