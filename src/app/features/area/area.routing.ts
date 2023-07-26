import { AreaPesquisaComponent } from './area-pesquisa/area-pesquisa.component';
import { AreaCadastroComponent } from './area-cadastro/area-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'area-pesquisa'
    },
    {
        path: 'area-pesquisa',
        component: AreaPesquisaComponent,
        loadChildren: () => import('src/app/features/area/area-pesquisa/area-pesquisa.module').
        then(m => m.AreaPesquisaModule)
    },
    {
      path: 'area-cadastro',
      component: AreaCadastroComponent,
      loadChildren: () => import('src/app/features/area/area-cadastro/area-cadastro.module').
      then(m => m.AreaCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRoutingModule { }
