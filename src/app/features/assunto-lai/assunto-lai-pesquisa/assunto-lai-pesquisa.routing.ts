import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssuntoLaiPesquisaComponent } from './assunto-lai-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: AssuntoLaiPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssuntoLaiPesquisaRoutingModule { }
