import { Hit as AlgoliaHit } from 'instantsearch.js';

export interface SimpleAnimal {
  id: string;
  name: string;
  mainPic: string;
  class: string;
  order: string;
  family: string;
}

export interface Animal extends SimpleAnimal {
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
}

export interface SimpleAnimalHit extends SimpleAnimal, AlgoliaHit {}
