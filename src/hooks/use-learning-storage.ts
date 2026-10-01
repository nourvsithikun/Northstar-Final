"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  getCompletedLessonIds,
  getEnrolledCourseIds,
  getRecentCourseIds,
} from "@/lib/learning-storage";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("northstar:storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("northstar:storage", callback);
  };
}

const emptySnapshot = "[]";

function useStoredList(getValue: () => string[]) {
  const getSnapshot = useCallback(() => JSON.stringify(getValue()), [getValue]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot);
  return JSON.parse(snapshot) as string[];
}

export function useEnrolledCourseIds() {
  return useStoredList(getEnrolledCourseIds);
}

export function useRecentCourseIds() {
  return useStoredList(getRecentCourseIds);
}

export function useCompletedLessonIds(courseId: string) {
  const getValue = useCallback(() => getCompletedLessonIds(courseId), [courseId]);
  return useStoredList(getValue);
}
