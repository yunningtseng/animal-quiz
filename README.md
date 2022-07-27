# Animal Quiz

A Multiplayer Animal Quiz Game with Animal Introduction

`https://animal-quiz-4be2f.web.app/`

## Table of Contents

- [Features](#features)
  - [Quiz Game](#quiz-game)
    - Game Modes
    - Question Types
    - [Other Features](#other-features)
  - Animal Introduction
    - Instantly Filter and Search
    - [Infinite Scroll](#infinite-scroll)
    - [Zhuyin (注音, Mandarin Phonetic Symbols)](#zhuyin-注音-mandarin-phonetic-symbols)
- [Tech](#tech)
  - TypeScript
  - React
  - Redux
  - [Reselect](#reselect)
  - [Algolia](#algolia)
  - Tailwind
  - Framer Motion
  - Firebase:
    Authentication, Firestore, Storage, Hosting
- [Flow Charts](#flow-charts)

---

## Features

### Quiz Game

- Three game modes
  - Normal
  - Time challenge
  - Competition
    - Competition mode allows user to invite others into the room and compete against each other in real time.
- Three Question Types

  - Single
  - Multiple
  - True False

- Animal introduction

### Zhuyin (注音, Mandarin Phonetic Symbols)

- Provides Zhuyin (Mandarin Phonetic Symbols) for children to read easily.
- Download Zhuyin BpmfGenSekiGothic-R.ttf file.
  透過在 slice 上的 isPhonetic boolean state，去控制注音字體是否要套用，
- With isPhonetic state (boolean) in animalSlice, control font will apply Zhuyin or not.

### other features

- When the guest logs in after playing several games, all previous records will be kept to the history of the new login user.
- 不須登入也可以玩遊戲，且在登入後之前的遊戲紀錄會加進用戶資料中

- Keeps track of ranking results of different modes and displays on leaderboard.

---

## Tech

### Reselect

In order to reduce unnecessary render and improve performance, Reselect was used with Redux to solve it.

```TypeScript
const quizBoxSelector = createStructuredSelector({
  options: (state) => state.quiz.question.options,
  questionId: (stat) => state.quiz.question.id,
});
function QuestionBox() {
  const { options, questionId } = useAppSelector(quizBoxSelector);
  return (
    ...
  );
}
```

```TypeScript
const controlBarSelector = createSelector(
  (state) => state.quiz.mode,
  (state) => state.quiz.qIdList,
  ( mode, qIdList) => ({
    mode,
    hasNextQuestion: mode !== 'normal' || qIdList.length < 10,
  }),
);

function QuestionBox() {
  const { mode, hasNextQuestion } = useAppSelector(controlBarSelector);
  return (
      ...
  );
}
```

### Algolia

The Algolia provides search as a service, offering web search across a client's website using an externally hosted search engine

Instant search and filter

- User can instantly filter and search for animals and seamlessly scroll through results, provides better user experience.

### Infinite scroll

observer

### Framer Motion

Animation package.
checkbox、O X、hover 時放大

---

## Flow Charts

![alt text](https://i.imgur.com/wrWoe5m.gif)
