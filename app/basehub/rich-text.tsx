import { RichText, RichTextProps } from "basehub/react";
import { BaseHubPost } from "./queries";
import { A as a } from "app/(post)/components/a";
import { P as p } from "app/(post)/components/p";
import { H1 as h1 } from "app/(post)/components/h1";
import { H2 as h2 } from "app/(post)/components/h2";
import { H3 as h3 } from "app/(post)/components/h3";
import { OL as ol } from "app/(post)/components/ol";
import { UL as ul } from "app/(post)/components/ul";
import { LI as li } from "app/(post)/components/li";
import { HR as hr } from "app/(post)/components/hr";
import { Code as code } from "app/(post)/components/code";
import { Tweet } from "app/(post)/components/tweet";
import { Image } from "app/(post)/components/image";
import { Figure } from "app/(post)/components/figure";
import { Snippet } from "app/(post)/components/snippet";
import { Caption } from "app/(post)/components/caption";
import { Callout } from "app/(post)/components/callout";
import { YouTube } from "app/(post)/components/youtube";
import { Ref, FootNotes, FootNote } from "app/(post)/components/footnotes";
import { Blockquote as blockquote } from "app/(post)/components/blockquote";

export const PostRenderer = ({
  children,
  blocks,
}: {
  children: RichTextProps["children"];
  blocks: RichTextProps["blocks"];
}) => {
  return (
    <RichText
      blocks={blocks}
      components={{
        a,
        h1,
        h2,
        h3,
        p,
        ol,
        ul,
        li,
        hr,
        code,
        pre: Snippet,
        img: Image as any,
        blockquote,
        TweetComponent: ({ idUrl, caption }) => {
          let id = idUrl;
          try {
            const url = new URL(idUrl); // eg https://twitter.com/swyx/status/1374492662061953034
            id = url.pathname.split("/").pop() as string;
          } catch (error) {
            // noop, it is an ID
          }
          new URL(idUrl);

          return (
            // @ts-expect-error rsc
            <Tweet id={id} caption={caption} />
          );
        },
        // Tweet,
        // Image,
        // Figure,
        // Snippet,
        // Caption,
        // Callout,
        // YouTube,
        // Ref,
        // FootNotes,
        // FootNote,
      }}
    >
      {children}
    </RichText>
  );
};
