import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaLaiPesquisaComponent } from './area-lai-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: AreaLaiPesquisaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaLaiPesquisaRoutingModule { }
