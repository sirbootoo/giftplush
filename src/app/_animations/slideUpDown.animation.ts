// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideUpDownAnimation =

    trigger('slideUpDownAnimation', [
        transition('void => *', [
            style({height: 0}),
            animate(250, style({height: '*'}))
        ]),
        transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
        ])
    ]);