import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetorLaiPesquisaComponent } from './setor-lai-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: SetorLaiPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetorLaiPesquisaRoutingModule { }
