import { Provider } from "react-redux";

import store from "../app/store";
import "../css/global.css";
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
