
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

let tokenBase;

if (testar.ctrl_id)
    describe('testar operacoes com a ctrl_id', () => {
        before(async () => {

            tokenBase = await Database.getLogin();
        });

        it('postCtrl_id', (done) => {
            const key = `debug_${getRandomArbitrary(1, 20)}`
            Database.deleteResult('/v3/ctrl_id', {
                'nome': key, 'valor': 1
            }).then((r) => {
                expect(r.result.length).equal(r.rows);

                Database.postResult('/v3/ctrl_id', {
                    'nome': key, 'valor': 1
                }).then((r) => {
                    Database.checkRows(`/v3/ctrl_id?$filter=nome eq '${key}'`, 1).then((rsp) => {
                        done();
                    });
                });
            }).catch((e) => {
                done(e);
            });
        });


        it('putResultCtrlID', (done) => {
            const key = `debug_${getRandomArbitrary(21, 30)}`
            Database.putResult('/v3/ctrl_id', {
                'nome': key, 'valor': 2
            }).then((rsp) => {
                expect(rsp.result.length).equal(rsp.rows);

                done();
            })
                .catch((e) => done(e))
        });

        it('postResult CtrlsID', (done) => {
            const key = `debug_${getRandomArbitrary(31, 40)}`

            Database.deleteResult('/v3/ctrl_id', {
                'nome': key, 'valor': 3
            }).then((d) => {
                expect(d.result.length).equal(d.rows);

                Database.postResult('/v3/ctrl_id', {
                    'nome': key, 'valor': 3
                }).then((rsp) => {
                    expect(rsp.result.length).equal(rsp.rows);

                    Database.checkRows(`/v3/ctrl_id?$filter=nome eq '${key}'`, 1).then((rsp) => {
                        done();
                    }).catch((e) => done(e));
                });

            }).catch((e) => done(e));
        })


    });