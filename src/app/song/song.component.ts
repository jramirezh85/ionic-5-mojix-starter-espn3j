import { Component, Input, OnInit } from '@angular/core';
import { SongModel } from './song.model';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  @Input() currentSong: SongModel;
  @Input() position: number;
  expanded: boolean;
  color: string = 'lightyellow';

  constructor() {}

  ngOnInit(): void {
    // console.log('currentSong', this.currentSong);
    // console.log('position', this.position);
    this.expanded = false;
    if (this.position) {
      this.color = this.position % 2 === 0 ? 'lightblue' : 'lightgreen';
    }
  }

  changeExpand(event) {
    this.expanded = !this.expanded;
  }
}
