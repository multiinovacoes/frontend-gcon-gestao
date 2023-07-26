import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeloDocumentoLaiPesquisaComponent } from './modelo-documento-lai-pesquisa/modelo-documento-lai-pesquisa.component';
import { ModeloDocumentoLaiCadastroComponent } from './modelo-documento-lai-cadastro/modelo-documento-lai-cadastro.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'modelo-documento-lai-pesquisa'
    },
    {
        path: 'modelo-documento-lai-pesquisa',
        component: ModeloDocumentoLaiPesquisaComponent,
        loadChildren: () => import('src/app/features/modelo-documento-lai/modelo-documento-lai-pesquisa/modelo-documento-lai-pesquisa.module').
        then(m => m.ModeloDocumentoLaiPesquisaModule)
    },
    {
      path: 'modelo-documento-lai-cadastro',
      component: ModeloDocumentoLaiCadastroComponent,
      loadChildren: () => import('src/app/features/modelo-documento-lai/modelo-documento-lai-cadastro/modelo-documento-lai-cadastro.module').
      then(m => m.ModeloDocumentoLaiCadastroModule)
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeloDocumentoLaiRoutingModule { }
