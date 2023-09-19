export interface ISingleMovieResponse {
  results: ISingleMovieResults;
}

export interface ISingleMovieResults {
  _id: string;
  id: string;
  primaryImage: PrimaryImage;
  titleType: TitleType;
  titleText: TitleText;
  originalTitleText: TitleText;
  releaseYear: ReleaseYear;
  releaseDate: ReleaseDate;
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
  day: number;
  month: number;
  year: number;
}

export interface ReleaseYear {
  year: number;
  endYear: null;
  __typename: string;
}

export interface TitleType {
  displayableProperty: DisplayableProperty;
  text: string;
  id: string;
  isSeries: boolean;
  isEpisode: boolean;
  categories: Category[];
  canHaveEpisodes: boolean;
  __typename: string;
}

export interface Category {
  value: string;
}

export interface DisplayableProperty {
  value: Caption;
}
