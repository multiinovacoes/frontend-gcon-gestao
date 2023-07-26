import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecursoVencimentoComponent } from './recurso-vencimento.component';


const routes: Routes = [
    {
        path: '',
        component: RecursoVencimentoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class RecursoVencimentoRoutingModule { }
