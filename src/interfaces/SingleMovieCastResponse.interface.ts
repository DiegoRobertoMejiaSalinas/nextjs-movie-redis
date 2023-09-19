export interface ISingleMovieCastResponse {
  results: ISingleMovieCastResults;
}

export interface ISingleMovieCastResults {
  _id: string;
  id: string;
  cast: Cast;
}

export interface Cast {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  name: Name;
  attributes: null;
  category: Category;
  characters: Character[];
  episodeCredits: EpisodeCredits;
}

export interface Category {
  id: string;
}

export interface Character {
  name: string;
}

export interface EpisodeCredits {
  total: number;
  yearRange: null;
}

export interface Name {
  id: string;
  nameText: NameText;
  primaryImage: PrimaryImage;
}

export interface NameText {
  text: string;
}
export interface PrimaryImage {
  url: string;
  width: number;
  height: number;
}
