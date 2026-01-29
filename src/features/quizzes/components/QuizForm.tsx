import { useEffect } from "react";
import { Card, Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";

export type QuizFormValues = {
  name: string;
  uniqueURL: string;
  isActive: boolean;
};

type QuizFormProps = {
  initialValues?: QuizFormValues;
  onSubmit: (values: QuizFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  showSuccess?: boolean;
  resetOnSuccess?: boolean;
};

const defaultValues: QuizFormValues = {
  name: "",
  uniqueURL: "",
  isActive: true
};

export default function QuizForm({
  initialValues,
  onSubmit,
  isSubmitting = false,
  submitLabel = "Save & Continue",
  successMessage = "Quiz saved successfully.",
  errorMessage,
  showSuccess = false,
  resetOnSuccess = false
}: QuizFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<QuizFormValues>({
    defaultValues: initialValues ?? defaultValues
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleFormSubmit = async (data: QuizFormValues) => {
    await onSubmit({
      name: data.name.trim(),
      uniqueURL: data.uniqueURL.trim(),
      isActive: data.isActive
    });

    if (resetOnSuccess) {
      reset(defaultValues);
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="quiz-name">
                <Form.Label className="fw-semibold">Quiz Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. C# Fundamentals Test"
                  isInvalid={!!errors.name}
                  {...register("name", { required: "Quiz name is required" })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Check
                type="switch"
                label="Make quiz active"
                {...register("isActive", { required: false })}
              />
            </Col>

            {errorMessage && (
              <Col xs={12}>
                <Alert variant="danger" className="mb-0">
                  {errorMessage}
                </Alert>
              </Col>
            )}

            {showSuccess && (
              <Col xs={12}>
                <Alert variant="success" className="mb-0">
                  {successMessage}
                </Alert>
              </Col>
            )}

            <Col xs={12}>
              <div className="d-flex justify-content-between align-items-center pt-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : (
                    submitLabel
                  )}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
