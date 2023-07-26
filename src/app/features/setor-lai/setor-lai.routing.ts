import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetorLaiPesquisaComponent } from './setor-lai-pesquisa/setor-lai-pesquisa.component';
import { SetorLaiCadastroComponent } from './setor-lai-cadastro/setor-lai-cadastro.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'setor-lai-pesquisa'
    },
    {
        path: 'setor-lai-pesquisa',
        component: SetorLaiPesquisaComponent,
        loadChildren: () => import('src/app/features/setor-lai/setor-lai-pesquisa/setor-lai-pesquisa.module').
        then(m => m.SetorLaiPesquisaModule)
    },
    {
      path: 'setor-lai-cadastro',
      component: SetorLaiCadastroComponent,
      loadChildren: () => import('src/app/features/setor-lai/setor-lai-cadastro/setor-lai-cadastro.module').
      then(m => m.SetorLaiCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetorLaiRoutingModule { }
