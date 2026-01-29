import { useMemo, useState } from "react";
import {  useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import QuestionForm, {
  type QuestionFormValues,
} from "../../features/question/components/QuestionForm";
import QuestionDeleteModal from "../../features/question/components/QuestionDeleteModal";
import QuestionTable from "../../features/question/components/QuestionTable";
import { useCreateQuestion } from "../../features/question/hooks/useCreateQuestion";
import { useDeleteQuestion } from "../../features/question/hooks/useDeleteQuestion";
import { useEditQuestion } from "../../features/question/hooks/useEditQuestion";
import { useQuestions } from "../../features/question/hooks/useQuestions";
import { toastService } from "../../shared/services/toast.service";
import type { Question } from "../../features/question/types/question";

function CreateQuestion() {
  const { quizId } = useParams();
  const createQuestionMutation = useCreateQuestion();
  const editQuestionMutation = useEditQuestion();
  const deleteQuestionMutation = useDeleteQuestion();
  const questionsQuery = useQuestions(quizId);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const parsedQuizId = useMemo(() => {
    const value = Number(quizId);
    return Number.isFinite(value) ? value : null;
  }, [quizId]);

  const handleSaveQuestion = async (values: QuestionFormValues) => {
    if (!parsedQuizId) {
      return;
    }

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
              onReset={() => setEditingQuestion(null)}
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
            />
          </div>
        </div>
      </div>

      <QuestionDeleteModal
        show={showDeleteModal}
        isDeleting={deleteQuestionMutation.isPending}
        question={selectedQuestion}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default CreateQuestion;
