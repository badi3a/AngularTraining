import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngHover]'
})
export class NgHoverDirective {

  constructor(private el:ElementRef, 
    private renderer:Renderer2 ) { }
    @HostListener('mouseenter') onMouseEnter() {
      this.renderer.setStyle(this.el.nativeElement,
        'backgroundColor','#10B981ed');
    }
    @HostListener('mouseleave') onMouseLeave() {
      this.renderer.setStyle(this.el.nativeElement,
        'backgroundColor','white');
    }

}
