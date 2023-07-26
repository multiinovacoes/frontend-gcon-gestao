import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoAbertoComponent } from './recurso-aberto.component';


const routes: Routes = [
    {
        path: '',
        component: RecursoAbertoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class RecursoAbertoRoutingModule { }
