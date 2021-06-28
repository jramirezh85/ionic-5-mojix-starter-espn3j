import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SongComponent } from './song.component';

@NgModule({
  declarations: [SongComponent],
  exports: [SongComponent],
  imports: [CommonModule, IonicModule]
})
export class SongModule {}
