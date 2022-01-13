# V3 - rest-server-tests

=Modulo de TESTs para o Rest-Server V3=


[como configurar o banco a ser testado]
* abrir o arquivo   <comum/parametros.ts>, onde contem a lista de bancos a serem testados;

exemplo:
<pre>
{
    nome: 'base teste m5 local',
    restserver: 'http://localhost:8886',
    conta: 'm5',
    usuario: '1',
    senha: '123',
    driver: 'fb',
    connection: undefined,

} </pre>

a propriedade "connection" é opcional para fazer roteamento de banco de dados instalado em endereço fisico diferente do V3;



no windows, rodar    test.bat   para executar os loop de testes;

[como instalar]
* após baixar o diretório executar  npm install para criar as packages necessárias;
