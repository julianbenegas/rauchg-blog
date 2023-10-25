import {
  basehub,
  FieldsSelection,
  PostsItem,
  PostsItemGenqlSelection,
} from "basehub";
import { cache } from "react";
import redis from "../redis";
import { Views } from "../get-posts";
import commaNumber from "comma-number";

export type WithViews<T> = T & { views: number; viewsFormatted: string };

const postMetaSelection = {
  _title: true,
  _slug: true,
  _id: true,
  date: true,
  meta: {
    title: true,
    description: true,
    og: { url: true },
  },
} satisfies PostsItemGenqlSelection;

export type BaseHubPostMeta = FieldsSelection<
  PostsItem,
  typeof postMetaSelection
>;

// todo add the "views" key
export const getBaseHubPostsMeta = cache(
  async (): Promise<Array<WithViews<BaseHubPostMeta>>> => {
    const [query, allViews] = await Promise.all([
      basehub({ next: { revalidate: 1 } }).query({
        index: {
          posts: { items: postMetaSelection },
        },
      }),
      redis.hgetall("views") as Promise<Views | null>,
    ]);

    return query.index.posts.items.map(p => {
      const views = Number(allViews?.[p._slug] ?? "0");
      return { ...p, views, viewsFormatted: commaNumber(views) };
    });
  }
);

const postSelection = {
  ...postMetaSelection,
  content: {
    json: {
      content: true,
      blocks: {
        __typename: true,
        _id: true,
        idUrl: true,
        caption: true,
      },
    },
  },
} satisfies PostsItemGenqlSelection;

export type BaseHubPost = FieldsSelection<PostsItem, typeof postSelection>;

export const getBaseHubPostBySlug = cache(
  async (slug: string): Promise<WithViews<BaseHubPost>> => {
    const [query, viewsQ] = await Promise.all([
      basehub({ next: { revalidate: 1 } }).query({
        index: {
          posts: {
            __args: {
              filter: {
                _sys_slug: { eq: slug },
              },
            },
            items: {
              ...postSelection,
            },
          },
        },
      }),
      redis.hget("views", slug) as Promise<string | null>,
    ]);

    const post = query.index.posts.items[0];
    if (!post) throw new Error(`Post with slug ${slug} not found`);

    const views = Number(viewsQ ?? "0");
    return { ...post, views, viewsFormatted: commaNumber(views) };
  }
);
