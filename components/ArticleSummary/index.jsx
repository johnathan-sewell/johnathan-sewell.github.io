import styles from "./styles.module.css";
import { longDateFormat } from "../formats";

function ArticleSummary(props) {
  const { article } = props;
  return (
    <article className={styles.article}>
      <a href={article.route}>
        <h2 className={styles.heading}>{article.title}</h2>
        <p className={styles.preview}>{article.preview}</p>
        <p className={styles.datetime}>
          <time datetime={article.isoDate}>
            {new Date(article.isoDate).toLocaleDateString(
              undefined,
              longDateFormat
            )}
          </time>
        </p>
      </a>
    </article>
  );
}

export default ArticleSummary;
