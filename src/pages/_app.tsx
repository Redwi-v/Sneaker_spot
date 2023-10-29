import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { store } from '@/main/app/store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { ConfigProvider } from 'antd';
import { theme } from '../../tailwind.config';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
                        colorBgElevated: theme.colors['brown'],
                    },
                    InputNumber: {
                        // hoverBorderColor: rgb(255, 64, 64),
                        controlOutline: theme.colors['brown'],
                    },
                },

                token: {
                    colorPrimary: theme.colors['lightBrown'],
                    colorBgBase: theme.colors['orange'],
                    // colorTextBase: theme.colors['white'],
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
