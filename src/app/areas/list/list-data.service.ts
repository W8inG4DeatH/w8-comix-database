import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComixItem } from 'src/app/areas/list/list.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private apiUrl = 'assets/comix-data.json';

  constructor(private http: HttpClient) { }

  getComixListData(): Observable<IComixItem[]> {
    return this.http.get<IComixItem[]>(this.apiUrl);
  }

  saveComixListData(comixData: IComixItem[]): Observable<any> {
    return this.http.post(this.apiUrl, comixData);
  }
}
