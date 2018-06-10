import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContractTemplateComponent } from './components/contract-template/contract-template.component';
import { ContractInfoComponent } from './components/contract-info/contract-info.component';
import { ContractDoneComponent } from './components/contract-done/contract-done.component';
import { WorkflowGuard } from './services/workflow-guard.service';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent,
    children: [
      { path: 'template', component: ContractTemplateComponent },
      { path: 'information', component: ContractInfoComponent, canActivate: [WorkflowGuard] },
      { path: 'done', component: ContractDoneComponent, canActivate: [WorkflowGuard] },
      { path: '',   redirectTo: '/home/template', pathMatch: 'full' }
    ]
  },
  { path: 'history', component: HistoryComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ WorkflowGuard ]
})

export class AppRoutingModule {}
