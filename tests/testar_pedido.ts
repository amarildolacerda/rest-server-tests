const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';


let tokenBase;

if (testar.pedido)
    describe('teste PEDIDO', () => {
        before(async () => {
            tokenBase = await Database.getLogin();
        });
        var pedido = {
            dadosvenda: {
                pedido: '4852',
                itensCount: 1,
                total: 10.0,
                vendedor: '',
                data: '2020-03-09T00:00:00.000'
            },
            cliente: {
                codigo: 0.0,
                nome: '',
                cnpj: null,
                cep: null,
                ender: null,
                estado: null,
                celular: '', fone: '',
                email: null,
                cpfna_nota: 'N',
                cidade: null, bairro: null, compl: null,
                numero: null
            },
            items: [
                {
                    codigo: '1', unidade: null, nome: null, obs: null,
                    qtde: 1.0, preco: 10.0, ordem: 1, valor: 10.0
                }
            ],
            entrega: {
                ender: null, cep: null,
                cidade: null, estado: null, numero: null,
                fonecontato: null, email: null, referencia: null,
                restricao: null
            },
            pagamento: [
                {
                    id: '1', ordem: 1, operacao: '111',
                    vcto: '2020-03-09T00:00:00.000', valor: 10.0,
                    dcto: '4852/1',
                    gid: null,
                    complemento: null
                }]
        };

        const event = new Date();
        pedido.dadosvenda.pedido = `${event.getFullYear() - 2000}${event.getMonth()}${event.getDate()}${event.getMinutes()}${event.getSeconds()}`;


        //console.log('Numero Pedido', ex);
        //if (inserirPedidoNovo)
        it('NOVO PEDIDO DE VENDA', (done) => {
            Database.postResult('/v3/pedido/registrar', pedido).then((rsp) => {
                expect(rsp.result.length).equal(rsp.rows);
                expect(rsp.rows, '1'); done();
            }).catch((e) => {
                done(e);
            });


        });

        it('testar lock sigcauth-1', (done) => {
            Database.getResult('/v3/sigcauth?$top=1').then((rsp) => {
                assert(rsp.rows>0,'nao retornou linha de pedido'); 
                expect(rsp.result.length).equal(rsp.rows);
                var pedido = rsp.result[0];
                Database.command(
                    `update sigcauth 
                    set cliente = 0, filialretira = ${pedido.filial}, 
                    qtdepessoa = 1, 
                    operador = '10', 
                    lote = ${pedido.lote}
                     where dcto = '${pedido.dcto}'  
                     and data = '${pedido.data.substring(0,10)}'  
                     and lote = ${pedido.lote}  and filial = ${pedido.filial}`).then((rsp) => {
                      //  console.log(rsp);
                        done();
                    }).catch((e) => { console.log(e); done(e); });
            }).catch((e) => { console.log(e); done(e); });
        })

        // testar lock sigcauth-1
        it('testar totalizar pedido', (done) => {
            Database.getResult('/v3/sigcauth?$top=1').then((rsp) => {
                assert(rsp.rows>0,'nao retornou linha de pedido');
                var pedido = rsp.result[0];
                Database.command(
                    `execute procedure WEB_REG_PEDIDO_TOTALIZA(1,'2021-12-30','35863001',58994)`).then((rsp) => {
                            //console.log(rsp);
                            expect(rsp.result.length).equal(rsp.rows);
                            done();
                        }).catch((e) => { console.log(e); done(e); });
            }).catch((e) => { console.log(e); done(e); });
        })



        it('testar lock sigcauth-2', (done) => {
            Database.getResult('/v3/sigcauth?$top=1').then((rsp) => {
                assert(rsp.rows>0,'nao retornou linha de pedido'); 
                var pedido = rsp.result[0];
                Database.command(
                    `update sigcauth 
                    set cliente = 0, filialretira = ${pedido.filial}, 
                    qtdepessoa = 1, 
                    operador = '10', 
                    lote = ${pedido.lote}
                     where dcto = '${pedido.dcto}'  
                     and data = '${pedido.data.substring(0,10)}'  
                     and lote = ${pedido.lote}  and filial = ${pedido.filial}`).then((rsp) => {
                        //console.log(rsp);
                        done();
                    }).catch((e) => { console.log(e); done(e); });
            }).catch((e) => { console.log(e); done(e); });
        })

    });
