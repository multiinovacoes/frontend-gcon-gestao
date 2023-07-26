import { ListaPedidosVencidosComponent } from './lista-pedidos-vencidos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaPedidosVencidosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ListaPedidosVencidosRoutingModule { }
