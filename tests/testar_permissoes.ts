
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { parametros, testar } from './comum/parametros';


const listaTestResources = ['web_produtos',
    'filial',
    'wba_ctprod_favoritos',
    'wba_ctprod_precos',
    'web_clientes',
    'web_usuarios',
    'wba_ctprod_atalho_titulo',
    'wba_ctprod_favoritos',
    'web_produtos_destaque',
    'agenda_recurso',
    'sigcad', 'ctsetor',
    'agenda',
    'agenda_tipo',
    'dummy', 'sigcaut1', 'sigcauth', 'sigcautp',
    'sigflu', 'sigcx', 'sig01', 'sigbco', 'sig02',
    'ctgrupo', 'estmvto', 'estoper'];


const isPut = true;

if (testar.permissoes)
    describe('Testar permissões de acesso', () => {
        before(async () => {
            await Database.getLogin();
        });
        listaTestResources.forEach((item) => {
            it('testando: ' + item, (done) => {
                Database.getResult('/v3/' + item + '?$top=1').then((rsp) => {
                    expect(rsp.rows).to.be.equal(1);
                    expect(rsp.result.length).equal(rsp.rows);

                    done();

                }).catch((e) => {
                    expect().fail('não respondeu');
                    done(e);

                });
            });
        });

        if (testar.permissoes)
            if (isPut)
                it('permissão de alteração na sigcad', (done) => {
                    Database.getResult('/v3/sigcad?$top=1').then((rsp) => {
                        expect(rsp.result.length).equal(rsp.rows);

                        const item = rsp.result[0];
                        const old = item.nome;
                        const novo = 'A  ' + (new Date()).toISOString();
                        item.nome = novo;
                        // console.log(item);
                        Database.putResult('/v3/sigcad', { codigo: 1, nome: novo }).then((rsp) => {
                            done();
                        }).catch((e) => { done(e); });
                    })
                });



        it('testar se a senha é visivel', (done) => {
            Database.getResult('/v3/senhas?$top=1').then((rsp) => {
                assert.equal(rsp.rows, 1);
                assert.equal(rsp.result[0].senha, '*');
                done();
            }).catch((e) => done(e));
        });

        it('memoryUsage', () => {
            Database.getResult('/memoryUsage').then((r) => {
                console.log('memoryUsage -> ', r);
            }).catch((e) => {
                console.log('memoryUsage', e);
            });
        })


    });