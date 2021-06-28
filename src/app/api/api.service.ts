import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SongResponse } from '../song/song.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject('appSettings') private appSettings: any
  ) {}

  searchSongs(search: string, media: string): Observable<SongResponse> {
    // const pathOLd = `https://itunes.apple.com/search?term=${search}&media=${media}`;
    const url = this.appSettings.URL;
    const path = `${url}?term=${search}&media=${media}`;
    return this.http.get<SongResponse>(path);
  }
}
