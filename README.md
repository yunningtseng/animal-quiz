# Animal Quiz

A Multiplayer Animal Quiz Game with Animal Introduction

`https://animal-quiz-4be2f.web.app/`

## Table of Contents

- [Features](#features)
  - [Quiz Game](#quiz-game)
    - Game Modes
    - Question Types
  - [Animal Introduction](#animal-introduction)
    - Instantly Filter and Search
    - Infinite Scroll
    - Zhuyin (注音, Mandarin Phonetic Symbols)
  - [Other Features](#other-features)
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

- Questions generated randomly.
- Three game modes

  - Normal

    - Ten questions in one quiz.

  - Time challenge
    - Thirty seconds in one quiz.
  - Competition

    - Thirty seconds in one quiz.
    - Allows user to invite others into the room and compete against each other in real time.

- Three Question Types

  - Single
  - Multiple
  - True False

![alt text](https://i.imgur.com/8JWXiVE.gif)

### Animal introduction

- Instant search and filter

  - User can instantly filter and search for animals.
  - With Algolia.

![alt text](https://i.imgur.com/CL7hgGz.gif)
![alt text](https://i.imgur.com/8JWXiVE.gif)

- Infinite Scroll

  - Seamlessly scroll through results, provides better user experience.

![alt text](https://i.imgur.com/euAYmzA.gif)

- Zhuyin (注音, Mandarin Phonetic Symbols)

  - Provides Zhuyin (Mandarin Phonetic Symbols) for children to read easily.

![alt text](https://i.imgur.com/bOySDJx.gif)

### Other Features

- When the guest logs in after playing several games, all previous records will be kept to the history of the new login user.

- Leaderboard
  - Keeps track of ranking results of different modes and displays on leaderboard.

![alt text](https://i.imgur.com/KP8Ceif.gif)

- USerPage
  - Records previous quiz game result.

![alt text](https://i.imgur.com/hByR9sJ.gif)

---

## Tech

### Reselect

- In order to reduce unnecessary render and improve performance, Reselect was used with Redux to solve it.

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

- Algolia provides search as a service, offering web search across a client's website using an externally hosted search engine.

### Framer Motion

- A animation package.

---

## Flow Charts
