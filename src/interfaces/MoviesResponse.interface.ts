export interface IMoviesResponse {
  page: string;
  next: string;
  entries: number;
  results: Result[];
}

export interface Result {
  _id: string;
  id: string;
  primaryImage: PrimaryImage | null;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: ReleaseYear;
  releaseDate: ReleaseDate | null;
}

export interface TitleText {
  text: string;
}

export interface PrimaryImage {
  id: string;
  width: number;
  height: number;
  url: string;
  caption: Caption;
}

export interface Caption {
  plainText: string;
}

export interface ReleaseDate {
  day: null;
  month: number | null;
  year: number;
}

export interface ReleaseYear {
  year: number;
  endYear: null;
}

export interface TitleType {
  text: Text;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
}
