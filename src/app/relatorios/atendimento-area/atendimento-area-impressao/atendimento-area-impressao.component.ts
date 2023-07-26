import { RelatorioService, RelatorioFiltro } from './../../relatorio.service';
import { AtendimentoArea } from './../../../core/models/relatorios/atendimento-area.model';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atendimento-area-impressao',
  templateUrl: './atendimento-area-impressao.component.html',
  styleUrls: ['./atendimento-area-impressao.component.css']
})
export class AtendimentoAreaImpressaoComponent implements OnInit {

  atendimentoArea: any[];
  filtro = new RelatorioFiltro();

  constructor(
    private routeStateService: RouteStateService,
    private relatorioService: RelatorioService
  ) { }

  ngOnInit(): void {
  
  }

}
