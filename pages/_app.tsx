import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/main.css";
import "../styles/product.css";
import "../styles/responsive.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import Main from "../components/_main";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Main Component={Component} pageProps={pageProps} />
        </Provider>
    );
}

export default MyApp;
