
import { config } from "./config";
import { registerError } from "./error.handle";

const got = require('got');

export const fetch = function (uri: string, options: any): Promise<any> {
    let opt;

    return new Promise((resolve, reject) => {

        try {
            opt = {
                method: options.method,
            };

            if ((options.body))
                opt.json = (typeof options.body) == 'string' ? JSON.parse(options.body) : options.body;

            if (options.headers)
                opt.headers = ((typeof options.headers) == 'string') ? JSON.parse(options.headers) : options.headers;

            if (options.json)
                opt.responseType = 'json';

            if (config.inDev)
                console.log(opt);


            if (opt.method == 'PATCH') {
                // TODO: nao fucnionou
                const instance = got.extend(opt);
                return instance(uri).then((rsp) => {
                    return resolve(rsp.body);
                }).catch((e) => {
                    return reject({ message: e.response.body.error || e.response.body.message || e.response.body });
                });
            }

            if (opt.method == 'POST')
                if (options.uri) uri = options.uri;
            //console.log('got',uri,opt);
            return got(uri, opt).then((rsp) => {
                return resolve(rsp.body);
            }).catch((e) => {
                const msg = {
                    url: uri,
                    statusCode: e.response.statusCode,
                    statusMessage: e.response.statusMessage,
                    method: opt.method,
                    message: e.response.body.error || e.response.body.message || e.response.body
                }
                if (config.inDev)
                    console.log(msg);
                return reject(msg);
            });

        } catch (e) {
            registerError('', e);
            reject(e);
        }
    });
}
