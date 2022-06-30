import { Hit as AlgoliaHit } from 'instantsearch.js';

export interface SimpleAnimal {
  id: string;
  name: string;
  thumbnail: string;
  class: string;
  order: string;
  family: string;
}

export interface Animal extends SimpleAnimal {
  mainPic: string;
  location: string;
  enName: string;
  latinName: string;
  phylum: string;
  conservation: string;
  distribution: string[];
  habitat: string[];
  feature: string[];
  behavior: string[];
  diet: string[];
  alsoknown: string[];
  pics: string[];
  geo: string;
  crisis: string[];
}

export interface SimpleAnimalHit extends SimpleAnimal, AlgoliaHit {}
