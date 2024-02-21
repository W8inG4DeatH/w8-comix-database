import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComixItem } from 'src/app/areas/list/list.interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private apiUrl = 'assets/comix-data.json';
  private comixItems: IComixItem[] = [];
  private savedComixItemsLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  async getComixListData(): Promise<IComixItem[]> {
    if (!this.comixItems.length || !this.savedComixItemsLoaded) {
      try {
        const data = await firstValueFrom(this.http.get<IComixItem[]>(this.apiUrl));
        this.comixItems = data;
        this.savedComixItemsLoaded = true;
        return data;
      } catch (error) {
        this.savedComixItemsLoaded = false;
        console.error('Failed to load comix data', error);
        throw error;
      }
    }
    return this.comixItems;
  }

  async saveComixItem(comixItem: IComixItem): Promise<void> {
    if (comixItem.id === 0) {
      // Find the index of the last item with the same seriesTitle
      const lastIndex = _.findLastIndex(this.comixItems, { seriesTitle: comixItem.seriesTitle });
      if (lastIndex !== -1) {
        // Insert the new item after the last item with the same seriesTitle
        this.comixItems.splice(lastIndex + 1, 0, comixItem);
      } else {
        // If no item with the same seriesTitle exists, push to the end of the array
        this.comixItems.push(comixItem);
      }
    } else {
      // Find the index of the item to replace
      const index = this.comixItems.findIndex(item => item.id === comixItem.id);
      if (index !== -1) {
        // Replace the existing item
        this.comixItems[index] = comixItem;
      }
    }

    // Save the updated list
    await this.saveComixListData();
  }


  async saveComixListData(): Promise<any> {
    this.savedComixItemsLoaded = false;
    return firstValueFrom(this.http.post(this.apiUrl, this.comixItems));
  }
}
