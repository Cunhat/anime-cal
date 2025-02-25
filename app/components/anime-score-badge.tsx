import { cva } from "class-variance-authority";
import React from "react";
import { Badge } from "./ui/badge";

const badgeVariants = cva("", {
  variants: {
    variant: {
      high: "border-transparent bg-green-500 text-white [a&]:hover:bg-green-600 focus-visible:ring-green-200 dark:focus-visible:ring-green-400",
      medium:
        "border-transparent bg-yellow-500 text-white [a&]:hover:bg-yellow-600 focus-visible:ring-yellow-200 dark:focus-visible:ring-yellow-400",
      low: "border-transparent bg-red-500 text-white [a&]:hover:bg-red-600 focus-visible:ring-red-200 dark:focus-visible:ring-red-400",
    },
  },
});

type AnimeScoreBadgeProps = {
  score: number;
};

export default function AnimeScoreBadge({ score }: AnimeScoreBadgeProps) {
  return (
    <Badge
      variant={"default"}
      className={badgeVariants({
        variant: score >= 8 ? "high" : score >= 6 ? "medium" : "low",
      })}
    >
      {score}
    </Badge>
  );
}
