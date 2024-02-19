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

  constructor(private http: HttpClient) { }

  async getComixListData(): Promise<IComixItem[]> {
    return firstValueFrom(this.http.get<IComixItem[]>(this.apiUrl));
  }

  async saveComixListData(comixData: IComixItem[]): Promise<any> {
    return firstValueFrom(this.http.post(this.apiUrl, comixData));
  }
}
