import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent, SettingsComponent } from './index';

import { ModResolver, MessagePreviewResolver } from '../../_services/index';


const routes: Routes = [
{ path: '', component: DashboardComponent },
{ path: 'settings', component: SettingsComponent }
];

@NgModule({
imports: [CommonModule, RouterModule.forChild(routes)],
exports: [RouterModule],
declarations: []
})
export class DashboardRoutingModule { }
