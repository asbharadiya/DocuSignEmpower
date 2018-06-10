import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ContractTemplateComponent } from './components/contract-template/contract-template.component';
import { ContractInfoComponent } from './components/contract-info/contract-info.component';
import { ContractDoneComponent } from './components/contract-done/contract-done.component';
import { ContractDataService } from './services/contract-data.service';
import { RestService } from './services/rest.service';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { ModalModule } from './modal/modal.module';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ContractTemplateComponent,
    ContractInfoComponent,
    ContractDoneComponent,
    HomeComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    { provide: ContractDataService, useClass: ContractDataService },
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
