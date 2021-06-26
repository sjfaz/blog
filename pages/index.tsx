import { Button, Box, Tag } from "@chakra-ui/react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";
import Articles from "../components/Articles";
import NextLink from "next/link";
import matter from "gray-matter";
import { IHomeProps } from "../interfaces";
import fs from "fs";
import path from "path";
import Config from "../blog-config";
// import NextImage from "next/image"; //Does not work with SSG
import styles from "../styles/app.module.scss";

const TagsBox = () => (
  <Box w="100%" className={styles.heroBoxSml} textAlign="center">
    {Config.badges.map((b, i) => {
      return (
        <Tag key={i} mr={1} ml={1} mt={[2, 2, 2, 2]}>
          {b.name}
        </Tag>
      );
    })}
  </Box>
);

const IndexPage = ({ files }: IHomeProps) => {
  return (
    <Layout title="Home">
      <Hero title={Config.blogTitle}>
        <TagsBox />
      </Hero>
      <Articles
        files={files}
        heading="Lastest Articles"
        excludedTags={Config.homeHiddenTags}
      />
      <Box p={5} textAlign="center">
        <NextLink href="/posts">
          <a>
            <Button colorScheme="black" my={15}>
              More...
            </Button>
          </a>
        </NextLink>
      </Box>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync("posts");
  const reducer = (acc: any, curr: string) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join("posts", curr))
      .toString();
    const parsedMarkdownData = matter(markdownWithMetadata).data;
    const obj = { name: curr, matterData: parsedMarkdownData };
    return { ...acc, props: { files: [...acc.props.files, obj] } };
  };

  return files.reduce(reducer, { props: { files: [] } });
};

export default IndexPage;
