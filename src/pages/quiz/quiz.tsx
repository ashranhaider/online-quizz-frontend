import { Alert } from "react-bootstrap";
import useQuizList from "../../features/quizzes/hooks/useQuiz";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { useState } from "react";

function Quizzes() {
  
  const [showError, setshowError] = useState(true);
  const { data, isLoading, isError, error } = useQuizList({
    page: 1,
    size: 10,
  });

  if (isLoading)
    return (
      <>
        <h1 className="h3 mb-3">Quiz</h1>
        <div className="card shadow-none border-0 rounded-0">
          <div className="card-body">All quizzes</div>
          <div style={{ padding: 16 }}>
            <SkeletonLoader rows={5} columns={3} rowHeight={18} gap={12} />
          </div>
        </div>
      </>
    );

  if (isError) {
    return (
      <Alert variant="danger" onClose={() => setshowError(false)} dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>
          {showError && (error as Error).message}
        </p>
      </Alert>
    );
  }
  const quizzes = data?.quizzes ?? [];

  return (
    <>
      <h1 className="h3 mb-3">Quiz</h1>

      <div className="card shadow-none border-0 rounded-0">
        <div className="card-body">All quizzes</div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unique URL</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz.id}>
                <td>{quiz.name}</td>
                <td>{quiz.uniqueURL}</td>
                <td>{quiz.isActive ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Quizzes;