import Layout from '../components/Layout';
import 'remixicon/fonts/remixicon.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
