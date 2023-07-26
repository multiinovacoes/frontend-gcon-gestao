import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaLaiPesquisaComponent } from './area-lai-pesquisa/area-lai-pesquisa.component';
import { AreaLaiCadastroComponent } from './area-lai-cadastro/area-lai-cadastro.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'area-lai-pesquisa'
    },
    {
        path: 'area-lai-pesquisa',
        component: AreaLaiPesquisaComponent,
        loadChildren: () => import('src/app/features/area-lai/area-lai-pesquisa/area-lai-pesquisa.module').
        then(m => m.AreaLaiPesquisaModule)
    },
    {
      path: 'area-lai-cadastro',
      component: AreaLaiCadastroComponent,
      loadChildren: () => import('src/app/features/area-lai/area-lai-cadastro/area-lai-cadastro.module').
      then(m => m.AreaLaiCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaLaiRoutingModule { }
