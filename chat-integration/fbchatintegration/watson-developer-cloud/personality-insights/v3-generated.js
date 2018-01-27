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
var extend = require("extend");
var requestwrapper_1 = require("../lib/requestwrapper");
var helper_1 = require("../lib/helper");
var base_service_1 = require("../lib/base_service");
/**
 * ### Service Overview The IBM Watson Personality Insights service provides a Representational State Transfer (REST) Application Programming Interface (API) that enables applications to derive insights from social media, enterprise data, or other digital communications. The service uses linguistic analytics to infer individuals' intrinsic personality characteristics, including Big Five, Needs, and Values, from digital communications such as email, text messages, tweets, and forum posts. The service can automatically infer, from potentially noisy social media, portraits of individuals that reflect their personality characteristics. The service can report consumption preferences based on the results of its analysis, and for JSON content that is timestamped, it can report temporal behavior. ### API Usage The following information provides details about using the service to obtain a personality profile: * **The profile method:** The service offers a single `/v3/profile` method that accepts up to 20 MB of input data and produces results in JSON or CSV format. The service accepts input in Arabic, English, Japanese, Korean, or Spanish and can produce output in a variety of languages. * **Authentication:** You authenticate to the service by using your service credentials. You can use your credentials to authenticate via a proxy server that resides in Bluemix, or you can use your credentials to obtain a token and contact the service directly. See [Service credentials for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-credentials.html) and [Tokens for authentication](https://console.bluemix.net/docs/services/watson/getting-started-tokens.html). * **Request Logging:** By default, all Watson services log requests and their results. Data is collected only to improve the Watson services. If you do not want to share your data, set the header parameter `X-Watson-Learning-Opt-Out` to `true` for each request. Data is collected for any request that omits this header. See [Controlling request logging for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-logging.html).  For more information about the service, see [About Personality Insights](https://console.bluemix.net/docs/services/personality-insights/index.html). For information about calling the service and the responses it can generate, see [Requesting a profile](https://console.bluemix.net/docs/services/personality-insights/input.html), [Understanding a JSON profile](https://console.bluemix.net/docs/services/personality-insights/output.html), and [Understanding a CSV profile](https://console.bluemix.net/docs/services/personality-insights/output-csv.html).
 */
var PersonalityInsightsV3 = /** @class */ (function (_super) {
    __extends(PersonalityInsightsV3, _super);
    /**
     * Construct a PersonalityInsightsV3 object.
     *
     * @param {Object} options - Options for the service.
     * @param {String} options.version_date - The API version date to use with the service, in "YYYY-MM-DD" format. Whenever the API is changed in a backwards incompatible way, a new minor version of the API is released. The service uses the API version for the date you specify, or the most recent version before that date. Note that you should not programmatically specify the current date at runtime, in case the API has been updated since your application's release. Instead, specify a version date that is compatible with your application, and don't change it until your application is ready for a later version.
     * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://gateway.watsonplatform.net/personality-insights/api'). The base url may differ between Bluemix regions.
     * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
     * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
     * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
     * @constructor
     * @returns {PersonalityInsightsV3}
     * @throws {Error}
     */
    function PersonalityInsightsV3(options) {
        var _this = _super.call(this, options) || this;
        // check if 'version_date' was provided
        if (typeof _this._options.version_date === 'undefined') {
            throw new Error('Argument error: version_date was not specified');
        }
        _this._options.qs.version = options.version_date;
        return _this;
    }
    /*************************
     * personalityInsights
     ************************/
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
     * @param {boolean} [params.consumption_preferences] - If `true`, information about consumption preferences is returned with the results; if `false` (the default), the response does not include the information.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    PersonalityInsightsV3.prototype.profile = function (params, callback) {
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
                    Accept: 'application/json',
                    'Content-Type': _params.content_type,
                    'Content-Language': _params.content_language,
                    'Accept-Language': _params.accept_language
                }
            })
        };
        return requestwrapper_1.createRequest(parameters, _callback);
    };
    PersonalityInsightsV3.URL = 'https://gateway.watsonplatform.net/personality-insights/api';
    return PersonalityInsightsV3;
}(base_service_1.BaseService));
PersonalityInsightsV3.prototype.name = 'personality_insights';
PersonalityInsightsV3.prototype.version = 'v3';
/*************************
 * interfaces
 ************************/
(function (PersonalityInsightsV3) {
    var ProfileConstants;
    (function (ProfileConstants) {
        var ContentType;
        (function (ContentType) {
            ContentType["APPLICATION_JSON"] = "application/json";
            ContentType["TEXT_HTML"] = "text/html";
            ContentType["TEXT_PLAIN"] = "text/plain";
        })(ContentType = ProfileConstants.ContentType || (ProfileConstants.ContentType = {}));
        var ContentLanguage;
        (function (ContentLanguage) {
            ContentLanguage["AR"] = "ar";
            ContentLanguage["EN"] = "en";
            ContentLanguage["ES"] = "es";
            ContentLanguage["JA"] = "ja";
            ContentLanguage["KO"] = "ko";
        })(ContentLanguage = ProfileConstants.ContentLanguage || (ProfileConstants.ContentLanguage = {}));
        var AcceptLanguage;
        (function (AcceptLanguage) {
            AcceptLanguage["AR"] = "ar";
            AcceptLanguage["DE"] = "de";
            AcceptLanguage["EN"] = "en";
            AcceptLanguage["ES"] = "es";
            AcceptLanguage["FR"] = "fr";
            AcceptLanguage["IT"] = "it";
            AcceptLanguage["JA"] = "ja";
            AcceptLanguage["KO"] = "ko";
            AcceptLanguage["PT_BR"] = "pt-br";
            AcceptLanguage["ZH_CN"] = "zh-cn";
            AcceptLanguage["ZH_TW"] = "zh-tw";
        })(AcceptLanguage = ProfileConstants.AcceptLanguage || (ProfileConstants.AcceptLanguage = {}));
    })(ProfileConstants = PersonalityInsightsV3.ProfileConstants || (PersonalityInsightsV3.ProfileConstants = {}));
})(PersonalityInsightsV3 || (PersonalityInsightsV3 = {}));
module.exports = PersonalityInsightsV3;
//# sourceMappingURL=v3-generated.js.map