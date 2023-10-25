import { basehub } from "basehub";
import { H1 } from "../(post)/components/h1";
import { PostRenderer } from "../basehub/rich-text";
import Image from "next/image";

const AboutPage = async () => {
  const query = await basehub({ next: { revalidate: 1 } }).query({
    about: {
      title: true,
      avatar: {
        url: true,
        width: true,
        height: true,
        alt: true,
      },
      content: {
        json: {
          content: true,
        },
      },
    },
  });

  return (
    <div>
      <H1>{query.about.title}</H1>

      <a href="https://twitter.com/rauchg" target="_blank">
        <Image
          src={query.about.avatar?.url ?? ""}
          alt={query.about.avatar?.alt ?? ""}
          className="rounded-full bg-gray-100 block mt-2 mb-5 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>

      <PostRenderer blocks={[]}>
        {query.about.content?.json.content}
      </PostRenderer>
    </div>
  );
};

export default AboutPage;
