import { MessageService } from 'primeng/api';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ExcelServiceService } from './../../../core/services/excel-service.service';
import { UtilService } from './../../../util.service';
import { AreaService } from './../../../features/area/area.service';
import { ErrorHandlerService } from './../../../core/services/error-handler.service';
import { RouteStateService } from 'src/app//core/services/route-state.service';
import { AtendimentoArea } from './../../../core/models/relatorios/atendimento-area.model';
import { RelatorioFiltro, RelatorioService } from './../../relatorio.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-atendimento-area-consulta',
  templateUrl: './atendimento-area-consulta.component.html',
  styleUrls: ['./atendimento-area-consulta.component.css']
})
export class AtendimentoAreaConsultaComponent implements OnInit {

   filtro = new RelatorioFiltro();
   atendimentoArea = [];
   rowGroupMetadata: any;
   areas!: any;
   statuss = [];
   buttonsImpressao = true;
   showLoaderDialogRelatorio = false;


  constructor(
    private relatorioService: RelatorioService,
    private errorHandler: ErrorHandlerService,
    private areaService: AreaService,
     private messageService: MessageService,
    private loaderService: LoaderService,
    private utilService: UtilService,
    private excelService: ExcelServiceService,
    private routeStateService: RouteStateService
  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialogRelatorio = val;
    });
    this.buttonsImpressao = true;
    this.carregarAreas();
    this.filtro.dataInicial = new Date(moment(new Date(), "YYYY-MM-DD").startOf('month').toString());
    this.filtro.dataFinal = new Date(moment(new Date(), "YYYY-MM-DD").endOf('month').toString());
    this.statuss = this.utilService.listaStatusManifestacao();
  }

   ngOnDestroy() {
    this.loaderService.status.observers.forEach(function (element) {
      element.complete();
    });
  }

   pesquisa() {
       this.loaderService.show();
       this.relatorioService.pesquisar(this.filtro)
      .then(data =>{
        if (data.length == 0){
          this.messageService.add({ severity: 'success', detail: 'Nenhuma manifestação encontrada!' });
        }else{
          this.atendimentoArea = data;
          this.updateRowGroupMetaData();
          this.buttonsImpressao = false;
        }
      }
      ).then(res => {
          this.loaderService.hide();
      })
      .catch(erro => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }


  showPDF(){
      this.relatorioService.atendimentoAreaPDF(this.filtro);
       //   .then(
       // (data: Blob) => {
         // var file = new Blob([data], { type: 'application/pdf' })
          //var url = URL.createObjectURL(file);

        //window.open(url);
      //});
  }


  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.atendimentoArea, 'relatorio_area');
  }

    carregarAreas() {
    this.areaService.listar()
      .then(areas => {
        this.areas = areas.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

     updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.atendimentoArea) {
            for (let i = 0; i < this.atendimentoArea.length; i++) {
                let rowData = this.atendimentoArea[i];
                let representativeName = rowData.area;

                if (i == 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    let previousRowData = this.atendimentoArea[i - 1];
                    let previousRowGroup = previousRowData.area;
                    if (representativeName === previousRowGroup)
                        this.rowGroupMetadata[representativeName].size++;
                    else
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                }
            }
        }
    }


}
