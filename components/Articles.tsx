import React from "react";
import { IArticlesProps } from "../interfaces";
import NextLink from "next/link";
import { Box, Badge, Heading } from "@chakra-ui/react";
import styles from "../styles/app.module.scss";

const colorMap: { [key: string]: string } = {
  cloud: "blue",
  default: "grey",
  frontend: "purple",
  mobile: "green",
};

const Articles = ({ files, heading, excludedTags }: IArticlesProps) => {
  const articleList = files.map((f, i) => {
    const badges: string[] = f.matterData.tags.split(",");
    if (excludedTags && badges.some((r) => excludedTags.includes(r))) {
      return null;
    }
    const url = `/blog/${f.name.replace(".md", "")}`;
    return (
      <NextLink key={i} href={url}>
        <a>
          <Box
            className={styles.articleBox}
            w={[320, 360, 660, 660]}
            cursor="pointer"
          >
            {f.matterData.title}
            {badges
              ? badges.map((b, i) => {
                  return (
                    <Badge key={i} colorScheme={colorMap[b]} ml={5}>
                      {b}
                    </Badge>
                  );
                })
              : null}
          </Box>
        </a>
      </NextLink>
    );
  });
  return (
    <Box p={[50, 50, 50, 50]} textAlign="center">
      <Heading mb={5}>{heading}</Heading>
      {articleList}
    </Box>
  );
};

export default Articles;
