import Head from "next/head"
import styles from "../styles/Home.module.css"
 
import { getStoryblokApi } from "@storyblok/react"
import { storyblokInit, apiPlugin } from "@storyblok/react";
 
storyblokInit({
  accessToken: "daet11jdVvEI2gOnpOchBQtt",
  apiOptions: {
    region: "us",
  },
  use: [apiPlugin]
});
 

 
export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <header>
        <h1>
          { props.story ? props.story.name : 'My Site' }
        </h1>
      </header>
 
      <main>
        
      </main>
    </div>
  )
}
 
export async function getStaticProps() {
  // home is the default slug for the homepage in Storyblok
  let slug = "home";
 
  // load the draft version
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600, // revalidate every hour
  };
}