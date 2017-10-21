import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SelectVoucherComponent, SelectRecipientsComponent, 
        MessageComposeComponent, MessagePreviewComponent, 
        ModComponent, PlaceOrderComponent } from './index';

import { ModResolver, MessagePreviewResolver } from '../../_services/index';
 

const routes: Routes = [
  {
      path: '',
      component: SelectVoucherComponent,
      children: [
          { path: 'mod/:slug', component: ModComponent },
          
      ]
  },
  { path: 'selectrecipients', component: SelectRecipientsComponent },
  { path: 'composemessage', component: MessageComposeComponent },
  { path: 'messagepreview', component: MessagePreviewComponent,
      resolve: {
          info: MessagePreviewResolver
      }
  },
  { path: 'placeorder', component: PlaceOrderComponent,
      resolve: {
          info: MessagePreviewResolver
      }
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PickRoutingModule { }
