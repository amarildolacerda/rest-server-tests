
//import { FirebirdCommand } from '../src/v3_firebird';
import { Database } from './comum/database';
import { testar } from './comum/parametros';
var assert = require('assert');

if (testar.acentos)
describe('Testar login', () => {
    before(async () => {
        await Database.getLogin();
    });
    it('put acentos', (done) => {
        const nome = 'Alcólicos' + (new Date()).toString().substring(15, 24);
        let r = Database.putResult('/v3/ctgrupo',
            { "grupo": "1", "nome": nome }
            ).then((r) => {
                //console.log(r);
                return Database.getResult("/v3/ctgrupo?$select=nome&$filter=grupo eq '1'").then((rsp) => {
                    console.log(rsp.result[0].nome ,nome)
                    //const passou = rsp.result[0].nome == FirebirdCommand.limpar(nome);
                    //if (!passou) console.log('retornou:',rsp.result[0].nome,'esperado:',FirebirdCommand.limpar(nome));
                    //assert(passou, 'não gravou o assento: ' + rsp.result[0].nome);
                    return done();
                });
            }).catch((e) => { done(e) });

    });
});
