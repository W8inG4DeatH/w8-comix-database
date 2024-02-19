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

  async saveComixListData(comixData: IComixItem[]): Promise<any> {
    this.savedComixItemsLoaded = false;
    return firstValueFrom(this.http.post(this.apiUrl, comixData));
  }
}
