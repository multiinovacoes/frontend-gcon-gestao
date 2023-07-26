import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetorLaiCadastroComponent } from './setor-lai-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: SetorLaiCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetorLaiCadastroRoutingModule { }
