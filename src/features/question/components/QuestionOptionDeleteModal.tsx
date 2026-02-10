import { Button, Modal } from "react-bootstrap";
import type { QuestionOption } from "../types/question";

type QuestionOptionDeleteModalProps = {
  show: boolean;
  isDeleting?: boolean;
  option?: QuestionOption | null;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function QuestionOptionDeleteModal({
  show,
  isDeleting = false,
  onCancel,
  onConfirm,
}: QuestionOptionDeleteModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton={!isDeleting}>
        <Modal.Title>Delete option?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this option? This action cannot be
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
