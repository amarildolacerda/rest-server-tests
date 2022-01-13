
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { isRegExp } from 'util';
import { Database } from './comum/database';
import { parametros, testar } from './comum/parametros';

let token;

const monProcessos = ['scan','statements','attachments','database','transactions'];
const sysProcessos = ['cpu', 'osInfo', 'memory', 'currentLoad'];


if (testar.monitor){
describe('teste SYS methods', () => {

    before(async () => {
        token = await Database.genAdminToken();
    });

    sysProcessos.forEach((item) => {
        it(item, (done) => {
            Database.getResult('/sys/' + item).then((rsp) => {
              //  expect(rsp.result.length).equal(0);
//console.log(rsp);
                done();
            }).catch((e) => done(e));
        })
    });



    monProcessos.forEach((item) => {
        it(item, (done) => {
            Database.getResult('/mon/' + item).then((rsp) => {
                done();
            }).catch((e) => done(e));
        })
    });
    it('memory', async () => {
        Database.getResult('/mon/memory_usage?$select=max(mon$memory_used) as mon$memory_used', parametros.conta, token).then((r) => {
            let v = 0;
            r.result.forEach(item => {
                if (item['mon$memory_used'] > v)
                    v = item['mon$memory_used'];
            });
            console.log('Memória usada: ',v);
            //assert(v > 100000000, 'Usando muita memoria... checar ');

        }).catch((e) => {
            console.log('memoryUsage', e);
        });
    });

    // testar /sys/login para verificar se o token está sendo gerado corretamente
    it('testar gerar token',  (done) => {
        Database.getResult('/sys/login', parametros.conta, token).then((r) => {
            expect(r.token).to.be.a('string');
            expect(r.ok).to.be.true;
            done();
        }).catch((e) => {
            done(e);
            console.log('login', e);
        });
    });
    
});
}