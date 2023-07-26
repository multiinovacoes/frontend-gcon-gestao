import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoCadastroComponent } from './pedido-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: PedidoCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PedidoCadastroRoutingModule { }
