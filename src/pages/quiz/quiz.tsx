import { useState } from "react";
import DataTable from "../../shared/components/DataTable";
import useQuizList from "../../features/quizzes/hooks/useQuiz";
import type { Quiz } from "../../features/quizzes/types/quiz";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { Alert } from "react-bootstrap";

function Quizzes() {
  const [showError, setShowError] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); 

  const { data, isLoading, isError, error } = useQuizList({
    page,
    size: pageSize, // ✅ now driven by state
  });

  const quizzes = data?.quizzes ?? [];
  const totalCount = data?.total ?? 0;

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Unique URL", accessor: "uniqueURL" },
    { header: "Active", accessor: (q: Quiz) => (q.isActive ? "Yes" : "No") },
  ] as const;

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
    <DataTable
    style={{
      maxHeight: "500px",
      minHeight: "500px",
      overflowY: "auto",
      maxWidth: "100%"
    }}
      data={quizzes}
      columns={columns as any}
      page={page}
      pageSize={pageSize}
      totalCount={totalCount}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      pageSizeOptions={[10, 20, 50, 100]}
    />
  );
}
export default Quizzes;