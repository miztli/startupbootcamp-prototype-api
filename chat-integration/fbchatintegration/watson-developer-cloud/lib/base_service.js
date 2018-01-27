"use strict";
/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var extend = require("extend");
var request = require("request");
var vcapServices = require("vcap_services");
// new Buffer() is deprecated, replaced with Buffer.from() in node v4.5.0+ -
// `buffer-from` uses the new api when possible but falls back to the old one otherwise
var bufferFrom = require("buffer-from");
var helper_1 = require("./helper");
function hasCredentials(obj) {
    return obj && ((obj.username && obj.password) || obj.api_key);
}
function hasBasicCredentials(obj) {
    return obj && obj.username && obj.password;
}
function acceptsApiKey(name) {
    return name === 'visual_recognition';
}
var BaseService = /** @class */ (function () {
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
    function BaseService(user_options) {
        if (!(this instanceof BaseService)) {
            // it might be better to just create a new instance and return that..
            // but that can't be done here, it has to be done in each individual service.
            // So this is still a good failsafe even in that case.
            throw new Error('the "new" keyword is required to create Watson service instances');
        }
        var options = extend({}, user_options);
        var _options = this.initCredentials(options);
        if (options.url) {
            _options.url = helper_1.stripTrailingSlash(options.url);
        }
        var serviceClass = this.constructor;
        this._options = extend({ qs: {}, url: serviceClass.URL }, this.serviceDefaults, options, _options);
    }
    /**
     * @private
     * @param {UserOptions} options
     * @returns {BaseServiceOptions}
     */
    BaseService.prototype.initCredentials = function (options) {
        var _options = {};
        if (options.token) {
            options.headers = options.headers || {};
            options.headers['X-Watson-Authorization-Token'] = options.token;
            _options = extend(_options, options);
            return _options;
        }
        if (options.api_key || options.apikey) {
            _options.api_key = options.api_key || options.apikey;
        }
        _options.jar = request.jar();
        // Get credentials from environment properties or Bluemix,
        // but prefer credentials provided programatically
        _options = extend({}, this.getCredentialsFromBluemix(this.name), this.getCredentialsFromEnvironment(this.name), options, _options);
        if (!_options.use_unauthenticated) {
            if (!hasCredentials(_options) && acceptsApiKey(this.name)) {
                throw new Error("Argument error: api_key or username/password are required for " + this.name
                    .toUpperCase()
                    .replace(/_/g, ' ') + " " + this.version.toUpperCase() + " unless use_unauthenticated is set");
            }
            else if (!hasCredentials(_options)) {
                throw new Error("Argument error: username and password are required for " + this.name
                    .toUpperCase()
                    .replace(/_/g, ' ') + " " + this.version.toUpperCase() + " unless use_unauthenticated is set");
            }
            if (hasBasicCredentials(_options)) {
                // Calculate and add Authorization header to base options
                var encodedCredentials = bufferFrom(_options.username + ":" + _options.password).toString('base64');
                var authHeader = { Authorization: "Basic " + encodedCredentials };
                _options.headers = extend(authHeader, _options.headers);
            }
            else {
                _options.qs = extend({ api_key: _options.api_key }, _options.qs);
            }
        }
        return _options;
    };
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
    BaseService.prototype.getCredentialsFromEnvironment = function (name) {
        var _name = name.toUpperCase();
        // https://github.com/watson-developer-cloud/node-sdk/issues/605
        var _nameWithUnderscore = _name.replace(/-/g, '_');
        var _username = process.env[_name + "_USERNAME"] || process.env[_nameWithUnderscore + "_USERNAME"];
        var _password = process.env[_name + "_PASSWORD"] || process.env[_nameWithUnderscore + "_PASSWORD"];
        var _api_key = process.env[_name + "_API_KEY"] || process.env[_nameWithUnderscore + "_API_KEY"];
        var _url = process.env[_name + "_URL"] || process.env[_nameWithUnderscore + "_URL"];
        return {
            username: _username,
            password: _password,
            api_key: _api_key,
            url: _url
        };
    };
    /**
     * Pulls credentials from VCAP_SERVICES env property that bluemix sets
     * @param {string} vcap_services_name
     * @private
     * @returns {Credentials}
     */
    BaseService.prototype.getCredentialsFromBluemix = function (vcap_services_name) {
        var _credentials;
        if (this.name === 'visual_recognition') {
            _credentials = vcapServices.getCredentials('watson_vision_combined');
        }
        else {
            _credentials = vcapServices.getCredentials(vcap_services_name);
        }
        return _credentials;
    };
    /**
     * Retrieve this service's credentials - useful for passing to the authorization service
     *
     * Only returns a URL when token auth is used.
     *
     * @returns {Credentials}
     */
    BaseService.prototype.getCredentials = function () {
        var _credentials = {};
        if (this._options.username) {
            _credentials.username = this._options.username;
        }
        if (this._options.password) {
            _credentials.password = this._options.password;
        }
        if (this._options.api_key) {
            _credentials.api_key = this._options.api_key;
        }
        if (this._options.url) {
            _credentials.url = this._options.url;
        }
        return _credentials;
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base_service.js.map