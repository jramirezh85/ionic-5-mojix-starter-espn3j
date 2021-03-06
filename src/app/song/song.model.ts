export interface SongResponse {
  resultCount: number;
  results: Array<SongModel>;
}

export interface SongModel {
  wrapperType: string;
  kind: string;
  artistId: number;
  trackId: number;
  artistName: string;
  trackName: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  date?: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackTimeMillis: number;
  trackTime?: string;
  country: string;
  currency: string;
  primaryGenreName: string;

  //For thumbnail
  artworkUrl100: string;
}
