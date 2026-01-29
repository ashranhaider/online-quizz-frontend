import { Alert, Badge, Table } from "react-bootstrap";
import type { Question } from "../types/question";

type QuestionTableProps = {
  questions?: Question[];
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
};

export default function QuestionTable({
  questions,
  isLoading = false,
  isError = false,
  isFetching = false,
  error,
  onRefresh,
}: QuestionTableProps) {
  const total = questions?.length ?? 0;

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="h6 mb-1 fw-semibold">Existing Questions</h2>
            <p className="text-muted mb-0 small">{total} total</p>
          </div>
          {onRefresh && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onRefresh}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          )}
        </div>

        {isLoading && <p className="text-muted mb-0">Loading questions...</p>}

        {isError && (
          <Alert variant="danger" className="mb-0">
            {error?.message ?? "Failed to load questions."}
          </Alert>
        )}

        {!isLoading && !isError && total === 0 && (
          <p className="text-muted mb-0">No questions added yet.</p>
        )}

        {!isLoading && !isError && total > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Type</th>
                  <th className="text-center">Score</th>
                  <th className="text-center">Active</th>
                </tr>
              </thead>
              <tbody>
                {questions?.map((question) => (
                  <tr key={question.id}>
                    <td className="text-truncate" style={{ maxWidth: 220 }}>
                      {question.questionText}
                    </td>
                    <td>{question.questionType}</td>
                    <td className="text-center">{question.score}</td>
                    <td className="text-center">
                      <Badge bg={question.isActive ? "success" : "secondary"}>
                        {question.isActive ? "Yes" : "No"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
