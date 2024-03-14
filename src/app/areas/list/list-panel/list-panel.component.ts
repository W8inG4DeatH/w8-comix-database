import * as _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ListDataService } from 'src/app/areas/list/list-data.service';

@Component({
    selector: 'list-panel',
    templateUrl: './list-panel.component.html',
    styleUrls: ['./list-panel.component.scss']
})

export class ListPanelComponent implements OnInit {

    @Input()
    public seriesTitle: string | null = null;

    public itemsData: Array<any> = [];
    public columnsKeys: Array<string> = [];
    public columnsNames: Array<string> = [];
    public columnsFlex: Array<number> = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private listDataService: ListDataService
    ) { }

    ngOnInit(): void {
        this.initColumns();
        this.getSeriesTitleParameter();
    }

    initColumns() {
        this.columnsKeys = ['id', 'displayName', 'author', 'numberOfPages', 'rating'];
        this.columnsNames = ['Id', 'Tytuł', 'Autor', 'Strony', 'Ocena'];
        this.columnsFlex = [5, 45, 30, 10, 10];
    }

    getSeriesTitleParameter(): void {
        this.activatedRoute.paramMap.subscribe(params => {
            this.seriesTitle = params.get('seriesTitle');
            this.loadData();
        });
    }

    loadData() {
        // console.log( 'loadData:', this.seriesTitle );
        this.listDataService.getComixListData().then(data => {
            this.itemsData = data;
            this.getOnlyPossesedItems();
            this.seriesTitle ? this.getItemsBySeriesTitle() : null;
            this.convertDisplayData();
        });
    }

    getItemsBySeriesTitle() {
        this.itemsData = _.filter(this.itemsData, { seriesTitle: this.seriesTitle });
    }

    getOnlyPossesedItems() {
        this.itemsData = _.filter(this.itemsData, { collected: true });
    }

    convertDisplayData() {
        _.forEach(this.itemsData, (item) => {
            item.displayName = '';
            item.displayName += item.seriesTitle ? item.seriesTitle : '';
            item.displayName += item.seriesSubtitle ? (' - ' + item.seriesSubtitle) : '';
            item.displayName += item.comixTitle ? ((item.seriesTitle ? ': ' : '') + item.comixTitle) : '';
        });
    }

    onColumnHeaderClick(columnKey: string) {
        this.itemsData = _.sortBy(this.itemsData, [columnKey]);
        // console.log('onColumnHeaderClick:', columnKey, this.itemsData);
    }

    onItemClick(item: any) {
        this.router.navigate(['/view', item.id]);
    }
}
