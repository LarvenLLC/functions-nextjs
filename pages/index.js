import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js on Firebase Hosting</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <h1 className="title">
          Welcome to{" "}
          <a href="https://github.com/jthegedus/firebase-gcp-examples">
            Next.js on Firebase
          </a>
        </h1>

        <ul>
          <li>Static page with client-side data fetching</li>
          <li>
            <a href="https://swr.now.sh/" target="_blank">
              SWR
            </a>{" "}
            is used to retrieve data from Firestore
          </li>
        </ul>

        <p className="description">An index page for a personal site</p>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
