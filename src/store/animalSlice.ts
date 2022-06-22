import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Animal } from '../types/animal';
// import firestoreApi from '../api/firestore';
// import type { AppThunk } from './store';

export interface AnimalState {
  animalList: Animal[];
  animal: Animal;
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
      feature: [
        '1. 成熊身長約為120-180公分，體重約80-120公斤，幼熊出生時體長約10公分，體重約僅有150~200公克。',
        '2. 具有強壯有力的四肢：後腳內八字撇，有利於在密林中走動時撥開竹子。',
        '3. 腕骨特化成的偽拇指(不具備關節)，使得牠們能俐落地取食竹子。',
        '4. 掌心覆有毛，使得大貓熊能夠在寒冷的雪地上行走。',
        '5.大貓熊身體顏色主要為黑白兩色。耳朵、眼斑、鼻頭、肩背部和四肢為黑色，其餘部位為白色。相對比例較小的黑色耳朵有減少熱量散失的功能。',
      ],
      behavior: [
        '1.獨居的動物，除了交配季節或雌性的育幼時期，牠們都是獨自居住的。',
        '2.最活躍的時間在早晨和黃昏，但竹子所含熱量低，為減少能量的消耗，牠們每天的睡眠時間約10小時，剩餘時間則大多在覓食和進食。',
      ],
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
      feature: ['', ''],
      behavior: [''],
      diet: '主要以魚維生，野外的國王企鵝特別喜歡吃小型的燈籠魚科(Myctophidae)的魚類，也會吃頭足類(cephalopods)如魷魚(Moroteuthis)。',
      mainPic:
        'http://www.zoo.gov.tw/iTAP/03_Animals/PenguinHouse/KingPenguin/KingPenguin_Pic01.jpg',
    },
  ],
  animal: {} as Animal,
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setAnimal: (state: AnimalState, action: PayloadAction<string>) => {
      const animalId = action.payload;
      const animal = state.animalList.find((e) => e.id === animalId);
      if (animal) {
        state.animal = animal;
      }
    },
  },
});

export const { setAnimal } = animalSlice.actions;

export default animalSlice;
