import { Header } from "./header";
import { getBaseHubPostBySlug } from "../../basehub/queries";

export const revalidate = 60;

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const post = await getBaseHubPostBySlug(params.slug);

  return (
    <article className="text-gray-800 dark:text-gray-300 mb-10">
      <Header post={post} />

      {children}
    </article>
  );
}
