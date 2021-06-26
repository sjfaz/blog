import React from "react";
import { Box } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";
import Layout from "../../components/Layout";
import Hero from "../../components/Hero";
import styles from "../../styles/blog.module.scss";

interface IPost {
  htmlString: string;
  data: any;
}

const Post: React.FC<IPost> = ({ htmlString, data }): React.ReactElement => {
  return (
    <Layout title={data.title}>
      <Hero title={data.title} slim={true}></Hero>
      <Box mx={[5, 10, 50, 100]} mt={10}>
        <div
          className={styles.blog}
          dangerouslySetInnerHTML={{ __html: htmlString }}
        />
      </Box>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const markdownWithMetadata = fs
    .readFileSync(path.join("posts", params.slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);
  const htmlString = marked(parsedMarkdown.content);
  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
