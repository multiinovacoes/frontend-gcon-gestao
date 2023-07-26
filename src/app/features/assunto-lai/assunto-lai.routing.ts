import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssuntoLaiCadastroComponent } from './assunto-lai-cadastro/assunto-lai-cadastro.component';
import { AssuntoLaiPesquisaComponent } from './assunto-lai-pesquisa/assunto-lai-pesquisa.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'assunto-lai-pesquisa'
    },
    {
        path: 'assunto-lai-pesquisa',
        component: AssuntoLaiPesquisaComponent,
        loadChildren: () => import('src/app/features/assunto-lai/assunto-lai-pesquisa/assunto-lai-pesquisa.module').
        then(m => m.AssuntoLaiPesquisaModule)
    },
    {
      path: 'assunto-lai-cadastro',
      component: AssuntoLaiCadastroComponent,
      loadChildren: () => import('src/app/features/assunto-lai/assunto-lai-cadastro/assunto-lai-cadastro.module').
      then(m => m.AssuntoLaiCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssuntoLaiRoutingModule { }
