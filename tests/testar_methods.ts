
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';


if (testar.methods)
    describe('teste de methods', () => {
        before(async () => {
            await Database.getLogin();
        });
    
    /*    it('testar GET', (done) => {
            Database.getResult('/v3/estoper?$top=1').then((rsp) => {
                assert.equal(rsp.rows, 1);
                done();
            }).catch((e) => done(e));
        });
*/
        it('testar delete com restrição para apagar o registro', (done) => {
            Database.deleteResult('/v3/ctgrupo', { grupo: '001' }).then((rsp) => {
                //console.log(rsp)
                expect(rsp.rows).to.equal(0);
                done('é esperado erro que o servidor nao conseguiu executar o delete');
            }).catch((e) => { //console.log(e);
                 expect(1).equal(1); done(); });
        });

        it('testar delete registro permitido', (done) => {
            Database.deleteResult('/v3/ctrl_id', { nome: 'teste_v3' }).then((rsp) => {
                done();
            }).catch((e) => { done(e) });

        });
        it('testar inserir novo registro', (done) => {
            const key = 'test_v' + Database.getRandomArbitrary(10, 100).toString();
            Database.deleteResult('/v3/ctrl_id', { nome: key }).then((rsp) => {
                assert(rsp.rows == 0 || rsp.rows == 1, 'esperado 1 o nenhum registro');
                Database.postResult('/v3/ctrl_id', { nome: key, numero: 1 }).then((rsp) => {
                    assert.equal(rsp.rows, 1);
                    Database.getResult(`/v3/ctrl_id?$filter=nome eq '${key}'`).then((rsp) => {
                        assert.equal(rsp.rows, 1);
                        assert.equal(1, rsp.result[0]['numero']);
                        Database.deleteResult('/v3/ctrl_id', { nome: key }).then((rsp) => {
                        });
                        done();

                    }).catch((e) => done(e));

                }).catch((e) => { done(e); });

            }).catch((e) => { done(e); });
        });


        it('testar alteracao registro', (done) => {
            Database.getResult("/v3/ctrl_id?$filter=nome eq 'teste_v3A'").then((rsp) => {
                var numero = 0;
                assert(rsp.rows == 0 || rsp.rows == 1, 'esperado 1 o nenhum registro');
                if (rsp.rows == 1) numero = rsp.result[0]['numero'] + 1;
                //console.log(numero,rsp);
                Database.putResult('/v3/ctrl_id', { nome: 'teste_v3A', numero: numero }).then((rsp) => {
                    assert.equal(rsp.rows, 1);
                    Database.getResult("/v3/ctrl_id?$filter=nome eq 'teste_v3A'").then((rsp1) => {
                       // console.log(rsp1)
                        assert.equal(rsp1.rows, 1);
                        assert.equal(numero, rsp1.result[0]['numero']);
                        done();
                    }).catch((e) => done(e));
                }).catch((e) => { done(e); });

            }).catch((e) => { done(e); });
        });

        /*
        it('testar patch',(done)=>{
            Database.getResult("/v3/ctrl_id?$filter=nome eq 'teste_v3B'").then((rsp) => {
                var numero = 0;
                assert(rsp.rows == 0 || rsp.rows == 1, 'esperado 1 o nenhum registro');
                if (rsp.rows == 1) numero = rsp.result[0]['numero']+1;
                Database.executePatch( "obter_id( 'teste_v3B')").then((rsp) => {
                    assert.equal(rsp.rows, 1);
                }).catch((e) => { done(e); });
    
            }).catch((e) => { done(e); });
    
        })
    */


    });