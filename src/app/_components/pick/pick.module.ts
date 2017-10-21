import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { PickRoutingModule } from './pick-routing.module'; 

import { SelectVoucherComponent, SelectRecipientsComponent, 
        MessageComposeComponent, MessagePreviewComponent, 
        ModComponent, PlaceOrderComponent } from './index';

// PIPES
import { CountdownPipe } from '../../pipes/countdown.pipe';

 
@NgModule({
  imports: [
    CommonModule,
    PickRoutingModule,
    FormsModule
  ],
  declarations: [ 
    SelectVoucherComponent, SelectRecipientsComponent, 
    MessageComposeComponent, MessagePreviewComponent, 
    ModComponent, PlaceOrderComponent, CountdownPipe 
  ]
})
export class PickModule { }
