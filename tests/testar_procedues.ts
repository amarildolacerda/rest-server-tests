


const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';






let fav, tokenBase;
if (testar.procedures)
describe('testar procedures', async () => {
    before(async () => {
        tokenBase = await Database.getLogin();
        fav = await Database.getResult("/v3/WBA_CTPROD_FAVORITOS?$filter=codigo eq '_1_'");
    });
    it("WEB_ATUALIZAR_VISUALIZADO", (done) => {
        const rst = fav.result[0];
        Database.getResult("/v3/WEB_ATUALIZAR_VISUALIZADO('_1_',0,1)").then((r) => {
            assert(r.result[0].visualizados == rst.visualizados + 1, 'Nao atualizou por Resource');
            done();
        }).catch((e) => done(e));
    });
});






