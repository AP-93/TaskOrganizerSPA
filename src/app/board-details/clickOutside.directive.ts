import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
// https://christianliebel.com/2016/05/angular-2-a-simple-click-outside-directive/
@Directive({
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    // elementRef - reference to the DOM element on which the clickOutside directive was placed on
    constructor(private _elementRef: ElementRef) {
    }

    @Output()
    public clickOutside = new EventEmitter<MouseEvent>();

    // HostListener annotation allows us to listen for certain events on the host
    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        const clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickOutside.emit(event);
        }
    }
}
