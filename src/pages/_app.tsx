import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";


function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
