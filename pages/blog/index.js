import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { generatePosts } from "../../helpers/utils";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Only fetch the title and blurb.
const FirestoreBlogPostsURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts?mask.fieldPaths=blurb&mask.fieldPaths=title`;
const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getServerSideProps(context) {
	const data = await fetcher(FirestoreBlogPostsURL);
	const posts = generatePosts(data);

	return { props: { posts } };
}

function Blog(props) {
	const initialData = props.posts;
	const { data } = useSWR(FirestoreBlogPostsURL, fetcher, { initialData });
	// initialData is already transformed, so only transform refetches
	const posts = data.documents ? generatePosts(data) : data;

	return (
		<div className="container">
			<Head>
				<title>Next.js on Firebase Hosting</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
				<h1 className="title">Blog Posts</h1>
				<ul>
					<li>
						SSR page with <code>getServerSideProps()</code>
					</li>
					<li>
						Data fetched from Firestore use{" "}
						<a href="https://swr.now.sh/" target="_blank">
							SWR
						</a>{" "}
						during SSR
					</li>
					<li>
						Re-rendered on <em>each</em> request, so always latest data
					</li>
					<li>New posts will show on hard refresh</li>
					<ul>
						<li>(browsers cache the SSR result for some time)</li>
					</ul>
				</ul>

				<p className="description">Blog Posts</p>
				<div className="grid">
					{data &&
						posts.map((post) => (
							<Link
								href="blog/[pid]"
								as={`/blog/${post.pid}`}
								key={`${post.pid}`}
							>
								<a className="card">
									<h3>{post.title} &rarr;</h3>
									<p>{post.blurb}</p>
								</a>
							</Link>
						))}
				</div>
			</main>

			<Footer />

			<style jsx>{`
				.container {
					min-height: 100vh;
					padding: 0 0.5rem;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				main {
					padding: 5rem 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}

				a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a {
					color: #0070f3;
					text-decoration: none;
				}

				.title a:hover,
				.title a:focus,
				.title a:active {
					text-decoration: underline;
				}

				.title {
					margin: 0;
					line-height: 1.15;
					font-size: 4rem;
				}

				.title,
				.description {
					text-align: center;
				}

				.description {
					line-height: 1.5;
					font-size: 1.5rem;
				}

				code {
					background: #fafafa;
					border-radius: 5px;
					padding: 0.25rem;
					font-size: 1rem;
					font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
						DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
				}

				.grid {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-wrap: wrap;

					max-width: 800px;
					margin-top: 3rem;
				}

				.card {
					margin: 1rem;
					flex-basis: 45%;
					padding: 1.5rem;
					text-align: left;
					color: inherit;
					text-decoration: none;
					border: 1px solid #eaeaea;
					border-radius: 10px;
					transition: color 0.15s ease, border-color 0.15s ease;
				}

				.card:hover,
				.card:focus,
				.card:active {
					color: #0070f3;
					border-color: #0070f3;
				}

				.card h3 {
					margin: 0 0 1rem 0;
					font-size: 1.5rem;
				}

				.card p {
					margin: 0;
					font-size: 1.25rem;
					line-height: 1.5;
				}

				@media (max-width: 600px) {
					.grid {
						width: 100%;
						flex-direction: column;
					}
				}
			`}</style>

			<style jsx global>{`
				main {
					max-width: 800px;
					margin: 20px auto 0px auto;
				}
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
						Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
						sans-serif;
				}

				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
}

export default Blog;
