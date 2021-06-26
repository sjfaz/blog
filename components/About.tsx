import React from "react";
import NextLink from "next/link";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Config from "../blog-config";
import styles from "../styles/app.module.scss";

const About = () => {
  return (
    <Flex
      align="center"
      justify={["center", "center"]}
      flexDirection={["column", "column", "row"]}
      p={20}
    >
      <Box className={styles.featureBox} width={[320, 360, 660, 660]}>
        <NextLink href={Config.featureOne.link}>
          <a>
            <Heading mb={5}>{Config.featureOne.heading}</Heading>
            {Config.featureOne.subData.map((sd, i) => {
              return (
                <Box key={i} mb={1}>
                  {sd}
                </Box>
              );
            })}
          </a>
        </NextLink>
      </Box>
      <Box
        mt={[5, 5, 0, 0]}
        className={styles.featureBox}
        width={[320, 360, 660, 660]}
      >
        <NextLink href={Config.featureTwo.link}>
          <a>
            <Heading mb={5}>{Config.featureTwo.heading}</Heading>
            {Config.featureTwo.subData.map((sd, i) => {
              return (
                <Box key={i} mb={1}>
                  {sd}
                </Box>
              );
            })}
          </a>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default About;
