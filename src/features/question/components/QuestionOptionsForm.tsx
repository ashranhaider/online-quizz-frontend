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
  const handleAddOption = () => {
    append({
      optionText: "",
      isCorrect: false,
    });
  };

  return (
    <Card className="border">
      <Card.Body className="d-flex flex-column gap-3">
        <div>
          <h6 className="mb-1 fw-semibold">Question Options</h6>
          <p className="text-muted mb-0">
            Optional answers for multi-choice or true/false questions.
          </p>
        </div>

        {fields.length === 0 && (
          <Alert variant="light" className="border mb-0">
            No options added yet. Use the add button to create the first option.
          </Alert>
        )}

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border rounded p-2 bg-light"
          >
            <Row className="g-2 align-items-center">
              <Col xs={12} md={6}>
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

              <Col xs={12} md={3}>
                <Form.Label className="fw-semibold d-block">Correct</Form.Label>
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
              </Col>

              <Col xs={12} md={3} className="d-flex">
                <Button
                  variant="outline-danger"
                  type="button"
                  onClick={() => remove(index)}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </div>
        ))}

        <div>
          <Button variant="outline-primary" type="button" onClick={handleAddOption}>
            {fields.length > 0 ? "Add another option" : "Add option"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
