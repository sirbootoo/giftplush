"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CountdownPipe = (function () {
    function CountdownPipe() {
    }
    CountdownPipe.prototype.transform = function (text, args) {
        if (text != undefined) {
            var maxLength = args || 0;
            var length_1 = text.length;
            return (maxLength - length_1);
        }
        else {
            return args;
        }
    };
    return CountdownPipe;
}());
CountdownPipe = __decorate([
    core_1.Pipe({
        name: 'countdown',
        pure: false
    })
], CountdownPipe);
exports.CountdownPipe = CountdownPipe;
//# sourceMappingURL=countdown.pipe.js.map