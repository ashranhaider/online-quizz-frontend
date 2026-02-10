import { Button, Modal } from "react-bootstrap";

type ConfirmModalProps = {
  show: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "primary" | "warning" | "success" | "secondary";
  isPending?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  show,
  title,
  body,
  confirmLabel = "Yes, delete",
  cancelLabel = "No",
  confirmVariant = "danger",
  isPending = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton={!isPending}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel} disabled={isPending}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} disabled={isPending}>
          {isPending ? "Deleting..." : confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
