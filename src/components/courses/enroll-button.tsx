"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useEnrolledCourseIds } from "@/hooks/use-learning-storage";
import { saveEnrolledCourse } from "@/lib/learning-storage";

export function EnrollButton({ courseId, hasLessons }: { courseId: string; hasLessons: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const enrolledCourseIds = useEnrolledCourseIds();
  const isEnrolled = state === "success" || enrolledCourseIds.includes(courseId);

  async function enroll() {
    setState("loading");
    setMessage("");

    try {
      const response = await fetch(`/api/courses/${encodeURIComponent(courseId)}/enroll`, {
        method: "POST",
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(payload.message || "Enrollment was not completed.");

      saveEnrolledCourse(courseId);
      setState("success");
      setMessage("You’re enrolled. This course is now in My learning on this device.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Enrollment was not completed.");
    }
  }

  if (isEnrolled) {
    return (
      <div className="enroll-result">
        {hasLessons ? (
          <Link className="button button-primary button-wide" href={`/learn/${courseId}`}>
            Continue learning <Icon name="arrow-right" />
          </Link>
        ) : (
          <button className="button button-disabled button-wide" type="button" disabled>
            Enrolled · Lessons coming soon
          </button>
        )}
        {message && <p className="form-success" role="status">{message}</p>}
      </div>
    );
  }

  return (
    <div className="enroll-result">
      <button
        className="button button-primary button-wide"
        type="button"
        disabled={state === "loading"}
        onClick={enroll}
      >
        {state === "loading" ? "Enrolling…" : "Enroll for free"}
        {state !== "loading" && <Icon name="arrow-right" />}
      </button>
      {state === "error" && <p className="form-error" role="alert">{message}</p>}
    </div>
  );
}
