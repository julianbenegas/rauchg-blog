"use client";

import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useRef } from "react";
import { ago } from "time-ago";
import useSWR from "swr";
import type { BaseHubPost } from "@/app/basehub/queries";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function Header({ post }: { post: BaseHubPost }) {
  // const segments = useSelectedLayoutSegments();
  // segments can be:
  // date/post
  // lang/date/post
  // const initialPost = posts.find(
  //   post => post.id === segments[segments.length - 1]
  // );
  const { data: viewsData, mutate } = useSWR<{
    views: number;
    viewsFormatted: string;
  }>(`/api/view?id=${post._slug ?? ""}`, fetcher, {
    refreshInterval: 5000,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 dark:text-gray-100">
        {post._title}
      </h1>

      <p className="font-mono flex text-xs text-gray-500 dark:text-gray-500">
        <span className="flex-grow">
          <span className="hidden md:inline">
            <span>
              <a
                href="https://twitter.com/rauchg"
                className="hover:text-gray-800 dark:hover:text-gray-400"
                target="_blank"
              >
                @rauchg
              </a>
            </span>

            <span className="mx-2">|</span>
          </span>

          {/* since we will pre-render the relative time, over time it
           * will diverge with what the user relative time is, so we suppress the warning.
           * In practice this is not an issue because we revalidate the entire page over time
           * and because we will move this to a server component with template.tsx at some point */}
          <span suppressHydrationWarning={true}>
            {post.date} ({ago(post.date, true)} ago)
          </span>
        </span>

        <span className="pr-1.5">
          <Views
            id={post._slug}
            mutate={mutate}
            defaultValue={viewsData?.viewsFormatted}
          />
        </span>
      </p>
    </>
  );
}

function Views({ id, mutate, defaultValue }) {
  const views = defaultValue;
  const didLogViewRef = useRef(false);

  useEffect(() => {
    if ("development" === process.env.NODE_ENV) return;
    if (!didLogViewRef.current) {
      const url = "/api/view?incr=1&id=" + encodeURIComponent(id);
      fetch(url)
        .then(res => res.json())
        .then(obj => {
          mutate(obj);
        })
        .catch(console.error);
      didLogViewRef.current = true;
    }
  });

  return <>{views != null ? <span>{views} views</span> : null}</>;
}
