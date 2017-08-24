import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ProductService, PubSubService, ModResolver, 
    AlgoliaService, MessagePreviewResolver, 
    WishlistService, AlertService, AuthenticateService, SignupResolver, DashboardService } from './_services/index';
import { AuthGuard } from './_guards/index';

import { CountdownPipe } from './pipes/countdown.pipe';
import { SideBarToogleDirective } from './_directives/side-bar-toogle.directive';
import { FullLayoutComponent } from './_layouts/full-layout.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase, 'heisenberg-dev'),
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    declarations: [
        AppComponent,
        routedComponents,
        //CountdownPipe,
        SideBarToogleDirective,
        FullLayoutComponent
    ],
    providers: [
        ProductService,
        PubSubService,
        ModResolver, 
        AlgoliaService,
        WishlistService,
        MessagePreviewResolver,
        AlertService,
        AuthenticateService,
        AuthGuard,
        SignupResolver,
        DashboardService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }