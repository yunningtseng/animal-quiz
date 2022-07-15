import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import {
  fetchResponseAndQuestions,
  ResultState,
} from '../../store/resultSlice';
import RecordBody from './RecordBody';

function ResultRecorder() {
  const resultState: ResultState = useAppSelector((state) => state.result);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchResponseAndQuestions());
  }, [dispatch]);

  if (resultState.questionList.length === 0) {
    return <div className="text-secondary font-bold px-5 mt-10">未作答任何題目，下次請努力!</div>;
  }

  return (
    <div className="border rounded-lg mt-5 shadow-md px-3 md:px-10 pt-3">
      {resultState.response.records.map((record, index) => (
        <RecordBody
          key={index}
          record={record}
          question={resultState.questionList[index]}
        />
      ))}
    </div>
  );
}

export default ResultRecorder;
