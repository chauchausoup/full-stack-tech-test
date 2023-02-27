import { AppProps } from 'next/app';

import '../assets/styles/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
