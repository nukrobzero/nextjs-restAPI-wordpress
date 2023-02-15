import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

interface Props {
  post: any;
}

export default function Post({ post }: Props) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <article>
        <h1>{post?.title?.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post?.content?.rendered }} />
      </article>
    </>
  );
}

const API_URL = process.env.WORDPRESS_API_URL;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${API_URL}`);
  const posts = await res.json();

  const paths = posts.map((post: any) => ({
    params: { id: post.id.toString() },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const res = await fetch(
    `${API_URL}/${params.id}`
  );
  const post = await res.json();
  return {
    props: { post },
  };
};
