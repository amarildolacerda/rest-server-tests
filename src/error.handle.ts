
import * as express from 'express'

export function registerError(contaid: any, err: any, res?, statusCode?) {
    try {
        const error = `${err.error || err.message || err}`;
        const msg = { "error": error.replace('While ','Executando ').replace(' query ',' consulta ').replace('conversion error from ','não consegui converte ')  };
        console.log('ERRO:','statucCode:',statusCode,(new Date()).toISOString(),'conta:',contaid,"error:",msg.error, "cmd: ", `${err.cmd || ''}`);
        console.log('--------------------------------------------');
        if (res && !res.headersSent)
           res.status(err.statusCode || statusCode || 412).json(msg);
    } catch (e) {
        console.log('LOG-ERROR: ',err);
    }
    return;
}
