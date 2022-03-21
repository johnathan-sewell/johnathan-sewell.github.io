import Layout from "../components/Layout";
import { article as singleBatch } from "../components/content/SingleBatchExperiment";
import Header from "../components/Header";
import ArticleSummary from "../components/ArticleSummary";

const articles = [singleBatch];

function HomePage() {
  return (
    <>
      <Header isHome />
      <Layout>
        {articles.map((article) => (
          <ArticleSummary article={article} />
        ))}
      </Layout>
    </>
  );
}

export default HomePage;
