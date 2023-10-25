import { withHeadingId } from "./utils";

export function H1({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
      {withHeadingId(children, id)}
    </h1>
  );
}
