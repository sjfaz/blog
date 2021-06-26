import React, { ReactNode } from "react";
import Head from "next/head";
import Nav from "./Nav";
import { Box, Flex } from "@chakra-ui/react";
import Config from "../blog-config";

interface ILayoutProps {
  children?: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({
  children,
  title = "JSCloudDev blog",
  description = "NextJS Blog site with posts from Shaun Farrell.",
}: ILayoutProps) => (
  <>
    <Head>
      <title>
        {title}
        {` | ${Config.blogName}`}
      </title>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/images/logo-orange.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/images/logo-orange.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/images/logo-orange.png"
      />
    </Head>
    <Flex
      className="maxHeight"
      direction="column"
      align="center"
      alignItems="stretch"
    >
      <Box>
        <Nav />
      </Box>
      <Box w="100%" flex="1" m="0 auto">
        {children}
      </Box>
      <Box className="footer">© 2020 {Config.blogName}</Box>
    </Flex>
  </>
);

export default Layout;
