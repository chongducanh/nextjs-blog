import Head from "next/head"
import styles from "../styles/Home.module.css"
import Layout from "../component/layout";
import { getStoryblokApi } from "@storyblok/react"
import { storyblokInit, apiPlugin, StoryblokComponent, useStoryblokState } from "@storyblok/react";
 
storyblokInit({
  accessToken: "daet11jdVvEI2gOnpOchBQtt",
  apiOptions: {
    region: "us",
  },
  use: [apiPlugin]
});
 

 
export default function Home({ story }) {
    story = useStoryblokState(story);
   
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <Layout>
        {/* <StoryblokComponent blok={story.content} /> */}
      </Layout>
      </div>
    );
  }
   
  export async function getStaticProps() {
    let slug = "home";
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
      revalidate: 3600,
    };
  }