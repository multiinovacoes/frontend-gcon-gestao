import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaLaiCadastroComponent } from './area-lai-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: AreaLaiCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaLaiCadastroRoutingModule { }
