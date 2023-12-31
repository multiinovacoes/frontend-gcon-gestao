
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { OrgaoService } from 'src/app/features/orgao/orgao.service';
import { AtendimentoService } from 'src/app/features/atendimento/atendimento.service';
import { Orgao } from 'src/app/core/models/orgao.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { notification } from 'src/app/core/models/notification.model';
import { UserIdleService } from 'angular-user-idle';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserContextService } from 'src/app/core/services/user-context.service';
import { MenuDataService } from 'src/app/core/services/menu-data.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  displayNotifications: boolean;

  notifications: notification[];

  orgaos!: any;
  orgao1: number;

  numeroProtocolo!: string;


  constructor(
    private router: Router,
    private routeStateService: RouteStateService,
    private sessionService: SessionService,
    private userIdle: UserIdleService,
    private toastService: ToastService,
    private themeService: ThemeService,
    private orgaoService: OrgaoService,
    private atendimentoService: AtendimentoService,
    private errorHandler: ErrorHandlerService,
    private userContextService: UserContextService,
    private menuDataService: MenuDataService,
    private userDataService: UserDataService) {

    this.displayNotifications = false;

    var selectedTheme = this.sessionService.getItem("selected-theme");
    if (selectedTheme) {
      this.selectTheme(selectedTheme);
    }
  }

  ngOnInit() {
    this.user = this.sessionService.getItem("currentUser");
    this.notifications = [];
    for (var i = 1; i <= 5; i++) {
      var notificationObj = new notification("Message " + i, new Date(), null)
      this.notifications.push(notificationObj);
    }



    //Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    this.userIdle.onTimerStart().subscribe();

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
      this.logout();
    });
  }

  logout() {

    this.userDataService.logout()
    .then(() => {
      this.userIdle.stopWatching();
      this.routeStateService.removeAll();
      this.userContextService.logout();
      this.sessionService.removeItem('active-menu');
      this.router.navigate(['/login']);
    })
    .catch(erro => {
      this.toastService.addSingle('error', '', erro);
      return;
    });
  }

  showNotificationSidebar() {
    this.displayNotifications = true;
  }



  mudaOuvidoria(){
    this.user.orgao = this.orgao1;
    this.userContextService.setUser(this.user);
    this.routeStateService.add("Dashboard", '/main/dashboard', null, true);
  }

  toggleMenu() {
    this.menuDataService.toggleMenuBar.next(true);
  }

  selectTheme(theme: string) {
    this.sessionService.setItem("selected-theme", theme);
    this.themeService.selectTheme(theme);
  }

  carregarOrgaos() {
    this.orgaoService.listar()
      .then(orgaos => {
        this.orgaos = orgaos.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarProtocolo(){
    this.atendimentoService.pesquisaProtocolo(this.numeroProtocolo).then((atendimento) => {
          this.routeStateService.add('Edição de Atendimento',
      '/main/atendimento/atendimento-cadastro', atendimento.id, false);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      })
 }


}
