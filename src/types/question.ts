export interface Question {
  type: string;
  mainPic: string;
  options: Option[];
  title: string;
  answer: number | number[];
}

export interface Option {
  pic: string;
  name: string;
}
