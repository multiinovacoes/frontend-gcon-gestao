import { ListaEncaminhamentosLaiVencimentoComponent } from './lista-encaminhamentos-lai-vencimento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaEncaminhamentosLaiVencimentoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ListaEncaminhamentosLaiVencimentoRoutingModule { }
