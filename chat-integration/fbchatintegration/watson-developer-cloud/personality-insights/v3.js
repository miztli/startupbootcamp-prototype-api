"use strict";
/**
 * Copyright 2017 IBM All Rights Reserved.
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
var GeneratedPersonalityInsightsV3 = require("./v3-generated");
var extend = require("extend");
var pick = require("object.pick");
var requestwrapper_1 = require("../lib/requestwrapper");
var helper_1 = require("../lib/helper");
var PersonalityInsightsV3 = /** @class */ (function (_super) {
    __extends(PersonalityInsightsV3, _super);
    function PersonalityInsightsV3(options) {
        return _super.call(this, options) || this;
    }
    PersonalityInsightsV3.prototype.profile = function (params, callback) {
        if (params && (params.content || params.content_type)) {
            return _super.prototype.profile.call(this, params, callback);
        }
        if (params && params.content_items) {
            params.contentItems = params.content_items;
        }
        if (!params || (!params.text && !params.contentItems)) {
            callback(new Error('Missing required parameters: text or content_items'));
            return;
        }
        var content_type = null;
        if (params.text) {
            content_type = helper_1.isHTML(params.text) ? 'text/html' : 'text/plain';
        }
        else {
            content_type = 'application/json';
        }
        var _params = {
            content: params.text || pick(params, ['contentItems']),
            content_type: content_type,
            raw_scores: params.raw_scores,
            csv_headers: params.csv_headers,
            consumption_preferences: params.consumption_preferences
        };
        var headers = helper_1.toLowerKeys(params.headers);
        if (headers['accept-language']) {
            _params.accept_language = headers['accept-language'];
        }
        if (headers['content-type']) {
            _params.content_type = headers['content-type'];
        }
        if (headers['content-language']) {
            _params.content_language = headers['content-language'];
        }
        if (headers['accept'] === 'text/csv') {
            return this.profile_csv(_params, callback);
        }
        return _super.prototype.profile.call(this, _params, callback);
    };
    /**
     * Generates a personality profile based on input text.
     *
     * Derives personality insights for up to 20 MB of input content written by an author, though the service requires much less text to produce an accurate profile; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). Accepts input in Arabic, English, Japanese, Korean, or Spanish and produces output in one of eleven languages. Provide plain text, HTML, or JSON content, and receive results in JSON or CSV format.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {Content|string} params.content - A maximum of 20 MB of content to analyze, though the service requires much less text; for more information, see [Providing sufficient input](https://console.bluemix.net/docs/services/personality-insights/input.html#sufficient). A JSON request must conform to the `Content` model.
     * @param {string} params.content_type - The type of the input: application/json, text/html, or text/plain. A character encoding can be specified by including a `charset` parameter. For example, 'text/html;charset=utf-8'.
     * @param {string} [params.content_language] - The language of the input text for the request: Arabic, English, Japanese, Korean, or Spanish. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The effect of the `content_language` header depends on the `Content-Type` header. When `Content-Type` is `text/plain` or `text/html`, `content_language` is the only way to specify the language. When `Content-Type` is `application/json`, `content_language` overrides a language specified with the `language` parameter of a `ContentItem` object, and content items that specify a different language are ignored; omit this header to base the language on the specification of the content items. You can specify any combination of languages for `content_language` and `Accept-Language`.
     * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for the input and response content.
     * @param {boolean} [params.raw_scores] - If `true`, a raw score in addition to a normalized percentile is returned for each characteristic; raw scores are not compared with a sample population. If `false` (the default), only normalized percentiles are returned.
     * @param {boolean} [params.csv_headers] - If `true`, column labels are returned with a CSV response; if `false` (the default), they are not. Applies only when the `Accept` header is set to `text/csv`.
     * @param {boolean} [params.consumption_preferences] - If `true`, information about consumption preferences is returned with the results; if `false` (the default), the response does not include the information.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    PersonalityInsightsV3.prototype.profile_csv = function (params, callback) {
        var _params = extend({}, params);
        var _callback = callback ? callback : function () { };
        var requiredParams = ['content', 'content_type'];
        var missingParams = helper_1.getMissingParams(_params, requiredParams);
        if (missingParams) {
            return _callback(missingParams);
        }
        var body = _params.content;
        var query = {
            raw_scores: _params.raw_scores,
            csv_headers: _params.csv_headers,
            consumption_preferences: _params.consumption_preferences
        };
        var parameters = {
            options: {
                url: '/v3/profile',
                method: 'POST',
                json: _params.content_type === 'application/json',
                body: body,
                qs: query
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    Accept: 'text/csv',
                    'Content-Type': _params.content_type,
                    'Content-Language': _params.content_language,
                    'Accept-Language': _params.accept_language
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    return PersonalityInsightsV3;
}(GeneratedPersonalityInsightsV3));
module.exports = PersonalityInsightsV3;
//# sourceMappingURL=v3.js.map