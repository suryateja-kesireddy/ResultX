import { createContext, useEffect, useState } from "react";
import { getExamCellProfile } from "../../services/examcell/examCellService";

export const ExamCellContext = createContext();

function ExamCellProvider({ children }) {

  const [examCell, setExamCell] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await getExamCellProfile();
      setExamCell(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExamCellContext.Provider
      value={{
        examCell,
        loading,
        loadProfile,
      }}
    >
      {children}
    </ExamCellContext.Provider>
  );
}

export default ExamCellProvider;