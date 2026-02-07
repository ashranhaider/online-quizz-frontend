import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Alert } from "react-bootstrap";
import QuizForm, { type QuizFormValues } from "../../features/quizzes/components/QuizForm";
import { useEditQuiz } from "../../features/quizzes/hooks/useEditQuiz";
import { getQuizByIdApi } from "../../features/quizzes/api/quiz-requests";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { toastService } from "../../shared/services/toast.service";

function EditQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const editQuizMutation = useEditQuiz();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuizByIdApi(quizId ?? ""),
    enabled: !!quizId,
  });

  const initialValues = useMemo<QuizFormValues | undefined>(() => {
    if (!quiz) {
      return undefined;
    }

    return {
      name: quiz.name ?? "",
      uniqueURL: quiz.uniqueURL ?? "",
      isActive: Boolean(quiz.isActive),
      timeAllowed: typeof quiz.timeAllowed === "number" ? quiz.timeAllowed : 0,
    };
  }, [quiz]);

  const handleEditQuiz = async (values: QuizFormValues) => {
    if (!quizId) {
      return;
    }

    await editQuizMutation.mutateAsync({ id: quizId, ...values });
    toastService.success("Quiz updated successfully.");
    navigate("/admin/quiz");
  };

  if (!quizId) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Invalid quiz</Alert.Heading>
        Quiz id is missing.
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <>
        <h1 className="h3 mb-2">Edit Quiz</h1>
        <p className="text-muted mb-3">Update quiz details below.</p>
        <SkeletonLoader rows={4} columns={1} rowHeight={18} gap={12} />
      </>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        {(error as Error).message}
      </Alert>
    );
  }

  return (
    <>
      <h1 className="h3 mb-2">Edit Quiz</h1>
      <p className="text-muted mb-3">Update quiz details below.</p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-5">
            <QuizForm
              initialValues={initialValues}
              onSubmit={handleEditQuiz}
              isSubmitting={editQuizMutation.isPending}
              errorMessage={(editQuizMutation.error as Error | undefined)?.message}
              submitLabel="Save Changes"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditQuiz;
