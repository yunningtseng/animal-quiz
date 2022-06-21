import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal } from '../types/animal';
// import firestoreApi from '../api/firestore';
// import type { AppThunk } from './store';

export interface AnimalState {
  animalList: Animal[];
}

const initialState: AnimalState = {
  animalList: [
    {
      id: '001',
      nameCh: '大貓熊',
      location: '大貓熊館',
      nameEn: 'Giant Panda',
      nameLatin: 'Ailuropoda melanoleuca',
      phylum: '脊索動物門',
      class: '哺乳綱',
      order: '食肉目',
      family: '熊科',
      conservation: '易危(VU)',
      distribution: '目前僅存於中國四川、甘肅和陜西三省境內。',
      habitat:
        '海拔2600-3,000公尺的高山中，會因季節的變化而改變其居住的海拔高度，一般在乾淨的活水源和竹林發育良好的地區活動。',
      feature: '',
      behavior: '',
      diet: '大貓熊以竹為主食(佔日糧中大約99%)',
      mainPic:
        'http://www.zoo.gov.tw/iTAP/03_Animals/PandaHouse/Panda_Pic01.jpg',
    },
    {
      id: '002',
      nameCh: '國王企鵝',
      location: '企鵝館',
      nameEn: 'King Penguin',
      nameLatin: 'Ailuropoda melanoleuca',
      phylum: '脊索動物門',
      class: '鳥綱',
      order: '企鵝目',
      family: '企鵝科',
      conservation: '暫無危機 LC',
      distribution:
        '次南極區。涵蓋南美福克蘭群島、喬治亞群島、南非南方海域及紐西蘭南方海域。',
      habitat: '',
      feature: '',
      behavior: '',
      diet: '主要以魚維生，野外的國王企鵝特別喜歡吃小型的燈籠魚科(Myctophidae)的魚類，也會吃頭足類(cephalopods)如魷魚(Moroteuthis)。',
      mainPic:
        'http://www.zoo.gov.tw/iTAP/03_Animals/PenguinHouse/KingPenguin/KingPenguin_Pic01.jpg',
    },
  ],
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {},
});

export default animalSlice;
