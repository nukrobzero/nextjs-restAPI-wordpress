import { GetStaticProps } from "next";
import Link from "next/link";

interface Props {
  posts: any;
}

export default function Home({ posts }: Props) {
  return (
    <>
      <main>
        <h1>WORDPRESS REST API DEMO</h1>
        <ul>
          {posts?.map((post: any, idx: any) => (
            <li key={idx}>
              <Link href={`/${post.id}`}>{post?.title?.rendered}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

const API_URL = process.env.WORDPRESS_API_URL;

export const getStaticProps: GetStaticProps = async () => {
  const result = await fetch(`${API_URL}`);
  const posts = await result.json();
  return {
    props: { posts, revalidate: 10 },
  };
};
