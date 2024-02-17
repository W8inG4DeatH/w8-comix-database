import { Component, OnInit } from '@angular/core';
import { IMainMenuElement } from './main-menu.interfaces';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {

  public mainMenu: Array<IMainMenuElement> = [];

  constructor() { }

  ngOnInit(): void {
    this.initMainMenu();
  }

  initMainMenu() {
    this.mainMenu = [
      {
        displayName: 'List',
        routerLink: '/list'
      }
    ]
  }

}
