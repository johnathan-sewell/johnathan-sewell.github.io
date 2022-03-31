import styles from "./styles.module.css";
import { longDateFormat } from "../formats";

function PostSummary(props) {
  const { post } = props;
  return (
    <article className={styles.article}>
      <a href={post.route} className={styles.link}>
        <h2 className={styles.heading}>{post.title}</h2>
        <p className={styles.preview}>{post.preview}</p>
        <p className={styles.datetime}>
          <time dateTime={post.isoDate}>
            {new Date(post.isoDate).toLocaleDateString(
              undefined,
              longDateFormat
            )}
          </time>
        </p>
      </a>
    </article>
  );
}

export default PostSummary;
