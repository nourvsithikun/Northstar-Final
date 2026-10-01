"use client";

import { useEffect } from "react";
import { ApiErrorState } from "@/components/ui/api-error";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <section className="section page-state-section"><div className="container"><ApiErrorState /></div></section>;
}
