import styles from "./styles.module.css";
import { longDateFormat } from "../formats";

function PostHeader(props) {
  const { post } = props;
  return (
    <>
      <h1 className={styles.heading1}>{post.title}</h1>
      <p>
        <time datetime={post.isoDate}>
          {new Date(post.isoDate).toLocaleDateString(undefined, longDateFormat)}
        </time>
      </p>
    </>
  );
}

export default PostHeader;
