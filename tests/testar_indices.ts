const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { Database } from './comum/database';
import { testar } from './comum/parametros';

if (testar.chave_primaria)
    describe('Testar requisitos de chave primarias', () => {
        before(async () => {
            await Database.getLogin();
        });
        it('checa sigcaut1 removeu ID da chave primaria', (done) => {
            Database.getResult('/v3/primarykey/sigcaut1').then((rsp) => {
                assert(rsp.rows > 0, 'não leu a primary key tabela');
                const n = rsp.result.indexOf('id');
                if (n >= 0)
                    console.log('ordem:', n, 'Necessário alterar a primary key da sigcaut1 removendo o ID para evitar falha na exclusão de item. O ID não é conhecido ao inserir um item e já tentar excluí-lo em seguida.');
                assert(n < 0, 'não removeu o id da chave primaria');
                //, 'não removeu o id da chave primaria'); //< 0, 'não pode ter o ID na primary key da tabela, mudar a primary key');
                done();
            }).catch((e) => { console.log('não respondeu'); done(e); });
        });
        it('testar se foi adicionado a coluna ID', (done) => {
            Database.getResult('/v3/fields/sigcaut1').then((rsp) => {
                var n = rsp.result.indexOf('id');
                if (n < 0) console.log('A tabela sigcaut1 não contem a coluna ID');
                assert(n >= 0, 'não encontrei o ID na tabela sigcaut1');
                done();

            }).catch((e) => { console.log(e); done(e) });
        });
    });


let token;
// criar teste para refazer estatisticas de indices
if (testar.indices)
    describe('Testar indices', () => {


        before(async () => {
            token = await Database.getLogin();
        });


        it('testar atualiação estatisticas', (done) => {
            Database.postResult('/rdb/reset/index/PK_ACGRUPO', {}).then((rsp) => {
                // console.log(rsp);
                expect(rsp.rows).to.be.equal(1);
                done();
            }
            ).catch((e) => { done(e); });
        })
        it('testar atualiação estatisticas de indice que nao existe', (done) => {
            Database.postResult('/rdb/reset/index/PK_ACGRUPOS', {}).then((rsp) => {
                //console.log(rsp);
                expect(rsp.rows).to.be.equal(0);
                done();
            }
            ).catch((e) => { done(); });
        })

    }
    );