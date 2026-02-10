import { useMemo, useState } from "react";
import {  useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import QuestionForm, {
  type QuestionFormValues,
} from "../../features/question/components/QuestionForm";
import ConfirmModal from "../../shared/components/ConfirmModal";
import QuestionTable from "../../features/question/components/QuestionTable";
import { useCreateQuestion } from "../../features/question/hooks/useCreateQuestion";
import { useDeleteQuestion } from "../../features/question/hooks/useDeleteQuestion";
import { useDeleteQuestionOption } from "../../features/question/hooks/useDeleteQuestionOption";
import { useEditQuestion } from "../../features/question/hooks/useEditQuestion";
import { useQuestions } from "../../features/question/hooks/useQuestions";
import { toastService } from "../../shared/services/toast.service";
import type { Question, QuestionOption } from "../../features/question/types/question";
import { QuestionTypes } from "../../features/question/types/question";

function CreateQuestion() {
  const { quizId } = useParams();
  const createQuestionMutation = useCreateQuestion();
  const editQuestionMutation = useEditQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const deleteQuestionOptionMutation = useDeleteQuestionOption();
  const questionsQuery = useQuestions(quizId);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showOptionDeleteModal, setShowOptionDeleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<QuestionOption | null>(
    null
  );

  const parsedQuizId = useMemo(() => {
    const value = Number(quizId);
    return Number.isFinite(value) ? value : null;
  }, [quizId]);

  const handleSaveQuestion = async (values: QuestionFormValues) => {
    if (!parsedQuizId) {
      return;
    }

    const shouldIncludeOptions =
      values.questionType === QuestionTypes.MultiChoice ||
      values.questionType === QuestionTypes.TrueFalse;

    if (editingQuestion) {
      await editQuestionMutation.mutateAsync({
        id: editingQuestion.id,
        ...values,
        quizzId: parsedQuizId,
      });
      toastService.success("Question updated successfully.");
      setEditingQuestion(null);
    } else {
      await createQuestionMutation.mutateAsync({
        ...values,
        quizzId: parsedQuizId,
        questionOptions: shouldIncludeOptions
          ? values.questionOptions?.filter(option => option.optionText.trim()) ??
            null
          : null,
      });
      toastService.success("Question created successfully.");
    }

    void questionsQuery.refetch();
  };

  const handleCloseDeleteModal = () => {
    if (!deleteQuestionMutation.isPending) {
      setShowDeleteModal(false);
      setSelectedQuestion(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedQuestion) {
      return;
    }

    await deleteQuestionMutation.mutateAsync(selectedQuestion.id);
    if (editingQuestion?.id === selectedQuestion.id) {
      setEditingQuestion(null);
    }
    setShowDeleteModal(false);
    setSelectedQuestion(null);
    void questionsQuery.refetch();
  };

  const handleCloseOptionDeleteModal = () => {
    if (!deleteQuestionOptionMutation.isPending) {
      setShowOptionDeleteModal(false);
      setSelectedOption(null);
    }
  };

  const handleConfirmOptionDelete = async () => {
    if (!selectedOption) {
      return;
    }

    await deleteQuestionOptionMutation.mutateAsync(selectedOption.id);
    setShowOptionDeleteModal(false);
    setSelectedOption(null);
    void questionsQuery.refetch();
  };

  if (!parsedQuizId) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Invalid quiz</Alert.Heading>
        Quiz id is missing or invalid.
      </Alert>
    );
  }

  return (
    <>
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-6">
            <div className="mb-3">
              <h1 className="h4 mb-1 fw-semibold">Questions</h1>
              <p className="text-muted mb-0">
                Add questions for this quiz and review existing ones below.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <QuestionForm
              initialValues={
                editingQuestion
                  ? {
                      questionText: editingQuestion.questionText ?? "",
                      questionType: editingQuestion.questionType,
                      isActive: editingQuestion.isActive,
                      score: editingQuestion.score,
                      questionOptions:
                        editingQuestion.questionOptions?.map(option => ({
                          optionText: option.optionText ?? "",
                          isCorrect: Boolean(option.isCorrect),
                        })) ?? [],
                    }
                  : undefined
              }
              onSubmit={handleSaveQuestion}
              isSubmitting={
                createQuestionMutation.isPending || editQuestionMutation.isPending
              }
              errorMessage={
                (createQuestionMutation.error as Error | undefined)?.message ||
                (editQuestionMutation.error as Error | undefined)?.message
              }
              submitLabel={editingQuestion ? "Update Question" : "Save Question"}
              resetOnSuccess={!editingQuestion}
              onReset={() => {
                setEditingQuestion(null);
              }}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <QuestionTable
              questions={questionsQuery.data}
              isLoading={questionsQuery.isLoading}
              isError={questionsQuery.isError}
              isFetching={questionsQuery.isFetching}
              error={questionsQuery.error as Error | null}
              onRefresh={() => questionsQuery.refetch()}
              onEdit={(question) => {
                setEditingQuestion(question);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onDelete={(question) => {
                setSelectedQuestion(question);
                setShowDeleteModal(true);
              }}
              onDeleteOption={(optionId) => {
                const option = questionsQuery.data
                  ?.flatMap(question => question.questionOptions ?? [])
                  .find(item => item.id === optionId);
                if (option) {
                  setSelectedOption(option);
                  setShowOptionDeleteModal(true);
                }
              }}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        show={showOptionDeleteModal}
        title="Delete option?"
        body="Are you sure you want to delete this option? This action cannot be undone."
        isPending={deleteQuestionOptionMutation.isPending}
        onCancel={handleCloseOptionDeleteModal}
        onConfirm={handleConfirmOptionDelete}
      />
      <ConfirmModal
        show={showDeleteModal}
        title="Delete question?"
        body="Are you sure you want to delete this question? This action cannot be undone."
        isPending={deleteQuestionMutation.isPending}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default CreateQuestion;
