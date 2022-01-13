
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}



const lista = [{
    nome: 'base teste m5 local',
    restserver: 'http://localhost:8886',
    conta: 'm5',
    usuario: '1',
    senha: '123',
    driver: 'fb',
    connection: undefined,

},{
    nome: ' base teste: localhost/3050:store',
    restserver: 'http://localhost:8886',
    conta: 'store',
    usuario: '1',
    senha: '123',
    driver: 'fb',
    connection: 'Bearer eyJ0eXBlIjoiZGJhIiwicm9sZSI6InB1YmxpY3dlYiIsInRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmxlSEFpT2pFd01qZ3lNREk1TWpBeExDSmtZWFJoSWpwN0ltTnZiblJoSWpvaWMzUnZjbVVpTENKMWMzVmhjbWx2SWpvaWQySmhJaXdpYzJWdWFHRWlPaUozWW1FaUxDSnliMnhsSWpvaWNIVmliR2xqZDJWaUlpd2lZMjl1Ym1WamRHbHZiaUk2SW14dlkyRnNhRzl6ZEM4ek1EVXdPbk4wYjNKbElpd2laSEpwZG1WeUlqb2labUlpTENKa1lYUmhJam9pTWpBeU1pMHdNUzB4TTFReU16b3hNem95TVM0NE1EaGFJbjBzSW1saGRDSTZNVFkwTWpFeE5UWXdNWDAueTVkeWdlS1hFa0lSeGxFaDU4WHNITGRESG9mdHh5eXhQOUNoR0ljeEJqRSJ9',
    info:'requer database.conf apontando para store=<path/x.fdb>'
}
];

const p = function () {
    let index = parseInt(getRandomArbitrary(0, (lista.length - 1) + 0.49).toString());  //v < 0.3 ? 0 : (v>0.77)?2: 1;

    const r = lista[index];
    console.log('random conta index:', index, 'nome:', r.nome || r.conta, ' rest:', r.restserver);


    return lista[index];
}

const ultimo = p();

export const parametros = ultimo;

export const testar = {
    blob: true,
    indices: false, // demora para retornar, com volume alto de timeout;
    permissoes: true, // ok
    monitor: true, //ok
    chave_primaria: true, //ok
    cliente: true, //ok
    ctrl_id: true, //ok
    methods: true, //ok
    pedido: true, //ok
    procedures: true, //ok
    produto: true, //ok
    acentos: true, //ok
    externo: true,
}

