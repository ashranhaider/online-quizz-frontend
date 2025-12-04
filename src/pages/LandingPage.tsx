import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [quizCode, setQuizCode] = useState("");

  // OPTION B — Automatic detection of quiz URL or quiz code
  useEffect(() => {
    // check "?quizId=XXXXX"
    const quizIdFromParam = searchParams.get("quizId");
    if (quizIdFromParam) {
      navigate(`/quiz/${quizIdFromParam}`, { replace: true });
      return;
    }

    // check "?q=XXXXX"
    const q = searchParams.get("q");
    if (q) {
      navigate(`/quiz/${q}`, { replace: true });
      return;
    }

    // check "?link=https://myapp.com/quiz/XXXXX"
    const link = searchParams.get("link");
    if (link && link.includes("/quiz/")) {
      const parts = link.split("/quiz/");
      const extractedId = parts[1];
      if (extractedId) {
        navigate(`/quiz/${extractedId}`, { replace: true });
        return;
      }
    }
  }, [navigate, searchParams]);

  // OPTION A — Enter Quiz Code manually
  const handleStartQuiz = () => {
    if (!quizCode.trim()) return;
    navigate(`/quiz/${quizCode.trim()}`);
  };

  return (
    <div className="container d-flex flex-column align-items-center mt-5">

      <h1 className="fw-bold mb-3">Welcome to Online Quiz Platform</h1>
      <p className="lead text-muted mb-4">
        Enter the quiz code or use your quiz link to begin.
      </p>

      {/* Enter Quiz Code */}
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <label className="form-label fw-semibold">Enter Quiz Code</label>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="e.g. ABCD1234"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
        />
        <button className="btn btn-primary w-100" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>

      {/* Admin Login */}
      <button
        className="btn btn-outline-secondary mt-4"
        onClick={() => navigate("/login")}
      >
        Admin Login
      </button>
    </div>
  );
}
