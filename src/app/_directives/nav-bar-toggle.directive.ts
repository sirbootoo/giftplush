import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNavBarToogle]'
})
export class NavBarToogleDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    //document.querySelector('.navbar-collapse').classList.toggle('collapsing');
    
    document.querySelector('#navbar').classList.toggle('show');
    document.querySelector('.fh5co-nav-toggle').classList.toggle('active');

    console.log(document.querySelector('#navbar').classList);

  } 

} 
