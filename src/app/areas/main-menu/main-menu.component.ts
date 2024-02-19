import * as _ from 'lodash';
import { Component, OnInit } from '@angular/core';
import { ListDataService } from 'src/app/areas/list/list-data.service';
import { IMainMenuElement } from './main-menu.interfaces';

@Component({
  selector: 'main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})

export class MainMenuComponent implements OnInit {

  public mainMenu: Array<IMainMenuElement> = [
    {
      displayName: 'Wszystkie',
      routerLink: '/list/'
    }
  ];

  constructor(
    private listDataService: ListDataService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.listDataService.getComixListData().then(data => {
      const itemsData = data;
      const uniqueSeriesTitles = _.compact(_.uniq(_.map(itemsData, 'seriesTitle')));
      this.initMainMenu(uniqueSeriesTitles);
    });
  }

  initMainMenu(uniqueSeriesTitles: string[]) {
    _.forEach(uniqueSeriesTitles, (menuItem) => {
      this.mainMenu.push(
        {
          displayName: menuItem,
          routerLink: '/list/' + menuItem
        }
      )
    });
  }

}
