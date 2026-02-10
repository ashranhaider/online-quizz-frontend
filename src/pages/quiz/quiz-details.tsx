import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Tab, Tabs } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import QuizForm, { type QuizFormValues } from "../../features/quizzes/components/QuizForm";
import { useEditQuiz } from "../../features/quizzes/hooks/useEditQuiz";
import { getQuizByIdApi } from "../../features/quizzes/api/quiz-requests";
import SkeletonLoader from "../../shared/components/SkeletonLoader";
import { toastService } from "../../shared/services/toast.service";
import CreateQuestion from "../question/questions";

const TAB_DETAILS = "details";
const TAB_QUESTIONS = "questions";

function QuizDetails() {
  const { quizId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const editQuizMutation = useEditQuiz();

  const {
    data: quiz,
    isLoading,
    isError,
    error,
    refetch,
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
      timeAllowed: typeof quiz.timeAllowed === "number" ? quiz.timeAllowed : 1,
    };
  }, [quiz]);

  const activeTab =
    searchParams.get("tab") === TAB_QUESTIONS ? TAB_QUESTIONS : TAB_DETAILS;

  const handleTabSelect = (key: string | null) => {
    if (!key) {
      return;
    }

    if (key === TAB_DETAILS) {
      setSearchParams({});
      return;
    }

    setSearchParams({ tab: key });
  };

  const handleEditQuiz = async (values: QuizFormValues) => {
    if (!quizId) {
      return;
    }

    await editQuizMutation.mutateAsync({ id: quizId, ...values });
    toastService.success("Quiz updated successfully.");
    void refetch();
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
        <h1 className="h3 mb-2">Quiz Details</h1>
        <p className="text-muted mb-3">Manage quiz settings and questions.</p>
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
      <div className="d-flex flex-column align-items-start gap-2 mb-2">
        <button
          type="button"
          className="btn btn-secondary btn-sm d-inline-flex align-items-center gap-2"
          onClick={() => navigate("/admin/quiz")}
        >
          <i className="bi bi-arrow-left" />
          Back
        </button>
        <h1 className="h3 mb-0">{quiz?.name ?? "Quiz Details"}</h1>
      </div>
      <p className="text-muted mb-3">Manage quiz settings and questions.</p>

      <Tabs
        id="quiz-details-tabs"
        activeKey={activeTab}
        onSelect={handleTabSelect}
        className="mb-3"
        mountOnEnter
        unmountOnExit={false}
      >
        <Tab eventKey={TAB_DETAILS} title="Details">
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
        </Tab>
        <Tab
          eventKey={TAB_QUESTIONS}
          title={
            <span className="d-inline-flex align-items-center gap-2">
              Questions
              <span className="badge bg-primary-subtle text-primary">
                Manage
              </span>
            </span>
          }
        >
          <CreateQuestion />
        </Tab>
      </Tabs>
    </>
  );
}

export default QuizDetails;
