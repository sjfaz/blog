import React from "react";
import { Box, Flex, useTheme } from "@chakra-ui/react";
import styles from "../styles/app.module.scss";

interface IHeroProps {
  children?: React.ReactNode;
  title?: string;
  slim?: boolean;
}

const Hero = ({ children, title, slim }: IHeroProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <Flex
      p={50}
      mt={5}
      className={styles.hero}
      style={{ backgroundColor: colors.primary["1000"] }}
      align="center"
    >
      <Box
        pb={slim ? 0 : 10}
        className={styles.hero}
        style={{ backgroundColor: colors.primary["1000"] }}
        flexGrow={1}
        textAlign="center"
      >
        <Box w="100%" className={styles.heroBox} textAlign="center">
          {title}
        </Box>
        {children}
      </Box>
    </Flex>
  );
};

export default Hero;
