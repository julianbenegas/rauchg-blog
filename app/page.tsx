import { Posts } from "./posts";
import { getBaseHubPostsMeta } from "./basehub/queries";

export const revalidate = 60;

export default async function Home() {
  const posts = await getBaseHubPostsMeta();
  return <Posts posts={posts} />;
}
