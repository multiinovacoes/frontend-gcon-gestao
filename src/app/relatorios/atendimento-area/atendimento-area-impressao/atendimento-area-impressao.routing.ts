import { AtendimentoAreaImpressaoComponent } from './atendimento-area-impressao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: AtendimentoAreaImpressaoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtendimentoAreaImpressaoRoutingModule { }
