"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";

interface CourseThumbnailProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export function CourseThumbnail({
  src,
  alt,
  priority = false,
  className = "",
}: CourseThumbnailProps) {
  const [failed, setFailed] = useState(!src);

  return (
    <div className={`course-thumbnail ${className}`}>
      {failed ? (
        <div className="thumbnail-fallback" aria-label={`${alt} image unavailable`}>
          <Icon name="book" />
          <span>Northstar course</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
