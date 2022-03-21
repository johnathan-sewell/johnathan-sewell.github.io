// used to inject global CSS in one place
import "./styles.css";

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
