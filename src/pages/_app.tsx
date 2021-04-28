import { ReactElement } from "react";
import "../style.css";

function App({ Component, pageProps }): ReactElement {
  return <Component {...pageProps} />;
}

export default App;
