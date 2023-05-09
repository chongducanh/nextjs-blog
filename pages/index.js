import { createClient } from "next-sanity";
import Link from "next/link";
import styles from '../styles/Blog.module.css';
import {useState, useEffect} from "react"
import ReactPaginate from 'react-paginate';


function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
             <li key={item._id}>{item?.title}</li>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, posts }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = posts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(posts.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
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

        <PaginatedItems itemsPerPage={4} posts={post} />
      </main>
    </>
  );
}

const client = createClient({
  projectId: "jfwywhzz",
  dataset: "production",
  apiVersion: "2021-03-25",
  useCdn: false,
  token: 'sknep3Z9yRgvMhfy77ZjEfNkk3dYGeyritvY8eL6sdlp08HcdKXMSEFJ9UakzmlUepiZyRnyJpwEMbQDapLkmI3jeuBiFva3VCjX6sUb38BCcQoNc1ikEGDEuw8eNkXApjSHrAub5zX3faIKTOJcOsBAR4WX71zAMMIApmn63xvOEI9S4EHT'
});

export async function getStaticProps() {
  const post = await client.fetch(`*[_type == "post"]`);

  return {
    props: {
      post
    }
  };
}