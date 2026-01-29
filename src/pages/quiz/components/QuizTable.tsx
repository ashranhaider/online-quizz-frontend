import { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  themeQuartz,
  type ColDef,
  type ValueGetterParams,
} from "ag-grid-community";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import type { Quiz } from "../../../features/quizzes/types/quiz";
import { useDeleteQuiz } from "../../../features/quizzes/hooks/useDeleteQuiz";

type QuizTableProps = {
  quizzes: Quiz[];
};

export default function QuizTable({ quizzes }: QuizTableProps) {
  const navigate = useNavigate();
  const deleteQuizMutation = useDeleteQuiz();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

  const handleCopyUrl = useCallback(async (value?: string) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Ignore copy failures silently for now.
    }
  }, []);

  const columnDefs = useMemo<ColDef<Quiz>[]>(
    () => [
      { headerName: "Name", field: "name" },
      {
        headerName: "Unique URL",
        field: "uniqueURL",
        cellRenderer: (params: ValueGetterParams<Quiz, string>) => (
          <div className="d-flex align-items-center gap-2">
            <span className="text-truncate" title={params.data?.uniqueURL}>
              {params.data?.uniqueURL}
            </span>
            <button
              type="button"
              className="btn btn-light btn-sm"
              style={{ width: 32, height: 32 }}
              aria-label="Copy unique URL"
              title="Copy URL"
              onClick={(event) => {
                event.stopPropagation();
                void handleCopyUrl(params.data?.uniqueURL);
              }}
            >
              <i className="bi bi-clipboard" />
            </button>
          </div>
        ),
      },
      {
        headerName: "Active",
        valueGetter: (params: ValueGetterParams<Quiz, string>) =>
          params.data?.isActive ? "Yes" : "No",
      },
      {
        headerName: "Actions",
        colId: "actions",
        maxWidth: 190,
        sortable: false,
        filter: false,
        cellRenderer: (params: ValueGetterParams<Quiz, string>) => (
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm d-inline-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
              aria-label="Edit quiz"
              title="Edit"
              data-quiz-id={params.data?.id}
              onClick={(event) => {
                event.stopPropagation();
                if (params.data?.id) {
                  navigate(`/admin/quiz/${params.data.id}/edit`);
                }
              }}
            >
              <i className="bi bi-pencil" />
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm d-inline-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
              aria-label="Manage questions"
              title="Questions"
              data-quiz-id={params.data?.id}
              onClick={(event) => {
                event.stopPropagation();
                if (params.data?.id) {
                  navigate(`/admin/quiz/${params.data.id}/questions`);
                }
              }}
            >
              <i className="bi bi-list-check" />
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm d-inline-flex align-items-center justify-content-center"
              style={{ width: 32, height: 32 }}
              aria-label="Delete quiz"
              title="Delete"
              data-quiz-id={params.data?.id}
              onClick={(event) => {
                event.stopPropagation();
                if (params.data?.id) {
                  setSelectedQuizId(params.data.id);
                  setShowDeleteModal(true);
                }
              }}
            >
              <i className="bi bi-trash" />
            </button>
          </div>
        ),
      },
    ],
    [handleCopyUrl, navigate]
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

  const handleCloseDeleteModal = () => {
    if (!deleteQuizMutation.isPending) {
      setShowDeleteModal(false);
      setSelectedQuizId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedQuizId) {
      return;
    }

    await deleteQuizMutation.mutateAsync(selectedQuizId);
    setShowDeleteModal(false);
    setSelectedQuizId(null);
  };

  return (
    <>
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

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
        <Modal.Header closeButton={!deleteQuizMutation.isPending}>
          <Modal.Title>Delete quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this quiz? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={handleCloseDeleteModal}
            disabled={deleteQuizMutation.isPending}
          >
            No
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={deleteQuizMutation.isPending}
          >
            {deleteQuizMutation.isPending ? "Deleting..." : "Yes, delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
