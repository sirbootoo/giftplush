import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
// noinspection TypeScriptCheckImport
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './index';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    HttpModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    NguiAutoCompleteModule
  ],
  declarations: [DashboardComponent, SettingsComponent]
})
export class DashboardModule { }
