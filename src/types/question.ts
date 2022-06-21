export interface Question {
  type: string;
  mainPic: string;
  options: Option[];
  title: string;
  answer: number[];
  id: string;
}

export interface Option {
  pic: string;
  name: string;
}
