
import { ConfiguracaoLaiComponent } from './configuracao-lai.component';
import { ConfiguracaoLaiRoutingModule } from './configuracao-lai.routing';
import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonModule } from 'src/app//app.common.module';


@NgModule({
  imports: [
    CommonModule,
    ConfiguracaoLaiRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule
  ],
  declarations: [
    ConfiguracaoLaiComponent
  ]
})
export class ConfiguracaoLaiModule { }
