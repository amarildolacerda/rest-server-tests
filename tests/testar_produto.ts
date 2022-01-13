const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';


let codigoProduto;
let tokenBase;

if (testar.produto)
describe('teste produto', () => {
    before(async () => {
        tokenBase = await Database.getLogin();
    });
    it('testa se retorna um produto', () => {
        Database.checkRows('/v3/wba_ctprod_precos?$top=1&$filter=precoweb gt 0', 1);
    });
    it('get Codigo Produto', async () => {
        Database.getResult('/v3/wba_ctprod_precos?$top=1&$filter=precoweb gt 0').then((r) => {
            codigoProduto = r.result[0].codigo;
            const filial = r.result[0].filial;
            Database.checkRows(`/v3/wba_ctprod_precos?$filter=codigo eq '${codigoProduto}' and filial eq ${filial}`, 1);
            //console.log(codigoProduto);
        });
    });
});


