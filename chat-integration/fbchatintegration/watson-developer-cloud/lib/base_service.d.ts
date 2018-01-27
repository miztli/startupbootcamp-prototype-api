/// <reference types="request" />
import request = require('request');
export interface HeaderOptions {
    'X-Watson-Learning-Opt-Out'?: boolean;
    [key: string]: any;
}
export interface UserOptions {
    url?: string;
    version_date?: string;
    username?: string;
    password?: string;
    api_key?: string;
    apikey?: string;
    use_unauthenticated?: boolean;
    headers?: HeaderOptions;
    token?: string;
}
export interface BaseServiceOptions extends UserOptions {
    headers: HeaderOptions;
    url: string;
    jar?: request.CookieJar;
    qs: any;
}
export interface Credentials {
    username: string;
    password: string;
    api_key: string;
    url: string;
}
export declare class BaseService {
    protected _options: BaseServiceOptions;
    protected serviceDefaults: object;
    static URL: string;
    name: string;
    version: string;
    /**
     * Internal base class that other services inherit from
     * @param {UserOptions} options
     * @param {string} [options.username] - required unless use_unauthenticated is set
     * @param {string} [options.password] - required unless use_unauthenticated is set
     * @param {boolean} [options.use_unauthenticated] - skip credential requirement
     * @param {HeaderOptions} [options.headers]
     * @param {boolean} [options.headers.X-Watson-Learning-Opt-Out=false] - opt-out of data collection
     * @param {string} [options.url] - override default service base url
     * @private
     * @abstract
     * @constructor
     * @throws {Error}
     * @returns {BaseService}
     */
    constructor(user_options: UserOptions);
    /**
     * @private
     * @param {UserOptions} options
     * @returns {BaseServiceOptions}
     */
    private initCredentials(options);
    /**
     * Pulls credentials from env properties
     *
     * Property checked is uppercase service.name suffixed by _USERNAME and _PASSWORD
     *
     * For example, if service.name is speech_to_text,
     * env properties are SPEECH_TO_TEXT_USERNAME and SPEECH_TO_TEXT_PASSWORD
     *
     * @private
     * @param {string} name - the service snake case name
     * @returns {Credentials}
     */
    private getCredentialsFromEnvironment(name);
    /**
     * Pulls credentials from VCAP_SERVICES env property that bluemix sets
     * @param {string} vcap_services_name
     * @private
     * @returns {Credentials}
     */
    private getCredentialsFromBluemix(vcap_services_name);
    /**
     * Retrieve this service's credentials - useful for passing to the authorization service
     *
     * Only returns a URL when token auth is used.
     *
     * @returns {Credentials}
     */
    getCredentials(): Credentials;
}
