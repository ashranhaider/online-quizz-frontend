import { useEffect, useMemo } from "react";
import { Card, Form, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import {
  QuestionTypes,
  type QuestionTypes as QuestionTypesValue,
} from "../types/question";
import QuestionOptionsForm from "./QuestionOptionsForm";

export type QuestionFormValues = {
  questionText: string;
  questionType: QuestionTypesValue;
  isActive: boolean;
  score: number;
  questionOptions?: QuestionOptionFormValues[];
};

export type QuestionOptionFormValues = {
  optionText: string;
  isCorrect: boolean;
};

type QuestionFormProps = {
  initialValues?: QuestionFormValues;
  onSubmit: (values: QuestionFormValues) => Promise<void> | void;
  onReset?: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  validationMessage?: string;
  showSuccess?: boolean;
  resetOnSuccess?: boolean;
};

const defaultValues: QuestionFormValues = {
  questionText: "",
  questionType: QuestionTypes.MultiChoice,
  isActive: true,
  score: 1,
  questionOptions: [],
};

const questionTypeOptions = Object.values(QuestionTypes);

export default function QuestionForm({
  initialValues,
  onSubmit,
  onReset,
  isSubmitting = false,
  submitLabel = "Save Question",
  successMessage = "Question saved successfully.",
  errorMessage,
  validationMessage,
  showSuccess = false,
  resetOnSuccess = false,
}: QuestionFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    defaultValues: initialValues ?? defaultValues,
  });

  const normalizedInitialValues = useMemo(() => {
    if (!initialValues) {
      return undefined;
    }

    return {
      questionText: initialValues.questionText ?? "",
      questionType: initialValues.questionType ?? QuestionTypes.MultiChoice,
      isActive: Boolean(initialValues.isActive),
      score: Number.isFinite(initialValues.score) ? initialValues.score : 0,
      questionOptions: Array.isArray(initialValues.questionOptions)
        ? initialValues.questionOptions.map(option => ({
            optionText: option.optionText ?? "",
            isCorrect: Boolean(option.isCorrect),
          }))
        : [],
    };
  }, [initialValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questionOptions",
  });

  const watchedQuestionType = watch("questionType");
  const shouldShowOptions =
    watchedQuestionType === QuestionTypes.MultiChoice ||
    watchedQuestionType === QuestionTypes.TrueFalse;

  useEffect(() => {
    if (!shouldShowOptions && fields.length > 0) {
      setValue("questionOptions", []);
      clearErrors("questionOptions");
    }
  }, [clearErrors, fields.length, setValue, shouldShowOptions]);

  useEffect(() => {
    if (normalizedInitialValues) {
      reset(normalizedInitialValues);
    } else {
      reset(defaultValues);
    }
  }, [normalizedInitialValues, reset]);

  const handleFormSubmit = async (data: QuestionFormValues) => {
    await onSubmit({
      questionText: data.questionText.trim(),
      questionType: data.questionType,
      isActive: data.isActive,
      score: data.score,
      questionOptions:
        data.questionOptions?.map(option => ({
          optionText: option.optionText.trim(),
          isCorrect: option.isCorrect,
        })) ?? [],
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
              <Form.Group controlId="question-text">
                <Form.Label className="fw-semibold">Question Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="e.g. What is the output of Console.WriteLine(2 + 2)?"
                  isInvalid={!!errors.questionText}
                  {...register("questionText", {
                    required: "Question text is required",
                    minLength: {
                      value: 5,
                      message: "Question text should be at least 5 characters",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.questionText?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="question-type">
                <Form.Label className="fw-semibold">Question Type</Form.Label>
                <Form.Select
                  isInvalid={!!errors.questionType}
                  {...register("questionType", {
                    required: "Question type is required",
                  })}
                >
                  {questionTypeOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.questionType?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="question-score">
                <Form.Label className="fw-semibold">Score</Form.Label>
                <Form.Control
                  type="number"
                  step="0.5"
                  min="0"
                  isInvalid={!!errors.score}
                  {...register("score", {
                    valueAsNumber: true,
                    required: "Score is required",
                    min: {
                      value: 0,
                      message: "Score must be 0 or more",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.score?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {validationMessage && (
              <Col xs={12}>
                <Alert variant="danger" className="mb-0">
                  {validationMessage}
                </Alert>
              </Col>
            )}

            <Col xs={12}>
              <Form.Check
                type="switch"
                label="Make question active"
                {...register("isActive")}
              />
            </Col>

            {shouldShowOptions && (
              <Col xs={12}>
                <QuestionOptionsForm
                  fields={fields}
                  register={register}
                  errors={errors}
                  append={append}
                  remove={remove}
                  setValue={setValue}
                />
              </Col>
            )}

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
              <div className="d-flex justify-content-start align-items-center gap-2 pt-3">

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
                {onReset && (
                  <Button
                    variant="secondary"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      reset(defaultValues);
                      onReset();
                    }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
