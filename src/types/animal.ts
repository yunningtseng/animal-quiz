export interface Animal {
  id: string;
  name: string;
  location: string;
  enName: string;
  latinName: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  conservation: string;
  distribution: string[];
  habitat: string[];
  feature: string[];
  behavior: string[];
  diet: string[];
  mainPic: string;
  alsoknown: string[];
  pics: string[];
  geo: string;
}

export interface SimpleAnimal {
  id: string;
  name: string;
  class: string;
  mainPic: string;
}
