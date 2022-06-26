export interface SimpleAnimal {
  id: string;
  name: string;
  class: string;
  mainPic: string;
}

export interface Animal extends SimpleAnimal {
  location: string;
  enName: string;
  latinName: string;
  phylum: string;
  order: string;
  family: string;
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
