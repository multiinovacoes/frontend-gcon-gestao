import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituicaoPesquisaComponent } from './instituicao-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: InstituicaoPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstituicaoPesquisaRoutingModule { }
