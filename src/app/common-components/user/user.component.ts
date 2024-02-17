import { Component, Input, OnInit } from '@angular/core';
import { IUser } from './user.interfaces';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {

    @Input()
    user: IUser = <IUser>{};

    @Input()
    layoutInvert: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
