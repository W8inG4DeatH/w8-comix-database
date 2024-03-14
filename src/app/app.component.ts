import { Component, ElementRef, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './../assets/scss/colors.scss',
        './../assets/scss/buttons.scss'
    ],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent implements AfterViewInit {
    constructor(private el: ElementRef) { }

    ngAfterViewInit() {
        this.adjustMainHeight();
    }

    adjustMainHeight() {
        const headerHeight = this.el.nativeElement.querySelector('.main-header').offsetHeight;
        const comixMain = this.el.nativeElement.querySelector('.comix-main');
        if (comixMain) {
            comixMain.style.height = `calc(100% - ${headerHeight}px)`;
        }
    }
}
