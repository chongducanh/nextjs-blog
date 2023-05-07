import { createClient } from "next-sanity";
import Link from "next/link";
import styles from  '../styles/Blog.module.css';

export default function Home({ post }) {
  return (
    <>
      <header>
        <h1>Sanity Posts</h1>
      </header>
      <main>
        <h2>All Posts</h2>
        {post.length > 0 && (
          <ul>
            {post.map((post) => (
              <li key={post._id}>{post?.title}</li>
            ))}
          </ul>
        )}
        {!post.length > 0 && <p>No pets to show</p>}
        {!post.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}

        <Link className={styles.link} href="/blog">See blog here</Link>
      </main>
    </>
  );
}

const client = createClient({
  projectId: "jfwywhzz",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false
});

export async function getStaticProps() {
  const post = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      post
    }
  };
}