
import * as dotenv from 'dotenv';
import { json } from 'express';
const os = require('os');

dotenv.config();


var isLinux = (os.platform()=='linux');
var defaultFbDir = 'c:\\program files\firebird\firebird_3_0';
if (isLinux)
   defaultFbDir = '\opt\firebird';

export const config = {
    // servidor
    use_http2: (process.env.use_http2 || "false") === 'true',
    port: process.env.restserver_port || 8886, // default port to listen
    staticPath: process.env.staticPath,
    // database
    dbUserName: process.env.firebird_username || process.env.dbusername  || "SYSDBA",
    dbPassword: process.env.firebird_password || process.env.dbpassword  || "masterkey",
    dbHost: process.env.hostname || process.env.firebird_hostname || 'localhost',
    dbPort: process.env.port || process.env.firebird_port || 3050,
    dbRole: process.env.role || process.env.firebird_role || '',
    dbDatabase: process.env.database || '{contaid}',
    dbDriver: process.env.driver || 'fb',


    fbPrefix: process.env.firebird_dbprefix || '',
    fbSufix: process.env.firebird_dbsufix || '',
    fbAuth: process.env.firebird_auth || 'fixo',


    debug: (process.env.debug || 'false') == 'true',
    cache: +(process.env.cache || '0'),
    checkLogin: (process.env.check_login || 'true') == 'true',
    inDev: (process.env.in_dev || 'false') == 'true',
    mq_host: process.env.mq_host,
    VendorLib: process.env.firebird_lib || '',
    connectionString: process.env.connectionString, // usado no mssal 
    site: process.env.sites || '[]',
    actionSysDba: (process.env.actionSysDba||'false') =='true',
    firebirdHome : process.env.FIREBIRD_HOME || defaultFbDir,


    

    // statusCode
    status_conflict:409,
    status_precondition_failed:412,
    status_not_found:404,
    status_forbidden:403,
    status_ok:200,
    status_accepted:202,
    status_no_content:204,
    status_bad_request:400,
    status_unauthorized:401,
    status_method_not_allowed:405,
    status_not_acceptable:406,
    status_expectation_failed:417,
    status_precondition_required:428,
    status_not_implemented:501,
    stauts_internal_server_error:500,



}

export const log = function (texto) {
    if (config.debug)
        console.log(texto);
}

export const logInDev = function (texto) {
    if (config.inDev)
        console.log(texto);
}