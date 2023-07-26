import { ConfiguracaoLaiComponent } from './configuracao-lai.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ConfiguracaoLaiComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguracaoLaiRoutingModule { }
