import { defaultPort } from '../utils/env';
import {devServerProxyConfig} from './devServierProxy';

export const devServerConfig = {
    client: {
        overlay: false,
    },
    headers: {'Access-Control-Allow-Origin': '*'},
    historyApiFallback: true,
    hot: true,
    port: defaultPort,
    proxy: devServerProxyConfig,
    static: {
        publicPath: '/',
    },
};
