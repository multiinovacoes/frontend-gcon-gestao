import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeloDocumentoLaiCadastroComponent } from './modelo-documento-lai-cadastro.component';


const routes: Routes = [
    {
        path: '',
        component: ModeloDocumentoLaiCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeloDocumentoLaiCadastroRoutingModule { }
