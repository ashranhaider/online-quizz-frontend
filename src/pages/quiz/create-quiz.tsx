import { useNavigate } from "react-router-dom";
import QuizForm, { type QuizFormValues } from "../../features/quizzes/components/QuizForm";
import { useCreateQuiz } from "../../features/quizzes/hooks/useCreateQuiz";
import { toastService } from "../../shared/services/toast.service";

function CreateQuiz() {
  const createQuizMutation = useCreateQuiz();
  const navigate = useNavigate();

  const handleCreateQuiz = async (values: QuizFormValues) => {
    await createQuizMutation.mutateAsync(values);
    toastService.success("Quiz created successfully.");
    navigate("/admin/quiz");
  };

  return (
    <>
      {/* Header */}
      <div className="container-fluid mb-4">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-5">
            <div className="mb-3">
              <h1 className="h4 mb-1 fw-semibold">Create New Quiz</h1>
              <p className="text-muted mb-0">
                Enter the basic details to set up your quiz. You can add questions in the next step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-5">
            <QuizForm
              onSubmit={handleCreateQuiz}
              isSubmitting={createQuizMutation.isPending}
              errorMessage={(createQuizMutation.error as Error | undefined)?.message}
              submitLabel="Save & Continue"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuiz;
