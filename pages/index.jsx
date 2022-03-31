import Layout from "../components/Layout";
import { post as singleBatch } from "../components/content/SingleBatchExperiment";
import { post as specificationByExample } from "../components/content/SpecificationByExample";
import Header from "../components/Header";
import PostSummary from "../components/PostSummary";

function byDate(a, b) {
  if (a.isoDate < b.isoDate) return 1;
  if (a.isoDate > b.isoDate) return -1;
  return 0;
}

const posts = [singleBatch, specificationByExample].sort(byDate);

function HomePage() {
  return (
    <>
      <Header isHome />
      <Layout>
        {posts.map((post) => (
          <PostSummary key={post.route} post={post} />
        ))}
      </Layout>
    </>
  );
}

export default HomePage;
