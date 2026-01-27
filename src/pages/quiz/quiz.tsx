import { useMemo, useState, type ChangeEvent } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  type ColDef,
  type ValueGetterParams,
} from "ag-grid-community";
import useQuizList from "../../features/quizzes/hooks/useQuiz";
import type { Quiz } from "../../features/quizzes/types/quiz";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { Alert } from "react-bootstrap";
import "ag-grid-community/styles/ag-theme-quartz.css";


function Quizzes() {
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError, error } = useQuizList({
    page,
    size: pageSize,
  });

  const quizzes = data?.quizzes ?? [];
  const totalCount = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

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
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  const handlePageChange = (nextPage: number) => {
    const safePage = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(safePage);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextSize = Number(event.target.value);
    setPageSize(nextSize);
    setPage(1);
  };

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
      <Alert
        variant="danger"
        dismissible
        onClose={() => setShowError(false)}
      >
        <Alert.Heading>Error</Alert.Heading>
        {showError && (error as Error).message}
      </Alert>
    );
  }


  return (
    <>
      <h1 className="h3 mb-3">Quiz</h1>
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
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressPaginationPanel
              />
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3">
            <div className="text-muted small">
              Page {page} of {totalPages} ({totalCount} total)
            </div>
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
              >
                Next
              </button>
            </div>
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Rows per page</span>
              <select
                className="form-select form-select-sm"
                value={pageSize}
                onChange={handlePageSizeChange}
                style={{ width: "auto" }}
              >
                {[10, 20, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Quizzes;
