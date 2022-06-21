const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');

const serviceAccount = require('./credentials.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function getQuestion(id) {
  const docSnap = await db.collection('questions').doc(id).get();

  const data = docSnap.data();

  console.log(data);
}

async function setQuestion() {
  const question = {
    id: '0099',
    options: [
      { name: '棲息在雨林或山區的森林中', id: '0', pic: '' },
      { pic: '', name: '刺槐林地及有明顯乾季的熱帶大草原', id: '1' },
      {
        pic: '',
        name: '闊葉林中，喜歡在濃密的天然林，常在裸露的岩石或水源地附近活動',
        id: '2',
      },
      { id: '3', name: '熱帶落葉性和常綠雨林，海拔600~2000公尺', pic: '' },
    ],
    answer: [3, 4],
    type: 'multiple',
    title: '下列哪一個是大長臂猿的棲息地？',
    questionSubject: 'name',
    optionSubject: 'habitat',
    questionValue: '大長臂猿',
    mainPic: '',
  };

  const docRef = db.collection('questions').doc('0099');

  await docRef.set(question);
}

function randomNumbers(current, max, length) {
  const arr = [current];
  for (let i = 0, j = length; i < j; i += 1) {
    const numNumber = Math.floor(Math.random() * (max - 1) + 1);
    if (!arr.includes(numNumber)) {
      arr.push(numNumber);
    }
  }
  return arr;
}

function readData() {
  const data = require('./data.json');
  const questionList = data.data;
  const optionsData = require('./data.json');
  const optionList = optionsData.data.map((e) => e.answerValue);

  for (let index = 0; index < questionList.length; index++) {
    const question = questionList[index];

    const randomOptions = randomNumbers(index, optionList.length, 3).map(
      (e) => optionList[e],
    );

    console.log(randomOptions);

    // const answer = options.indexOf(question.answerValue);

    const result = {
      id: question.id,
      // options: [
      //   { name: '棲息在雨林或山區的森林中', id: '0', pic: '' },
      //   { pic: '', name: '刺槐林地及有明顯乾季的熱帶大草原', id: '1' },
      //   {
      //     pic: '',
      //     name: '闊葉林中，喜歡在濃密的天然林，常在裸露的岩石或水源地附近活動',
      //     id: '2',
      //   },
      //   { id: '3', name: '熱帶落葉性和常綠雨林，海拔600~2000公尺', pic: '' },
      // ],
    //   answer: [answer],
      type: question.type,
      title: `下列哪一個是${question.questionValue}的棲息地？`,
      questionSubject: 'name',
      optionSubject: 'habitat',
      questionValue: question.questionValue,
      mainPic: '',
    };

    // console.log(result);
  }
}

readData();

// getQuestion('0001');

// setQuestion();
