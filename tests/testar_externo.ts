








const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { Database } from './comum/database';
import { testar } from './comum/parametros';


const connection = 'Bearer eyJ0eXBlIjoiZGJhIiwicm9sZSI6InB1YmxpY3dlYiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFd01qZ3lNREkyTWpZMkxDSmtZWFJoSWpwN0ltTnZiblJoSWpvaWMzUnZjbVVpTENKMWMzVmhjbWx2SWpvaWQySmhJaXdpYzJWdWFHRWlPaUozWW1FaUxDSnliMnhsSWpvaWNIVmliR2xqZDJWaUlpd2lZMjl1Ym1WamRHbHZiaUk2SW14dlkyRnNhRzl6ZEM4ek1EVXdPbk4wYjNKbElpd2laSEpwZG1WeUlqb2labUlpTENKa1lYUmhJam9pTWpBeU1pMHdNUzB4TTFReU1qb3lORG95Tmk0NE1qTmFJbjBzSW1saGRDSTZNVFkwTWpFeE1qWTJObjAuTVhxU2JMYWFGS0dPU25qXy1zaldlMzB6RnhuZjlsQ3FCVXllVE0zNmZKSSJ9';



if (testar.externo)
    describe('Testar roteamento para banco externo', () => {
        before(async () => {
            await Database.getLogin();
        });
        it('testar conta diferente do connectionString', (done) => {
            try {
                Database.getResult('/v3/filial', undefined, undefined, connection).then(result => {
                    throw 'não deveria ter retornado sucesso';
                }).catch(err => {
                    done();
                });
            } catch (e) { done(e); };
        });
        it('testar connectionString',(done)=>{
           Database.getLoginNoCache('store','1','123',connection).then((token)=>{
            Database.getResult('/v3/filial', 'store', token, connection).then(result => {
                done();
            }).catch(err => {
                done(err);
            });
           }); 
           

        });
    });
