"use client";

import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

export function Rating({
  value,
  onChange,
  readOnly = false,
  size = 150,
}: {
  value: number;
  onChange?: React.Dispatch<number>;
  readOnly?: boolean;
  size?: number;
}) {
  //   const [rating, setRating] = useState(0);

  return (
    <ReactRating
      readOnly={readOnly}
      style={{ maxWidth: size }}
      value={value}
      onChange={onChange}
    />
  );
}
