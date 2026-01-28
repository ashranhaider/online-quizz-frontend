import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  themeQuartz,
  type ColDef,
  type ValueGetterParams,
} from "ag-grid-community";
import { Link } from "react-router-dom";
import useQuizList from "../../features/quizzes/hooks/useQuiz";
import type { Quiz } from "../../features/quizzes/types/quiz";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { Alert } from "react-bootstrap";


function Quizzes() {
  const { data, isLoading, isError, error } = useQuizList();

  const quizzes = Array.isArray(data?.quizzes) ? data.quizzes : [];

  const columnDefs = useMemo<ColDef<Quiz>[]>(
    () => [
      { headerName: "Name", field: "name" },
      { headerName: "Unique URL", field: "uniqueURL" },
      {
        headerName: "Active",
        valueGetter: (params: ValueGetterParams<Quiz, string>) =>
          params.data?.isActive ? "Yes" : "No",
      },
    ],
    []
  );

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      minWidth: 160,
      sortable: false,
      filter: true,
      resizable: true,
    }),
    []
  );
  if (isLoading) {
    return (
      <>
        <h1 className="h3 mb-3">Quiz</h1>
        <div className="card border-0">
          <div className="card-body">All quizzes</div>
          <div className="p-3">
            <SkeletonLoader rows={5} columns={3} rowHeight={18} gap={12} />
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        {(error as Error).message}
      </Alert>
    );
  }


  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <h1 className="h3 mb-0">Quiz</h1>
        <Link to="/admin/quiz/create-quiz" className="btn btn-primary">
          Create Quiz
        </Link>
      </div>
      <div className="card border-0">
        <div className="card-body">All quizzes</div>
        <div className="px-3 pb-3">
          <div className="border rounded bg-white shadow-sm overflow-hidden">
            <div
              className="ag-theme-quartz"
              style={{ height: 500, width: "100%" }}
            >
              <AgGridReact
                rowData={quizzes}
                theme={themeQuartz}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                 pagination={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Quizzes;
