import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstituicaoPesquisaComponent } from './instituicao-pesquisa/instituicao-pesquisa.component';
import { InstituicaoCadastroComponent } from './instituicao-cadastro/instituicao-cadastro.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'instituicao-pesquisa'
    },
    {
        path: 'instituicao-pesquisa',
        component: InstituicaoPesquisaComponent,
        loadChildren: () => import('src/app/features/instituicao/instituicao-pesquisa/instituicao-pesquisa.module').
        then(m => m.InstituicaoPesquisaModule)
    },
    {
      path: 'instituicao-cadastro',
      component: InstituicaoCadastroComponent,
      loadChildren: () => import('src/app/features/instituicao/instituicao-cadastro/instituicao-cadastro.module').
      then(m => m.InstituicaoCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InstituicaoRoutingModule { }
