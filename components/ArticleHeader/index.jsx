import styles from "./styles.module.css";
import { longDateFormat } from "../formats";

function ArticleHeader(props) {
  const { article } = props;
  return (
    <>
      <h1 className={styles.heading1}>{article.title}</h1>
      <p>
        <time datetime={article.isoDate}>
          {new Date(article.isoDate).toLocaleDateString(
            undefined,
            longDateFormat
          )}
        </time>
      </p>
    </>
  );
}

export default ArticleHeader;
