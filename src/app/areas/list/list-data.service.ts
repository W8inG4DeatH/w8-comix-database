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
    return [
      {
        seriesTitle: 'Kajko i Kokosz',
        comixTitle: 'Złoty puchar - część 1',
        author: 'Janusz Christa',
        publisher: 'EGMONT Polska',
        publishmentYear: 2017,
        numberOfPages: 40,
        coverHard: false,
        rating: 8,
        collected: true,
        userId: 1
      },
      {
        seriesTitle: 'Kajko i Kokosz',
        comixTitle: 'Złoty puchar - część 2',
        author: 'Janusz Christa',
        publisher: 'EGMONT Polska',
        publishmentYear: 2017,
        numberOfPages: 40,
        coverHard: false,
        rating: 8,
        collected: true,
        userId: 1
      },
      {
        seriesTitle: 'Kajko i Kokosz',
        comixTitle: 'Złoty puchar - część 3',
        author: 'Janusz Christa',
        publisher: 'EGMONT Polska',
        publishmentYear: 2017,
        numberOfPages: 39,
        coverHard: false,
        rating: 8,
        collected: true,
        userId: 1
      },
      {
        seriesTitle: 'Thorgal',
        'seriesSubtitle': 'Louve - tom 1',
        comixTitle: 'Raissa',
        author: 'Roman Surżenko, Pennetier Yann',
        publisher: 'EGMONT Polska',
        publishmentYear: 2018,
        numberOfPages: 46,
        coverHard: true,
        rating: 7,
        collected: true,
        userId: 1
      }
    ]
    // return firstValueFrom(this.http.get<IComixItem[]>(this.apiUrl));
  }

  // async saveComixListData(comixData: IComixItem[]): Promise<any> {
  //   return firstValueFrom(this.http.post(this.apiUrl, comixData));
  // }
}
