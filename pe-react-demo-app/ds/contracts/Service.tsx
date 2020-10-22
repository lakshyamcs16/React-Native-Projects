
export default interface Service {
    getUrl();

    setUrl(base: string, url: string);

    getHeaders();

    setHeaders(headers: object);

    getBody();

    setBody(body: object);

    getMethod();

    setMethod(method: string);

    setParameters(params: object);

    useService(middleware: Function, params: object, callback: Function, ...next: any[]);

    hit (isBaseUrlAbsent: boolean): Promise<boolean>;

}