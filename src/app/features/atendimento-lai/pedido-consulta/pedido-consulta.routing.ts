import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoConsultaComponent } from './pedido-consulta.component';

const routes: Routes = [
    {
        path: '',
        component: PedidoConsultaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedidoConsultaRoutingModule { }
