import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '@/main/app/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </QueryClientProvider>
    );
}
