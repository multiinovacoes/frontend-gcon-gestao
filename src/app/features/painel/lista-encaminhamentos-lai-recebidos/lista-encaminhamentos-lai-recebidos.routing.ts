import { ListaEncaminhamentosLaiRecebidosComponent } from './lista-encaminhamentos-lai-recebidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaEncaminhamentosLaiRecebidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ListaEncaminhamentosLaiRecebidosRoutingModule { }
