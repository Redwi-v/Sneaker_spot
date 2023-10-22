import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '@/main/app/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ConfigProvider } from 'antd';
import { theme } from '../../tailwind.config';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// brown: '#f09958',
// darkBrown: '#6D2518',
// lightBrown: '#863426',

// orange: '#de7b27',
// darkOrange: '#ed772f',
// yellow: '#f2c547',
// beige: '#faddc4',
// white: '#fff',
// lightYellow: '#fbecc6',
// blue: '#211e3b',

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorPrimary: theme.colors['darkBrown'],
                        algorithm: true,
                        colorBgContainer: theme.colors['brown'],
                        optionSelectedBg: theme.colors['lightBrown'],
                        colorBorder: theme.colors['orange'],
                        colorPrimaryHover: theme.colors['beige'],
                        controlOutline: theme.colors['beige'],
                        colorText: theme.colors['white'],
                        colorTextQuaternary: theme.colors['white'],
                    },
                },
            }}
        >
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ConfigProvider>
    );
}
