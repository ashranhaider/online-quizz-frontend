import { Fragment, useState } from "react";
import { Alert, Badge, Collapse, Table } from "react-bootstrap";
import type { Question } from "../types/question";

type QuestionTableProps = {
  questions?: Question[];
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  error?: Error | null;
  onRefresh?: () => void;
  onEdit?: (question: Question) => void;
  onDelete?: (question: Question) => void;
  onDeleteOption?: (optionId: number) => void;
};

export default function QuestionTable({
  questions,
  isLoading = false,
  isError = false,
  isFetching = false,
  error,
  onRefresh,
  onEdit,
  onDelete,
  onDeleteOption,
}: QuestionTableProps) {
  const total = questions?.length ?? 0;
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (questionId: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

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
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions?.map((question) => (
                  <Fragment key={question.id}>
                    <tr>
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
                      <td className="text-center">
                        <div className="d-inline-flex gap-2">
                          {question.questionOptions &&
                            question.questionOptions.length > 0 && (
                              <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => toggleRow(question.id)}
                                aria-expanded={Boolean(expandedRows[question.id])}
                                aria-controls={`question-options-${question.id}`}
                              >
                                {expandedRows[question.id]
                                  ? "Hide Options"
                                  : "Show Options"}
                              </button>
                            )}
                          <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => onEdit?.(question)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete?.(question)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                    {question.questionOptions &&
                      question.questionOptions.length > 0 && (
                        <tr>
                          <td colSpan={5} className="bg-light p-0 border-0">
                            <Collapse in={Boolean(expandedRows[question.id])}>
                              <div id={`question-options-${question.id}`}>
                                <div className="p-3">
                                  <div className="small fw-semibold text-muted mb-2">
                                    Options
                                  </div>
                                  <div className="table-responsive">
                                    <Table
                                      bordered
                                      hover
                                      size="sm"
                                      className="mb-0 bg-white"
                                    >
                                      <thead>
                                        <tr>
                                          <th style={{ width: "60%" }}>
                                            Option
                                          </th>
                                          <th style={{ width: "20%" }}>
                                            Correct
                                          </th>
                                          <th style={{ width: "20%" }}>
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {question.questionOptions.map(option => (
                                          <tr key={option.id}>
                                            <td>{option.optionText}</td>
                                            <td>
                                              {option.isCorrect ? (
                                                <Badge bg="success" pill>
                                                  Yes
                                                </Badge>
                                              ) : (
                                                <Badge bg="secondary" pill>
                                                  No
                                                </Badge>
                                              )}
                                            </td>
                                            <td>
                                              <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() =>
                                                  onDeleteOption?.(option.id)
                                                }
                                              >
                                                Delete
                                              </button>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      )}
                  </Fragment>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
