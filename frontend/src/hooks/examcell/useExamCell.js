import { useContext } from "react";
import { ExamCellContext } from "../../context/examcell/ExamCellContext";

function useExamCell() {
  return useContext(ExamCellContext);
}

export default useExamCell;