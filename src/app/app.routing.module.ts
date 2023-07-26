import { ListaEncaminhamentosRecebidosModule } from './features/painel/lista-encaminhamentos-recebidos/lista-encaminhamentos-recebidos.module';
import { AtendimentoAreaModule } from './relatorios/atendimento-area/atendimento-area.module';
import { AtendimentoModule } from './features/atendimento/atendimento.module';
import { TipoDocumentoModule } from './features/tipo-documento/tipo-documento.module';
import { ModeloDocumentoModule } from './features/modelo-documento/modelo-documento.module';
import { ConfiguracaoModule } from './features/configuracao/configuracao.module';
import { TipoManifestanteModule } from './features/tipo-manifestante/tipo-manifestante.module';
import { FeriadoModule } from './features/feriado/feriado.module';
import { SetorModule } from './features/setor/setor.module';
import { DescricaoOuvidoriaModule } from './features/descricao-ouvidoria/descricao-ouvidoria.module';
import { DescricaoEmailModule } from './features/descricao-email/descricao-email.module';
import { OrigemManifestacaoModule } from './features/origem-manifestacao/origem-manifestacao.module';
import { AssuntoModule } from './features/assunto/assunto.module';
import { AreaModule } from './features/area/area.module';
import { OrgaoModule } from './features/orgao/orgao.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/features/register-user/register-user.module').then(m => m.RegisterUserModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [
        {
            path: 'dashboard',
            loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'atendimento',
          loadChildren: () => import('src/app/features/atendimento/atendimento.module').then(m => m.AtendimentoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'atendimento-lai',
          loadChildren: () => import('src/app/features/atendimento-lai/atendimento-lai.module').then(m => m.AtendimentoLaiModule),
          canActivate: [AuthGuard]
        },
        {
            path: 'natureza',
            loadChildren: () => import('src/app/features/natureza/natureza.module').then(m => m.NaturezaModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'orgao',
          loadChildren: () => import('src/app/features/orgao/orgao.module').then(m => m.OrgaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'instituicao',
          loadChildren: () => import('src/app/features/instituicao/instituicao.module').then(m => m.InstituicaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'area',
          loadChildren: () => import('src/app/features/area/area.module').then(m => m.AreaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'area-lai',
          loadChildren: () => import('src/app/features/area-lai/area-lai.module').then(m => m.AreaLaiModule),
          canActivate: [AuthGuard]
        },

        {
          path: 'assunto',
          loadChildren: () => import('src/app/features/assunto/assunto.module').then(m => m.AssuntoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'assunto-lai',
          loadChildren: () => import('src/app/features/assunto-lai/assunto-lai.module').then(m => m.AssuntoLaiModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'origem-manifestacao',
          loadChildren: () => import('src/app/features/origem-manifestacao/origem-manifestacao.module').then(m => m.OrigemManifestacaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-resposta',
          loadChildren: () => import('src/app/features/tipo-resposta/tipo-resposta.module').then(m => m.TipoRespostaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'descricao-email',
          loadChildren: () => import('src/app/features/descricao-email/descricao-email.module').then(m => m.DescricaoEmailModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'descricao-ouvidoria',
          loadChildren: () => import('src/app/features/descricao-ouvidoria/descricao-ouvidoria.module').then(m => m.DescricaoOuvidoriaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'setor',
          loadChildren: () => import('src/app/features/setor/setor.module').then(m => m.SetorModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'setor-lai',
          loadChildren: () => import('src/app/features/setor-lai/setor-lai.module').then(m => m.SetorLaiModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'feriado',
          loadChildren: () => import('src/app/features/feriado/feriado.module').then(m => m.FeriadoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-manifestante',
          loadChildren: () => import('src/app/features/tipo-manifestante/tipo-manifestante.module').then(m => m.TipoManifestanteModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'configuracao',
          loadChildren: () => import('src/app/features/configuracao/configuracao.module').then(m => m.ConfiguracaoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'configuracao-lai',
          loadChildren: () => import('src/app/features/configuracao-lai/configuracao-lai.module').then(m => m.ConfiguracaoLaiModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'modelo-documento',
          loadChildren: () => import('src/app/features/modelo-documento/modelo-documento.module').then(m => m.ModeloDocumentoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'modelo-documento-lai',
          loadChildren: () => import('src/app/features/modelo-documento-lai/modelo-documento-lai.module').then(m => m.ModeloDocumentoLaiModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'alterar-senha',
          loadChildren: () => import('src/app/features/alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'tipo-documento',
          loadChildren: () => import('src/app/features/tipo-documento/tipo-documento.module').then(m => m.TipoDocumentoModule),
          canActivate: [AuthGuard]
        }]
    },
    {
        path: 'relatorio',
        component: LayoutComponent,
        children: [{
            path: 'atendimento-area',
            loadChildren: () => import('src/app/relatorios/atendimento-area/atendimento-area.module').then(m => m.AtendimentoAreaModule),
            canActivate: [AuthGuard]
        }
      ]
    },
    {
        path: 'painel',
        component: LayoutComponent,
        children: [
          {
            path: 'novas-manifestacoes',
            loadChildren: () => import('src/app/features/painel/lista-novas-manifestacoes/lista-novas-manifestacoes.module').then(m => m.ListaNovasManifestacoesModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'pedidos-enviados-inf',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-lai-enviados/lista-encaminhamentos-lai-enviados.module').then(m => m.ListaEncaminhamentosLaiEnviadosModule),
            canActivate: [AuthGuard]
          },         
          {
            path: 'pedidos-enviados-vencimento-inf',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-lai-vencimento/lista-encaminhamentos-lai-vencimento.module').then(m => m.ListaEncaminhamentosLaiVencimentoModule),
            canActivate: [AuthGuard]
          },         
          {
            path: 'pedidos-enviados-vencidos-inf',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-lai-vencidos/lista-encaminhamentos-lai-vencidos.module').then(m => m.ListaEncaminhamentosLaiVencidosModule),
            canActivate: [AuthGuard]
          },         
          {
            path: 'pedidos-recebidos-inf',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-lai-recebidos/lista-encaminhamentos-lai-recebidos.module').then(m => m.ListaEncaminhamentosLaiRecebidosModule),
            canActivate: [AuthGuard]
          },         

          {
            path: 'encaminhamentos-recebidos',
            loadChildren: () => import('src/app/features/painel/lista-encaminhamentos-recebidos/lista-encaminhamentos-recebidos.module').then(m => m.ListaEncaminhamentosRecebidosModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'pedidos-vencidos-inf',
            loadChildren: () => import('src/app/features/painel/lista-pedidos-vencidos/lista-pedidos-vencidos.module').then(m => m.ListaPedidosVencidosModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'novos-pedidos-inf',
            loadChildren: () => import('src/app/features/painel/lista-lai/lista-lai.module').then(m => m.ListaLaiModule),
            canActivate: [AuthGuard]
          }
        ]
    },
    {
      path: 'painel-recurso',
      component: LayoutComponent,
      children: [
        {
          path: 'recurso-aberto',
          loadChildren: () => import('src/app/features/painel-recurso/recurso-aberto/recurso-aberto.module').then(m => m.RecursoAbertoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'recurso-vencido',
          loadChildren: () => import('src/app/features/painel-recurso/recurso-vencido/recurso-vencido.module').then(m => m.RecursoVencidoModule),
          canActivate: [AuthGuard]
        },
        {
          path: 'recurso-vencimento',
          loadChildren: () => import('src/app/features/painel-recurso/recurso-vencimento/recurso-vencimento.module').then(m => m.RecursoVencimentoModule),
          canActivate: [AuthGuard]
        }

      ]
  },

    {
        path: 'error',
        component: ErrorComponent,
        //loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
