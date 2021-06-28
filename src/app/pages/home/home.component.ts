import {
  OnInit,
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { finalize, map, startWith } from 'rxjs/operators';
import { combineLatest, of, from } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { SongResponse, SongModel } from '../../song/song.model';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges, AfterViewInit {
  artist: string;
  media: string;
  totalElements: number;
  elements: BehaviorSubject<SongModel[]> = new BehaviorSubject<SongModel[]>([]);
  filterTerm: string = '';
  filteredElements$: Observable<SongModel[]>;
  @ViewChild(IonSearchbar, { static: true }) searchBar: IonSearchbar;
  filterTerm$: Observable<string>;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.artist = 'Shakira';
    this.media = 'musicVideo'; // Or movie

    this.filterTerm$ = this.searchBar.ionChange.pipe(
      map(event => (event.target as HTMLInputElement).value),
      startWith('')
    );

    this.filteredElements$ = combineLatest([
      this.loadData(),
      this.filterTerm$
    ]).pipe(
      map(([songs, filterString]) =>
        songs.filter(
          song =>
            song.trackName.toLowerCase().indexOf(filterString.toLowerCase()) !==
            -1
        )
      )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngAfterViewInit() {}

  loadData(): Observable<SongModel[]> {
    this.api.searchSongs(this.artist, this.media).subscribe(
      (data: SongResponse) => {
        const items = data.results.map(item => {
          let value = { ...item };
          let date = new Date(item.releaseDate);
          value.date = `Released ${date.toDateString()}`;
          value.trackTime = this.convertMillis(item.trackTimeMillis);
          return value;
        });
        // this.elements = items;
        // this.totalElements = data.resultCount;
        return this.elements.next(items);
      },
      error => {
        return [];
      }
    );
    return this.elements.asObservable();
  }

  convertMillis(millis) {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds;
  }

  changeToogle(event) {
    this.media = event.checked ? 'movie' : 'musicVideo';
    // console.log(this.media);
    this.filterTerm = '';
    this.loadData();
  }
}
