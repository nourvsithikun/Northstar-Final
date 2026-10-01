import { NextResponse } from "next/server";
import { ApiError } from "@/lib/api/client";
import { courseApi } from "@/lib/api/courses";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await courseApi.enroll(id);
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof ApiError ? error.status : 502;
    const message =
      error instanceof Error
        ? error.message
        : "The course could not be enrolled in right now.";

    return NextResponse.json({ message }, { status });
  }
}
