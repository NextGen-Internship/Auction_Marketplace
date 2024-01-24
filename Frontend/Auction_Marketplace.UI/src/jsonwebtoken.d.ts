declare module 'jsonwebtoken' {
    function decode(token: string): null | { [key: string]: any } | string;
    function verify(token: string, secretOrPublicKey: string, options?: any): { [key: string]: any } | string;
    function sign(payload: string | Buffer | object, secretOrPrivateKey: string, options?: any): string;
  
    export { decode, verify, sign };
  }
  
  declare module 'jsonwebtoken-promisified' {
    export function sign(
      payload: string | Buffer | object,
      secretOrPrivateKey: string | Buffer,
      options?: object
    ): Promise<string>;
  
    export function verify(
      token: string,
      secretOrPublicKey: string | Buffer,
      options?: object
    ): Promise<object | string>;
  
    export function decode(token: string, options?: object): object | null;
  }
  