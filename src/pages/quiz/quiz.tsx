import { Link } from "react-router-dom";
import useQuizList from "../../features/quizzes/hooks/useQuiz";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { Alert } from "react-bootstrap";
import QuizTable from "./components/QuizTable";

function Quizzes() {
  const { data, isLoading, isError, error } = useQuizList();

  const quizzes = Array.isArray(data?.quizzes) ? data.quizzes : [];

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
      <QuizTable quizzes={quizzes} />
    </>
  );
}
export default Quizzes;
