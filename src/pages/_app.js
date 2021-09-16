import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
