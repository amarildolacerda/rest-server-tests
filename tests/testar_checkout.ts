const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { fixMetadata } from 'node-firebird-driver-native/dist/lib/fb-util';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Base64 } from '../src/base64';
import { Database, print } from './comum/database';
import { testar } from './comum/parametros';
const mocha = require('mocha');

let tokenBase;

const dados = {
    "codigo": 61001,
    "filial": 1,
    "ie": "",
    "nome": "Ambiente teste de homolog", "contato": "", "tipo": "CONSUMIDOR", "ender": "Brag.Pta",
    "numero": "", "cidad": "bragança", "estado": "SP",
    "bairro": "centro", "cep": "09910-470", "cpfna_nota": "N", "fone": "", "compl": "",
    "email": "amarildo.lacerda@wbagestao.com",
    "celular": "(11)998446982",
    "cnpj": "05351151804"
};

if (testar.cliente)
    describe('Cadastro de Checkout', async () => {
        before(async () => {
            tokenBase = await Database.getLogin();
           // Database.getLogin();
        });

        // testar login para o checkout
        it('testar login checkout', async () => {
            var tk = 'Basic '+Base64.encode('checkout:' + Database.conta);
           var rsp = await Database.getResult('/v3/login', Database.conta, tk)
          //  console.log(rsp);
            assert.isNotNull(rsp.token);
           
        });

        it('checa celular vazio', (done) => {
            //Database.getLogin();
            Database.deleteResult('/v3/sigcad', dados).then((r) => {
                const d = dados;
                d.celular = '';
                Database.postResult('/v3/cliente/celular', d).then((rsp: any) => {
                    console.log('Nao esperado: -----------> ', rsp);
                    done({ message: 'não é esperado retornar algum dado' });
                }).catch((e) => {
                    assert.notEmpty(e.message);
                    done();
                });
            });
        });
        it('celular ja existe', (done) => {
            //setTimeout(done,15000);
            // Database.getLogin();
            const d = dados;
            d['celular'] = '(11)99844-6982';
            Database.postResult('/v3/cliente/celular', d).then((rsp: any) => {
                //console.log(rsp);
                assert.equal(rsp.rows, 1);
                done();
            }).catch((e) => {
                console.log('Falhou: ', e.message);
                done(e);
            });
        });

        it('email ja existe', (done) => {
            // Database.getLogin();
            Database.postResult('/v3/cliente/celular', dados).then((rsp: any) => {
                //console.log(rsp);
                expect(rsp.rows, 1);
                expect(rsp.result[0].codigo).is.not.null;
                done();
                //console.log('sucesso'); // DONE: ok funcionanado
            }).catch((e) => {
                done(e);
            });
        });

        it('testar se esta lendo coluna computed', (done) => {
            //Database.getLogin();
            Database.getResult('/v3/fields/sigcad').then((rsp) => {
                // console.log('computed:',rsp);
                assert(rsp.rows > 0, 'não retornou colunas para a tabela');
                expect(rsp.result.length).equal(rsp.rows);
                const nome_upper = rsp.result.indexOf('nome_upper');
                const codigo = rsp.result.indexOf('codigo');
                //console.log(codigo,nome_upper);
                assert(nome_upper == -1, 'colunas computed não podem estar disponvieis para update/insert');
                assert(codigo >= 0, 'não é um cadastro válido');
                done();
            }).catch((e) => { console.log(e); done(e); });
        });


        it('testar se esta fazendo update em coluna computed', (done) => {
            let d = dados;
            d['nome_upper'] = 'a testar';
            Database.getLogin();
            Database.putResult('/v3/sigcad', d).then((rsp) => {
                assert.equal(rsp.rows, 1);
                expect(rsp.result.length).equal(rsp.rows);
                Database.getResult(`/v3/sigcad?$filter=codigo eq ${dados.codigo} `).then((row) => {
                    //console.log(rsp,row);
                    assert.equal(row.rows, 1);
                    expect(rsp.result.length).equal(rsp.rows);
                    const nome = row.result[0]['nome_upper'] || '?';
                    assert(nome != '?', 'não voltou o nome convertido  nome_upper');
                    assert.equal(d.nome.toUpperCase(), row.result[0]['nome_upper'].toUpperCase());
                    done();
                }).catch((e) => done(e));
            }).catch((e) => done(e));
        });

    });
