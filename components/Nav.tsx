import * as React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "../styles/nav.module.scss";
import Config from "../blog-config";
// import NextImage from "next/image"; //Does not work with SSG
import { IMenuItem } from "../interfaces";

const MenuItem: React.FC<IMenuItem> = ({
  children,
  isLast,
  to = "/",
  ...rest
}) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <NextLink href={to}>{children}</NextLink>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="rgb(31, 31, 31)"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="rgb(31, 31, 31)"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Nav = () => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={5}
    >
      <Flex align="center">
        <NextLink href="/">
          <a>
            <Box ml={2}>
              <Heading cursor="pointer" size="xl">
                {Config.blogName}
              </Heading>
            </Box>
          </a>
        </NextLink>
      </Flex>
      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>
      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "center", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[8, 8, 0, 0]}
        >
          {Config.topMenuTags.map((tag, i) => {
            return (
              <MenuItem
                ml={[0, 5, 5, 5]}
                key={i}
                className={styles.navLink}
                to={tag.link}
              >
                {tag.name.toUpperCase()}
              </MenuItem>
            );
          })}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Nav;
