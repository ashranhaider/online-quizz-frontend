import { Button, Modal } from "react-bootstrap";
import type { Question } from "../types/question";

type QuestionDeleteModalProps = {
  show: boolean;
  isDeleting?: boolean;
  question?: Question | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function QuestionDeleteModal({
  show,
  isDeleting = false,
  onCancel,
  onConfirm,
}: QuestionDeleteModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title>Delete question?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this question? This action cannot be
        undone.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onCancel}
          disabled={isDeleting}
        >
          No
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Yes, delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
