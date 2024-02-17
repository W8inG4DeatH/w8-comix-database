import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListDataService } from 'src/app/areas/list/list-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.scss']
})

export class ListPanelComponent implements OnInit {

  public itemsData: Array<any> = [];
  public columnsKeys: Array<string> = [];
  public columnsNames: Array<string> = [];
  public columnsFlex: Array<number> = [];

  constructor(
    private router: Router,
    public listDataService: ListDataService
  ) { }

  ngOnInit(): void {
    this.initColumns();
    this.loadData();
  }

  initColumns() {
    this.columnsKeys = ['id', 'displayName', 'author', 'numberOfPages', 'coverHard', 'rating'];
    this.columnsNames = ['Nr', 'Name', 'Author', 'Pages', 'Hard', 'Rating'];
    this.columnsFlex = [5, 50, 30, 5, 5, 5];
  }

  loadData() {
    this.listDataService.getComixListData().subscribe(data => {
      this.itemsData = data;
      this.getOnlyPossesed();
      this.convertData();
      this.convertDisplayData();
    });
  }

  getOnlyPossesed()
  {
    this.itemsData = _.filter(this.itemsData, {collected: true});
  }

  convertData() {
    _.forEach(this.itemsData, (item, index) => {
      item.id = index + 1;
      item.coverHard = (item.coverHard !== undefined) ? item.coverHard : false;
    });
  }

  convertDisplayData() {
    _.forEach(this.itemsData, (item) => {
      item.displayName = '';
      item.displayName += item.seriesTitle ? item.seriesTitle : '';
      item.displayName += item.seriesSubtitle ? (' - ' + item.seriesSubtitle) : '';
      item.displayName += item.comixTitle ? ((item.seriesTitle ? ': ' : '') + item.comixTitle) : '';
      item.coverHard = item.coverHard ? '+' : '-';
      item.rating = item.rating ? (item.rating + '/10') : '';
    });
  }

  onColumnHeaderClick(columnKey: string) {
    this.itemsData = _.sortBy(this.itemsData, [columnKey]);
    console.log('onColumnHeaderClick:', columnKey, this.itemsData);
  }

  onItemClick(item: any) {
    this.router.navigate(['/edition', item.Id]);
  }
}
