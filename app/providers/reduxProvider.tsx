import { Provider } from "react-redux";
import { store } from "../store/store";

export function ReduxProvider({
  children,
  pageProps = {},
}: {
  children: React.ReactNode;
  pageProps?: object;
}) {
  //   const { store } = wrapper.useWrappedStore({ pageProps });
  console.log(pageProps);
  return <Provider store={store}>{children}</Provider>;
}
