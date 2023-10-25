import {
  getBaseHubPostBySlug,
  getBaseHubPostsMeta,
} from "@/app/basehub/queries";
import { PostRenderer } from "@/app/basehub/rich-text";

export async function generateStaticParams() {
  const posts = await getBaseHubPostsMeta();

  return posts.map(post => ({
    slug: post._slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getBaseHubPostBySlug(slug);

  return (
    <>
      <PostRenderer blocks={post.content.json.blocks}>
        {post.content.json.content}
      </PostRenderer>
    </>
  );
}
