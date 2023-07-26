import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeloDocumentoLaiPesquisaComponent } from './modelo-documento-lai-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: ModeloDocumentoLaiPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeloDocumentoLaiPesquisaRoutingModule { }
