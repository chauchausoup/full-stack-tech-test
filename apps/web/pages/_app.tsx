import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';

import '../src/assets/styles/tailwind.css';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
