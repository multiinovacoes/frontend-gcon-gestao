import { ListaEncaminhamentosLaiVencidosComponent } from './lista-encaminhamentos-lai-vencidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaEncaminhamentosLaiVencidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ListaEncaminhamentosLaiVencidosRoutingModule { }
