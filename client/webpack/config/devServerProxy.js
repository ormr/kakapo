import {pathRewrite} from '../utils/helpers';

const httpProxyTarget = {
    port: 3001,
    protocol: 'http',
};

const httpsProxyTarget = {
    port: 443,
    protocol: 'https',
};

export const devServerProxyConfig = {
    '**': {
        target: `${httpProxyTarget.protocol}://localhost:${httpProxyTarget.port}`,
        // pathRewrite: pathRewrite('^/world-time/test', '/api'),
        changeOrigin: true,
        secure: false,
    },
    // '/someurl/test': {
    //     target: `${httpsProxyTarget.protocol}://reqres.in:${httpsProxyTarget.port}`,
    //     pathRewrite: pathRewrite('^/someurl/test', '/api'),
    //     changeOrigin: true,
    //     secure: false,
    // },
};
