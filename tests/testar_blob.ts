const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { doesNotReject } from 'assert';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Database } from './comum/database';
import { testar } from './comum/parametros';


let tokenBase;

if (testar.blob)
    describe('Testar operações com Blob', () => {
        before(async () => {
            tokenBase = await Database.getLogin();
        });
        it('Testar leitura blob', async () => {
            await Database.command ("update ctprod set  obs2 = 'teste' where codigo eq '1' and obs2 ne 'teste'"); 
            const result = await Database.getResult("/v3/ctprod?$filter=codigo eq '1'&$top=1&$select=obs2");
            expect(result.result[0].obs2).equal('teste');
        });
    });