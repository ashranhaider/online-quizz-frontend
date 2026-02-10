import { Card, Form, Row, Col, Button, Alert } from "react-bootstrap";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { QuestionFormValues } from "./QuestionForm";

type QuestionOptionsFormProps = {
  fields: { id: string }[];
  register: UseFormRegister<QuestionFormValues>;
  errors: FieldErrors<QuestionFormValues>;
  append: (value: {
    optionText: string;
    isCorrect: boolean;
  }) => void;
  remove: (index: number) => void;
  setValue: UseFormSetValue<QuestionFormValues>;
};

export default function QuestionOptionsForm({
  fields,
  register,
  errors,
  append,
  remove,
  setValue,
}: QuestionOptionsFormProps) {
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1 fw-semibold">Question Options</h6>
          <p className="text-muted mb-0">
            Optional answers for multi-choice or true/false questions.
          </p>
        </div>
        <Button
          variant="outline-primary"
          type="button"
          onClick={() =>
            append({
              optionText: "",
              isCorrect: false,
            })
          }
        >
          Add Option
        </Button>
      </div>

      {fields.length === 0 && (
        <Alert variant="light" className="border mb-0">
          No options added yet.
        </Alert>
      )}

      {fields.map((field, index) => (
        <Card key={field.id} className="border">
          <Card.Body>
            <Row className="g-3">
              <Col xs={12} md={8}>
                <Form.Group controlId={`option-text-${field.id}`}>
                  <Form.Label className="fw-semibold">Option Text</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. 4"
                    isInvalid={!!errors.questionOptions?.[index]?.optionText}
                    {...register(`questionOptions.${index}.optionText`, {
                      required: "Option text is required",
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.questionOptions?.[index]?.optionText?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Check
                    type="switch"
                    label="Mark as correct"
                    {...register(`questionOptions.${index}.isCorrect`, {
                      onChange: event => {
                        if (event.target.checked) {
                          fields.forEach((_, optionIndex) => {
                            if (optionIndex !== index) {
                              setValue(
                                `questionOptions.${optionIndex}.isCorrect`,
                                false,
                                { shouldDirty: true }
                              );
                            }
                          });
                        }
                      },
                    })}
                  />
                  <Button
                    variant="outline-danger"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
