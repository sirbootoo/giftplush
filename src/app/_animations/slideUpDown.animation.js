"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import the required animation functions from the angular animations module
var animations_1 = require("@angular/animations");
exports.slideUpDownAnimation = animations_1.trigger('slideUpDownAnimation', [
    animations_1.transition('void => *', [
        animations_1.style({ height: 0 }),
        animations_1.animate(250, animations_1.style({ height: '*' }))
    ]),
    animations_1.transition('* => void', [
        animations_1.style({ height: '*' }),
        animations_1.animate(250, animations_1.style({ height: 0 }))
    ])
]);
//# sourceMappingURL=slideUpDown.animation.js.map