import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import Articles from "../../components/Articles";
import matter from "gray-matter";
import path from "path";
import { IArticlesProps } from "../../interfaces";
import Config from "../../blog-config";
import fs from "fs";

const PostsPage = ({ files }: IArticlesProps) => (
  <Layout title="Posts | JSCloudDev">
    <Hero title="Posts" slim={true} />
    <Articles files={files} heading="" excludedTags={Config.homeHiddenTags} />
  </Layout>
);

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

export default PostsPage;
