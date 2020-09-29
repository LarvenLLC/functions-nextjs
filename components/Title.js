import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import lingo from "lingojs";

import { defaultTitle } from "../pages/_app";

export default function Title(props) {
  const router = useRouter();

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (router?.pathname) {
      setTitle(router.pathname);
    }
  }, [router && router.pathname]);

  return (
    <Head>
      <title>
        Web.{" "}
        {title.length > 1
          ? lingo(title.replace("/", "")).title()
          : defaultTitle}
        {". "}Web.com
      </title>
    </Head>
  );
}
