import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoConsultaComponent } from './pedido-consulta/pedido-consulta.component';
import { PedidoCadastroComponent } from './pedido-cadastro/pedido-cadastro.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'pedido-consulta'
    },
    {
        path: 'pedido-consulta',
        component: PedidoConsultaComponent,
        loadChildren: () => import('src/app/features/atendimento-lai/pedido-consulta/pedido-consulta.module').
        then(m => m.PedidoConsultaModule)
    },
    {
      path: 'pedido-cadastro',
      component: PedidoCadastroComponent,
      loadChildren: () => import('src/app/features/atendimento-lai/pedido-cadastro/pedido-cadastro.module').
      then(m => m.PedidoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AtendimentoLaiRoutingModule { }
