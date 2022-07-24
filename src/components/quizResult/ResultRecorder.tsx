import { createSelector } from 'reselect';
import { useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import RecordBody from './RecordBody';

const resultSelector = createSelector(
  (state: RootState) => state.result.questionList,
  (state: RootState) => state.result.response.records,
  (questionList, records) => ({
    questionList,
    records,
    length: questionList.length,
  }),
);

function ResultRecorder() {
  const { questionList, records, length } = useAppSelector(resultSelector);

  if (length === 0) {
    return (
      <div className="text-secondary font-bold px-5 mt-10">
        未作答任何題目，下次請努力!
      </div>
    );
  }

  return (
    <div className="border rounded-lg mt-5 shadow-md px-3 md:px-10 pt-3">
      {records.map((record, index) => (
        <RecordBody
          key={index}
          record={record}
          question={questionList[index]}
        />
      ))}
    </div>
  );
}

export default ResultRecorder;
