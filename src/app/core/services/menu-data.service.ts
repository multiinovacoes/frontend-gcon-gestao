import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    getMenuList(): CustomMenuItem[] {
        return [
            {
                Label: 'Dashboard', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false
            },
            //{
              //  Label: 'Atendimento', Icon: 'fa-envelope', RouterLink: '/main/atendimento', Childs: null, IsChildVisible: false
            //},
            {
              Label: 'Pedidos de Informação', Icon: 'fa-envelope', RouterLink: '/main/atendimento-lai', Childs: null, IsChildVisible: false
            },
            //{
            //    Label: 'Error 404', Icon: 'fa-exclamation-triangle', RouterLink: '/error', Childs: null, IsChildVisible: false
           // },
           // {
            //    Label: 'Configurações', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
            //        {
            //          Label: 'Área', RouterLink: '/main/area', Childs: null, IsChildVisible: false
            //        },
            //        {
           //           Label: 'Assunto', RouterLink: '/main/assunto', Childs: null, IsChildVisible: false
           //         },
           //         {
           //           Label: 'Configuração', RouterLink: '/main/configuracao', Childs: null, IsChildVisible: false
           //         },
            //        {
           //           Label: 'Descrição Email', RouterLink: '/main/descricao-email', Childs: null, IsChildVisible: false
           //         },
          //          {
           //           Label: 'Descrição Ouvidoria', RouterLink: '/main/descricao-ouvidoria', Childs: null, IsChildVisible: false
           //         },
           //         {
           //           Label: 'Empresa', RouterLink: '/main/orgao', Childs: null, IsChildVisible: false
           //         },
           //         {
           //           Label: 'Feriado', RouterLink: '/main/feriado', Childs: null, IsChildVisible: false
           //         },
           //         {
            //          Label: 'Modelo', RouterLink: '/main/modelo-documento', Childs: null, IsChildVisible: false
           //         },
            //        {
            //          Label: 'Natureza', RouterLink: '/main/natureza', Childs: null, IsChildVisible: false
            //        },
            //        {
            //          Label: 'Origem Manifestação', RouterLink: '/main/origem-manifestacao', Childs: null, IsChildVisible: false
           //         },
           //         {
          //            Label: 'Setor', RouterLink: '/main/setor', Childs: null, IsChildVisible: false
           //         },
           //         {
           //           Label: 'Tipo Documento', RouterLink: '/main/tipo-documento', Childs: null, IsChildVisible: false
          //          },
          //          {
          //            Label: 'Tipo Manifestante', RouterLink: '/main/tipo-manifestante', Childs: null, IsChildVisible: false
          //          },
          //          {
         //             Label: 'Tipo Resposta', RouterLink: '/main/tipo-resposta', Childs: null, IsChildVisible: false
         //           },

         //           ], IsChildVisible: false
        //    },
            {
              Label: 'Configurações LAI', Icon: 'fa-cart-plus', RouterLink: null, Childs: [
                  {
                    Label: 'Área', RouterLink: '/main/area-lai', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Assunto', RouterLink: '/main/assunto-lai', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Configuração Prazos', RouterLink: '/main/configuracao-lai', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Feriados', RouterLink: '/main/feriado', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Instituição', RouterLink: '/main/instituicao', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Modelo de Documento', RouterLink: '/main/modelo-documento-lai', Childs: null, IsChildVisible: false
                  },
                  {
                    Label: 'Setor', RouterLink: '/main/setor-lai', Childs: null, IsChildVisible: false
                  },
                  ], IsChildVisible: false
          },

          //  {
          //      Label: 'Relatórios', Icon: 'fa-book', RouterLink: null, Childs: [
          ////          {
            //        Label: 'Atendimento por Área', RouterLink: '/relatorio/atendimento-area', Childs: null, IsChildVisible: false
          //          },
          //      ],    IsChildVisible: false
         //   },
            {
                Label: 'Painel de Controle', Icon: 'fa-desktop', RouterLink: null, Childs: [
                  {
                    Label: 'Novos Pedidos', RouterLink: '/painel/novos-pedidos-inf', Childs: null, IsChildVisible: true
                  },
                  {
                    Label: 'Encaminhados Enviados', RouterLink: '/painel/pedidos-enviados-inf', Childs: null, IsChildVisible: true
                  },
                  {
                    Label: 'Encaminhamentos Próx. Vencto', RouterLink: '/painel/pedidos-enviados-vencimento-inf', Childs: null, IsChildVisible: true
                  },
                  {
                    Label: 'Encaminhamentos Vencidos', RouterLink: '/painel/pedidos-enviados-vencidos-inf', Childs: null, IsChildVisible: true
                  },
                  {
                    Label: 'Encaminhamentos Recebidos', RouterLink: '/painel/pedidos-recebidos-inf', Childs: null, IsChildVisible: true
                  },
                  {
                    Label: 'Pedidos Vencidos', RouterLink: '/painel/pedidos-vencidos-inf', Childs: null, IsChildVisible: true
                  },

                  
            //      {
            //        Label: 'Encaminhamentos Recebidos', RouterLink: '/painel/encaminhamentos-recebidos', Childs: null, IsChildVisible: true
           //       },
              ],    IsChildVisible: true
            },
            {
              Label: 'Painel de Controle Recurso', Icon: 'fa-desktop', RouterLink: null, Childs: [
                {
                  Label: 'Recursos Abertos', RouterLink: '/painel-recurso/recurso-aberto', Childs: null, IsChildVisible: true
                },
                {
                  Label: 'Recursos Próx. Vencto', RouterLink: '/painel-recurso/recurso-vencimento', Childs: null, IsChildVisible: true
                },
                {
                  Label: 'Recursos Vencidos', RouterLink: '/painel-recurso/recurso-vencido', Childs: null, IsChildVisible: true
                },
            ],    IsChildVisible: true
          },
            {
              Label: 'Alterar Senha', Icon: 'fa-home', RouterLink: '/main/alterar-senha', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Helpdesk', Icon: 'fa-home', RouterLink: 'helpdesk', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Sair', Icon: 'fa-home', RouterLink: 'sair', Childs: null, IsChildVisible: false
            }

        ];
    }
}
