import { ListaEncaminhamentosLaiEnviadosComponent } from './lista-encaminhamentos-lai-enviados.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        component: ListaEncaminhamentosLaiEnviadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], 
    exports: [RouterModule]
})
export class ListaEncaminhamentosLaiEnviadosRoutingModule { }
