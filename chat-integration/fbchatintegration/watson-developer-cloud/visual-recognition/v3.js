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
var GeneratedVisualRecognitionV3 = require("./v3-generated");
var extend = require("extend");
var VisualRecognitionV3 = /** @class */ (function (_super) {
    __extends(VisualRecognitionV3, _super);
    function VisualRecognitionV3(options) {
        return _super.call(this, options) || this;
    }
    VisualRecognitionV3.prototype.recognizeText = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.createCollection = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.getCollection = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.listCollections = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.deleteCollection = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.addImage = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.listImages = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.getImage = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.deleteImage = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.setImageData = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.getImageData = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.deleteImageData = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.findSimilar = function (params, callback) {
        console.warn(VisualRecognitionV3.betaError);
    };
    VisualRecognitionV3.prototype.parseParameters = function (params) {
        var _params = params || {};
        if (_params.parameters) {
            return _params.parameters;
        }
        var _parameters = {};
        ['url', 'classifier_ids', 'owners', 'threshold'].forEach(function (key) { return _params[key] && (_parameters[key] = _params[key]); });
        return _parameters;
    };
    VisualRecognitionV3.prototype.classify = function (params, callback) {
        if (params && params.image_file) {
            params.images_file = params.image_file;
        }
        var _parameters = this.parseParameters(params);
        var _params = extend(params, { parameters: _parameters });
        return _super.prototype.classify.call(this, _params, callback);
    };
    VisualRecognitionV3.prototype.detectFaces = function (params, callback) {
        if (params && params.image_file) {
            params.images_file = params.image_file;
        }
        var _parameters = this.parseParameters(params);
        var _params = extend(params, { parameters: _parameters });
        return _super.prototype.detectFaces.call(this, _params, callback);
    };
    VisualRecognitionV3.prototype.retrainClassifier = function (params, callback) {
        return _super.prototype.updateClassifier.call(this, params, callback);
    };
    VisualRecognitionV3.VERSION_DATE_2016_05_20 = '2016-05-20';
    VisualRecognitionV3.betaError = new Error('As of September 8, 2017, the beta period for Similarity Search is closed.' +
        'For more information, see [Visual Recognition API – Similarity Search Update]' +
        '(https://www.ibm.com/blogs/bluemix/2017/08/visual-recognition-api-similarity-search-update)');
    return VisualRecognitionV3;
}(GeneratedVisualRecognitionV3));
module.exports = VisualRecognitionV3;
//# sourceMappingURL=v3.js.map