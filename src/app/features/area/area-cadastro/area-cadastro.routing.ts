import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaCadastroComponent } from 'src/app/features/area/area-cadastro/area-cadastro.component';

const routes: Routes = [
    {
        path: '',
        component: AreaCadastroComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaCadastroRoutingModule { }
