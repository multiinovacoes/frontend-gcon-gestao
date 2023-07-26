import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoVencidoComponent } from './recurso-vencido.component';


const routes: Routes = [
    {
        path: '',
        component: RecursoVencidoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class RecursoVencidoRoutingModule { }
