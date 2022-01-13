import 'mocha';
import { config, log, logInDev } from '../../src/config';
//import { FbMonitor } from '../../src/monitor';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';
import { fetch } from '../../src/fetch';
import { parametros } from './parametros';

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;


let loginToken;

export class Database {

    static get restserver() { return parametros.restserver; }
    static async token() {
        if (loginToken == undefined) {
            return await Database.getLogin(parametros.conta);
        }
        else
            return loginToken;
    }
    static get conta() { return parametros.conta; }
    static encodeBase64(texto: string): string {
        let buffer = Buffer.from(texto, 'utf8');
        return buffer.toString('base64');
    }

    static async getResult(path, conta?, tk?, connection?): Promise<any> {
        return new Promise((resolve, reject) => {
            let r;
            try {
                const p = this.createOptions(path, 'GET', conta || parametros.conta, tk,connection);
               
                return fetch(p.uri, p).then((data) => {
                    // if (config.debug)
                    //     console.log(path, 'OK', Object.values(data)[0]);
                    //console.log(data);
                    return resolve(data);
                }).catch((e) => {
                   // console.log('Error:', path, e);
                    return reject({ error: e.message });
                });
            } catch (e) {
                return reject({ cmd: path, resp: r, error: e.message });
            }
        });

    }

    static async deleteResult(path, body, conta?, tk?) {
        let o = this.createBody(path, 'DELETE', body, conta, tk);
        return await fetch(o.uri, o);

    }

    static async putResult(path: string, body: any, conta?, tk?): Promise<any> {
        let o = this.createBody(path, 'PUT', body, conta, tk);
        return await fetch(o.uri, o);
    }

    static async postResult(path, body, conta?) {
        let o = this.createBody(path, 'POST', body, conta);
        return await fetch(o.uri, o);

    }
    static async executePatch(cmd, conta?): Promise<any> {
        const m = '/v3/execute?$command=' + cmd;
        return await fetch(m, this.createOptions(m, 'PATCH', conta));
    }

    static async getExecuteProcedure(cmd, conta?): Promise<any> {
        const m = '/v3/execute?$command=' + cmd;
        return await fetch(m, this.createOptions(m, 'GET', conta));
    }
    static async command(cmd, conta?): Promise<any> {
        const m = '/v3/command';
        let opt = this.createBody(m, 'POST', conta);
        opt['body'] = { command: cmd };
        //console.log(m,opt);
        return await fetch(m, opt);
    }

    static getLogin(conta?): Promise<any> {
        if (loginToken == undefined) {
            return Database.getLoginNoCache(conta).then((tk) => {
               // console.log(tk)
                loginToken = tk;
            });
        } else return Promise.resolve(loginToken);
    }

    static getLoginNoCache(conta, usuario?, senha?, connection?): Promise<any> {
        const tk = 'Basic ' + this.encodeBase64((usuario || parametros.usuario) + ':' + (senha || parametros.senha));
        return new Promise((resolve, reject) => {
            return Promise.all([this.getResult('/v3/login', conta, tk, connection).then((r) => {
                return resolve('Bearer ' + r.token);
            }).catch((e) => { return reject(e); })
            ]);
        });
    }




    static createBody(path, method = 'POST', body, conta?, tk?) {
        var r = this.createOptions(path, method, conta, tk);
        r['body'] = body;
        r['json'] = true;
        return r;
    }


    static createOptions(path, method = 'GET', conta?, tk?, connection?) {
        const options = {
            method: method,
            simple: false,
            uri: `${parametros.restserver}${path}`,
            headers: {
                "contaid": conta || parametros.conta,
                "authorization": tk || loginToken,
                "db-driver": parametros.driver || 'fb',
            },
            timeout: 5000,
            gzip: true,
            json: true
        }

        if (parametros.connection != undefined)
            options.headers['db-connection'] = parametros.connection;
        if (connection != undefined)
            options.headers['db-connection'] = connection;

        return options;
    }


    static checkRows(path, value): Promise<any> {
        return Database.getResult(path).then((rsp) => {
            if (rsp.rows != value)
                console.log(path, 'retornou:', rsp.rows, 'esperado:', value, 'retorno: ', rsp);
            if (rsp.rows != value)
                return Promise.reject(`Não retornou dado esperado rows=${value}: ${JSON.stringify(rsp)} em: ${path}`);
            return Promise.resolve(rsp);
        });
    }

    static async genAdminToken() {
        if (adminToken != undefined) return Promise.resolve(adminToken);
        const tk = 'Basic ' + this.encodeBase64('sysdba' + ':' + 'masterkey');
        return await Database.getResult('/sys/login', parametros.conta, tk).then((rsp) => {
            adminToken = 'Bearer ' + rsp.token;
            // console.log(adminToken);
            return Promise.resolve(adminToken);
        });
    }


    static getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


}
let adminToken;


export const print = function (tx) {
    console.log(tx);
    return tx;
}
