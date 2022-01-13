








const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

import { Database } from './comum/database';
import { testar } from './comum/parametros';


const connection = 'Bearer eyJ0eXBlIjoiand0Iiwicm9sZSI6InB1YmxpY3dlYiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFd01qYzRORFUyTkRNNExDSmtZWFJoSWpwN0ltTnZiblJoSWpvaU1UQXlNek1pTENKMWMzVmhjbWx2SWpvaWQySmhJaXdpYzJWdWFHRWlPaUozWW1FaUxDSnliMnhsSWpvaWNIVmliR2xqZDJWaUlpd2lZMjl1Ym1WamRHbHZiaUk2SW1SbGMybG5ibWRoYkd4bGNubHRZWEpsWTJoaGJDNWtlVzVrYm5NdWIzSm5Mekl6TURVeE9qRXdNak16SWl3aVpHRjBZU0k2SWpJd01qRXRNVEl0TUROVU1UUTZORGM2TVRndU5EWXlXaUo5TENKcFlYUWlPakUyTXpnMU5ESTRNemg5LkpxZ21KNzI0M1A3OHhWY0MtcktBTTJzSDJYMHY3Vk4tS2F4VThHQVprMkEifQ==';



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
           Database.getLoginNoCache(10233,'1','1',connection).then((token)=>{
               //done(token);
            Database.getResult('/v3/filial', 10233, token, connection).then(result => {
                done();
            }).catch(err => {
                done(err);
            });
           }); 
           

        });
    });
