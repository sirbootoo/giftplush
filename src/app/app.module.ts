import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ProductService, PubSubService, ModResolver, 
    AlgoliaService, MessagePreviewResolver, 
    WishlistService, AlertService, AuthenticateService, SignupResolver, DashboardService } from './_services/index';
import { AuthGuard } from './_guards/index';

import { CountdownPipe } from './pipes/countdown.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        routedComponents,
        CountdownPipe
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