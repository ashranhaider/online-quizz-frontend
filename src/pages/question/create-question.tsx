import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import QuestionForm, {
  type QuestionFormValues,
} from "../../features/question/components/QuestionForm";
import QuestionTable from "../../features/question/components/QuestionTable";
import { useCreateQuestion } from "../../features/question/hooks/useCreateQuestion";
import { useQuestions } from "../../features/question/hooks/useQuestions";
import { toastService } from "../../shared/services/toast.service";

function CreateQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const createQuestionMutation = useCreateQuestion();
  const questionsQuery = useQuestions(quizId);

  const parsedQuizId = useMemo(() => {
    const value = Number(quizId);
    return Number.isFinite(value) ? value : null;
  }, [quizId]);

  const handleCreateQuestion = async (values: QuestionFormValues) => {
    if (!parsedQuizId) {
      return;
    }

    await createQuestionMutation.mutateAsync({
      ...values,
      quizzId: parsedQuizId,
    });

    toastService.success("Question created successfully.");
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
              onSubmit={handleCreateQuestion}
              isSubmitting={createQuestionMutation.isPending}
              errorMessage={(createQuestionMutation.error as Error | undefined)?.message}
              submitLabel="Save Question"
              resetOnSuccess
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
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuestion;
