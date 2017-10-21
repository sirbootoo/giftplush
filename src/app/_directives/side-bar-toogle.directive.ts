import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSideBarToogle]'
})
export class SideBarToogleDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    document.querySelector('.row-offcanvas').classList.toggle('active');
    document.querySelector('.sidebtn').classList.toggle('active');
  } 

} 
