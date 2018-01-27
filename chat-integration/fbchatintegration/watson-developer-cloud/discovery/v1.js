"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GeneratedDiscoveryV1 = require("./v1-generated");
var extend = require("extend");
var isStream = require("isstream");
var DiscoveryV1 = /** @class */ (function (_super) {
    __extends(DiscoveryV1, _super);
    function DiscoveryV1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiscoveryV1._ensureFilename = function (file) {
        // no changes needed for streams created by fs.ReadStream (or similar looking streams)
        if (isStream.isReadable(file) && file.path) {
            return file;
        }
        // next handle request-style value/options objects
        if (file &&
            file.hasOwnProperty('value') &&
            file.hasOwnProperty('options')) {
            if (file.options.filename) {
                return file;
            }
            return {
                value: file.value,
                options: extend({ filename: '_' }, file.options)
            };
        }
        // finally, handle all other cases by wrapping them in a request-style value/options object
        return {
            value: file,
            options: {
                filename: '_'
            }
        };
    };
    DiscoveryV1.prototype.getEnvironments = function (params, callback) {
        return _super.prototype.listEnvironments.call(this, params, callback);
    };
    DiscoveryV1.prototype.createEnvironment = function (params, callback) {
        // make sure environments with size 0 can be created
        if (params.size !== 0 && !params.size) {
            params.size = 1;
        }
        return _super.prototype.createEnvironment.call(this, params, callback);
    };
    DiscoveryV1.prototype.updateEnvironment = function (params, callback) {
        return _super.prototype.updateEnvironment.call(this, params, callback);
    };
    DiscoveryV1.prototype.updateConfiguration = function (params, callback) {
        // name is now a required parameter
        // file is now split into conversions, enrichments and normalizations
        var _params = params || {};
        if (_params.file) {
            var _a = _params.file, conversions = _a.conversions, enrichments = _a.enrichments, normalizations = _a.normalizations;
            _params.conversions = conversions;
            _params.enrichments = enrichments;
            _params.normalizations = normalizations;
        }
        _params.name = _params.name || '_';
        return _super.prototype.updateConfiguration.call(this, _params, callback);
    };
    DiscoveryV1.prototype.getCollections = function (params, callback) {
        return _super.prototype.listCollections.call(this, params, callback);
    };
    DiscoveryV1.prototype.createCollection = function (params, callback) {
        // language_code is now called language
        if (params) {
            params.language = params.language || params.language_code || 'en_us';
        }
        return _super.prototype.createCollection.call(this, params, callback);
    };
    DiscoveryV1.prototype.updateCollection = function (params, callback) {
        // collection_name is now called name
        if (params) {
            params.name = params.name || params.collection_name;
        }
        return _super.prototype.updateCollection.call(this, params, callback);
    };
    DiscoveryV1.prototype.getCollectionFields = function (params, callback) {
        // listFields expects an array of collection ids
        if (params && !Array.isArray(params.collection_id)) {
            params.collection_ids = [params.collection_id];
        }
        return _super.prototype.listFields.call(this, params, callback);
    };
    DiscoveryV1.prototype.getConfigurations = function (params, callback) {
        return _super.prototype.listConfigurations.call(this, params, callback);
    };
    DiscoveryV1.prototype.createConfiguration = function (params, callback) {
        // name is now a required parameter
        // file is now split into conversions, enrichments and normalizations
        var _params = params || {};
        if (_params.file) {
            var _a = _params.file, conversions = _a.conversions, enrichments = _a.enrichments, normalizations = _a.normalizations;
            _params.conversions = conversions;
            _params.enrichments = enrichments;
            _params.normalizations = normalizations;
        }
        _params.name = _params.name || '_';
        return _super.prototype.createConfiguration.call(this, _params, callback);
    };
    DiscoveryV1.prototype.addJsonDocument = function (params, callback) {
        var fileParamType = typeof params.file;
        if (fileParamType !== 'object') {
            throw new Error("Argument error: params.file must be an object, but got " + fileParamType + ".");
        }
        var _params = extend(params, {
            file: {
                value: JSON.stringify(params.file),
                options: {
                    filename: '_.json'
                }
            }
        });
        return this.addDocument(_params, callback);
    };
    DiscoveryV1.prototype.updateJsonDocument = function (params, callback) {
        var fileParamType = typeof params.file;
        if (fileParamType !== 'object') {
            throw new Error("Argument error: params.file must be an object, but got " + fileParamType + ".");
        }
        var _params = extend(params, {
            file: {
                value: JSON.stringify(params.file),
                options: {
                    filename: '_.json'
                }
            }
        });
        return this.updateDocument(_params, callback);
    };
    DiscoveryV1.prototype.query = function (params, callback) {
        var _params = params || {};
        // query and natural_language_query can't both be populated
        if (_params.query && _params.natural_language_query) {
            delete _params.natural_language_query;
        }
        if (_params.return) {
            _params.return_fields = _params.return;
        }
        // passages parameters are now snake case
        Object.keys(_params).forEach(function (key) {
            return key.match(/passages\..*/i) &&
                (_params[key.replace('.', '_')] = _params[key]);
        });
        return _super.prototype.query.call(this, _params, callback);
    };
    DiscoveryV1.VERSION_DATE_2017_09_01 = '2017-09-01';
    DiscoveryV1.VERSION_DATE_2017_08_01 = '2017-08-01';
    DiscoveryV1.VERSION_DATE_2017_07_19 = '2017-07-19';
    DiscoveryV1.VERSION_DATE_2017_06_25 = '2017-06-25';
    DiscoveryV1.VERSION_DATE_2016_12_01 = '2016-12-01';
    DiscoveryV1.VERSION_DATE_2017_04_27 = '2017-04-27';
    DiscoveryV1.VERSION_DATE_2016_12_15 = '2016-12-15';
    return DiscoveryV1;
}(GeneratedDiscoveryV1));
module.exports = DiscoveryV1;
//# sourceMappingURL=v1.js.map