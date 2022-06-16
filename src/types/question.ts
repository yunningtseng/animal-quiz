export interface Question {
  type: string;
  mainPic: string;
  options: Options[];
  title: string;
  answer: number | number[];
}

export interface Options {
  pic: string;
  name: string;
}
