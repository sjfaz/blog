import Hero from "../../components/Hero";
import Layout from "../../components/Layout";
import { IArticlesProps, IPath } from "../../interfaces";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Articles from "../../components/Articles";
import Config from "../../blog-config";
import { GetStaticPaths } from "next";
import { useRouter } from "next/router";

const PostsPage = ({ files }: IArticlesProps) => {
  const router = useRouter();
  const { tag } = router.query;
  const tagString = typeof tag === "string" ? tag : "posts";
  const filteredFiles = files.filter((f) =>
    f.matterData.tags.includes(tagString)
  );
  const nameCapitalized =
    tagString.charAt(0).toUpperCase() + tagString.slice(1);
  return (
    <Layout
      title={`${nameCapitalized}`}
      description={`A list of posts relating to ${nameCapitalized}.`}
    >
      <Hero title={`${nameCapitalized}`} slim={true} />
      <Articles files={filteredFiles} heading="" />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  // Paths we always want because this is top menu options
  const paths: IPath[] = Config.topMenuTags.map((t) => ({
    params: { tag: t.name },
  }));
  const reducer = (acc: IPath[], curr: string) => {
    const markdownWithMetadata = fs
      .readFileSync(path.join("posts", curr))
      .toString();
    const parsedMarkdownData = matter(markdownWithMetadata).data;
    const tags: string[] = parsedMarkdownData.tags.split(",");
    //Only consider tags not inside the accumulated array
    const filteredTags = tags.filter(
      (nt) => !acc.some((et) => et.params.tag === nt)
    );
    let newTags: IPath[] = filteredTags.map((t) => ({ params: { tag: t } }));
    return [...acc].concat(newTags);
  };
  const combinedPaths = files.reduce(reducer, paths);
  return { paths: combinedPaths, fallback: false };
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

export default PostsPage;
