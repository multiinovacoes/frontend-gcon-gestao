import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssuntoLaiCadastroComponent } from './assunto-lai-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: AssuntoLaiCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssuntoLaiCadastroRoutingModule { }
