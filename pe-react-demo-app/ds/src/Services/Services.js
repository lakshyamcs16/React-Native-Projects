class Services {
    constructor(params) {
        this.url = params.url || '';
        this.body = params.body || {};
        this.requestOptions = params.requestOptions || null;
    }
}