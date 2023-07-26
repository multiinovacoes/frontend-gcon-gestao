import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituicaoCadastroComponent } from './instituicao-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: InstituicaoCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstituicaoCadastroRoutingModule { }
