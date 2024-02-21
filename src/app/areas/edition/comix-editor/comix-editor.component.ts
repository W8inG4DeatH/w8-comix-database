import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComixItem } from 'src/app/areas/list/list.interfaces';
import { ListDataService } from 'src/app/areas/list/list-data.service';

@Component({
  selector: 'comix-editor',
  templateUrl: './comix-editor.component.html',
  styleUrls: ['./comix-editor.component.scss']
})

export class ComixEditorComponent implements OnInit {

  @Input()
  public id: number | null = null;

  public element: IComixItem = this.prepareNewElement();

  public editionPassword: string = '';
  public editionMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private listDataService: ListDataService
  ) {
  }

  ngOnInit(): void {
    this.getIdParameter();
  }

  getIdParameter(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam !== null ? Number(idParam) : null;

      if (id !== null && Number.isFinite(id)) {
        this.id = id;
        this.loadElementById(id);
      }
    });
  }

  loadElementById(id: number): void {
    this.listDataService.getComixListData().then(data => {
      const foundItem = data.find(item => item.id === id);
      this.element = foundItem !== undefined ? foundItem : this.prepareNewElement();
    });
  }

  prepareNewElement(): IComixItem {
    const newElement: IComixItem = {
      id: 0,
      seriesTitle: '',
      comixTitle: '',
      author: '',
      publisher: '',
      publishmentYear: null,
      numberOfPages: 1,
      coverHard: false,
      rating: 1,
      collected: false,
      userId: 1
    };
    return newElement;
  }

  loadElement(id: number): IComixItem {
    const loadedElement: IComixItem = this.prepareNewElement();
    return loadedElement;
  }

  onEditClick() {
    if (this.editionPassword === 'IHS') {
      this.editionMode = true;
    }
  }

  onSubmitClick() {
    this.listDataService.saveComixItem(this.element).then(data => {
      this.editionMode = false;
    });
  }
}
