export class Base64 {
    /// converte um base64 em string utf8
    static decode(b64: string): string {
        const buffer = Buffer.from(b64, 'base64');
        return buffer.toString('utf8');
    }

    /// converte uma string em base64
    static encode(texto: string): string {
        const buffer = Buffer.from(texto, 'utf8');
        return buffer.toString('base64');
    }

}