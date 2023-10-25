import { Children } from "react";

export function withHeadingId(children, id) {
  if (!id) return children;

  return (
    <span className="relative">
      <a
        className={`
      absolute
      px-3
      -left-[2rem]
      invisible
      [span:hover_&]:visible
      font-mono
      font-normal
      text-gray-400
      hover:text-gray-600
      dark:text-gray-500
      dark:hover:text-gray-400
    `}
        href={`#${id}`}
      >
        #
      </a>

      <a
        id={id}
        className={`
    absolute
    -top-[20px]
  `}
      />
      {children}
    </span>
  );
}
