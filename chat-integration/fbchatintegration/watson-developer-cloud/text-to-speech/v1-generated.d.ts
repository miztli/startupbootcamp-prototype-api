/// <reference types="node" />
/// <reference types="request" />
import { RequestResponse } from 'request';
import { BaseService } from '../lib/base_service';
/**
 * ### Service Overview The IBM Text to Speech service provides a Representational State Transfer (REST) Application Programming Interface (API) that uses IBM's speech-synthesis capabilities to synthesize text into natural-sounding speech in a variety of languages, dialects, and voices. The service currently synthesizes text from US English, UK English, French, German, Italian, Japanese, Spanish, or Brazilian Portuguese into audio spoken in a male or female voice (the service supports only a single gender for some languages). The audio is streamed back to the client with minimal delay. ### API Overview The Text to Speech service consists of the following related endpoints: * `/v1/voices` provides information about the voices available for synthesized speech. * `/v1/synthesize` synthesizes written text to audio speech. * `/v1/pronunciation` returns the pronunciation for a specified word. * `/v1/customizations` and `/v1/customizations/{customization_id}` lets users create custom voice models, which are dictionaries of words and their translations for use in speech synthesis. * `/v1/customizations/{customization_id}/words` and `/v1/customizations/{customization_id}/words/{word}` lets users manage the words in a custom voice model.   **Note:** The `/v1/pronunciation` and `/v1/customizations` interfaces are currently beta functionality. ### API Usage The following information provides details about using the service to synthesize audio: * **Audio formats:** The service supports a number of audio formats (MIME types). For more information about audio formats and sampling rates, including links to a number of Internet sites that provide technical and usage details about the different formats, see [Specifying an audio format](https://console.bluemix.net/docs/services/text-to-speech/http.html#format). * **SSML:** Many methods refer to the Speech Synthesis Markup Language (SSML), an XML-based markup language that provides annotations of text for speech-synthesis applications; for example, many methods accept or produce translations that use an SSML-based phoneme format. See [Using SSML](https://console.bluemix.net/docs/services/text-to-speech/SSML.html) and [Using IBM SPR](https://console.bluemix.net/docs/services/text-to-speech/SPRs.html). * **Word translations:** Many customization methods accept or return sounds-like or phonetic translations for words. A phonetic translation is based on the SSML format for representing the phonetic string of a word. Phonetic translations can use standard International Phonetic Alphabet (IPA) representation:   &lt;phoneme alphabet=\"ipa\" ph=\"t&#601;m&#712;&#593;to\"&gt;&lt;/phoneme&gt;   or the proprietary IBM Symbolic Phonetic Representation (SPR):   &lt;phoneme alphabet=\"ibm\" ph=\"1gAstroEntxrYFXs\"&gt;&lt;/phoneme&gt;   For more information about customization and about sounds-like and phonetic translations, see [Understanding customization](https://console.bluemix.net/docs/services/text-to-speech/custom-intro.html). * **GUIDs:** The pronunciation and customization methods accept or return a Globally Unique Identifier (GUID). For example, customization IDs (specified with the `customization_id` parameter) and service credentials are GUIDs. GUIDs are hexadecimal strings that have the format `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`. * **WebSocket interface:** The service also offers a WebSocket interface as an alternative to its HTTP REST interface for speech synthesis. The WebSocket interface supports both plain text and SSML input, including the SSML &lt;mark&gt; element and word timings. See [The WebSocket interface](https://console.bluemix.net/docs/services/text-to-speech/websockets.html). * **Authentication:** You authenticate to the service by using your service credentials. You can use your credentials to authenticate via a proxy server that resides in IBM Cloud, or you can use your credentials to obtain a token and contact the service directly. See [Service credentials for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-credentials.html) and [Tokens for authentication](https://console.bluemix.net/docs/services/watson/getting-started-tokens.html). * **Custom voice model ownership:** In all cases, you must use service credentials created for the instance of the service that owns a custom voice model to use the methods described in this documentation with that model. For more information, see [Ownership of custom voice models](https://console.bluemix.net/docs/services/text-to-speech/custom-models.html#customOwner). * **Request Logging:** By default, all Watson services log requests and their results. Data is collected only to improve the Watson services. If you do not want to share your data, set the header parameter `X-Watson-Learning-Opt-Out` to `true` for each request. Data is collected for any request that omits this header. See [Controlling request logging for Watson services](https://console.bluemix.net/docs/services/watson/getting-started-logging.html).   The service does not log data (words and translations) that are used to build custom language models; your training data is never used to improve the service's base models. The service does log data when a custom model is used with a synthesize request; you must set the `X-Watson-Learning-Opt-Out` request header to prevent logging for recognition requests. For more information, see [Request logging and data privacy](https://console.bluemix.net/docs/services/text-to-speech/custom-models.html#customLogging).  For more information about the service and its various interfaces, see [About Text to Speech](https://console.bluemix.net/docs/services/text-to-speech/index.html).
 */
declare class TextToSpeechV1 extends BaseService {
    name: string;
    version: string;
    static URL: string;
    /**
     * Construct a TextToSpeechV1 object.
     *
     * @param {Object} options - Options for the service.
     * @param {String} [options.url] - The base url to use when contacting the service (e.g. 'https://stream.watsonplatform.net/text-to-speech/api'). The base url may differ between Bluemix regions.
     * @param {String} [options.username] - The username used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {String} [options.password] - The password used to authenticate with the service. Username and password credentials are only required to run your application locally or outside of Bluemix. When running on Bluemix, the credentials will be automatically loaded from the `VCAP_SERVICES` environment variable.
     * @param {Boolean} [options.use_unauthenticated] - Set to `true` to avoid including an authorization header. This option may be useful for requests that are proxied.
     * @param {Object} [options.headers] - Default headers that shall be included with every request to the service.
     * @param {Object} [options.headers.X-Watson-Learning-Opt-Out] - Set to `true` to opt-out of data collection. By default, all IBM Watson services log requests and their results. Logging is done only to improve the services for future users. The logged data is not shared or made public. If you are concerned with protecting the privacy of users' personal information or otherwise do not want your requests to be logged, you can opt out of logging.
     * @constructor
     * @returns {TextToSpeechV1}
     */
    constructor(options: TextToSpeechV1.Options);
    /*************************
     * voices
     ************************/
    /**
     * Retrieves a specific voice available for speech synthesis.
     *
     * Lists information about the voice specified with the `voice` path parameter. Specify the `customization_id` query parameter to obtain information for that custom voice model of the specified voice. Use the `GET /v1/voices` method to see a list of all available voices.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.voice - The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method.
     * @param {string} [params.customization_id] - The GUID of a custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    getVoice(params: TextToSpeechV1.GetVoiceParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Voice>): ReadableStream | void;
    /**
     * Retrieves all voices available for speech synthesis.
     *
     * Lists information about all available voices. To see information about a specific voice, use the `GET /v1/voices/{voice}` method.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    listVoices(params?: TextToSpeechV1.ListVoicesParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Voices>): ReadableStream | void;
    /*************************
     * synthesize
     ************************/
    /**
     * Streaming speech synthesis of the text in the body parameter.
     *
     * Synthesizes text to spoken audio, returning the synthesized audio stream as an array of bytes. Identical to the `GET` method but passes longer text in the body of the request, not with the URL. Text size is limited to 5 KB.   If a request includes invalid query parameters, the service returns a `Warnings` response header that provides messages about the invalid parameters. The warning includes a descriptive message and a list of invalid argument strings. For example, a message such as `\"Unknown arguments:\"` or `\"Unknown url query arguments:\"` followed by a list of the form `\"invalid_arg_1, invalid_arg_2.\"` The request succeeds despite the warnings.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} [params.accept] - The requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.).
     * @param {string} [params.voice] - The voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method.
     * @param {string} [params.customization_id] - The GUID of a custom voice model to use for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization.
     * @param {string} params.text - The text to synthesize.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    synthesize(params: TextToSpeechV1.SynthesizeParams, callback?: TextToSpeechV1.Callback<ReadableStream | Buffer>): ReadableStream | void;
    /*************************
     * pronunciation
     ************************/
    /**
     * Gets the pronunciation for a word.
     *
     * Returns the phonetic pronunciation for the word specified by the `text` parameter. You can request the pronunciation for a specific format. You can also request the pronunciation for a specific voice to see the default translation for the language of that voice or for a specific custom voice model to see the translation for that voice model.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.text - The word for which the pronunciation is requested.
     * @param {string} [params.voice] - A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. Retrieve available voices with the `GET /v1/voices` method.
     * @param {string} [params.format] - The phoneme format in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format.
     * @param {string} [params.customization_id] - The GUID of a custom voice model for which the pronunciation is to be returned. The language of a specified custom model must match the language of the specified voice. If the word is not defined in the specified custom model, the service returns the default translation for the custom model's language. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see the translation for the specified voice with no customization.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    getPronunciation(params: TextToSpeechV1.GetPronunciationParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Pronunciation>): ReadableStream | void;
    /*************************
     * customVoiceModels
     ************************/
    /**
     * Creates a new custom voice model.
     *
     * Creates a new empty custom voice model. The model is owned by the instance of the service whose credentials are used to create it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.name - The name of the new custom voice model.
     * @param {string} [params.language] - The language of the new custom voice model. Omit the parameter to use the the default language, `en-US`.
     * @param {string} [params.description] - A description of the new custom voice model. Specifying a description is recommended.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    createVoiceModel(params: TextToSpeechV1.CreateVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModel>): ReadableStream | void;
    /**
     * Deletes a custom voice model.
     *
     * Deletes the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    deleteVoiceModel(params: TextToSpeechV1.DeleteVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): ReadableStream | void;
    /**
     * Queries the contents of a custom voice model.
     *
     * Lists all information about the custom voice model with the specified `customization_id`. In addition to metadata such as the name and description of the voice model, the output includes the words in the model and their translations as defined in the model. To see just the metadata for a voice model, use the `GET /v1/customizations` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    getVoiceModel(params: TextToSpeechV1.GetVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModel>): ReadableStream | void;
    /**
     * Lists all available custom voice models for a language or for all languages.
     *
     * Lists metadata such as the name and description for the custom voice models that you own. Use the `language` query parameter to list the voice models that you own for the specified language only. Omit the parameter to see all voice models that you own for all languages. To see the words in addition to the metadata for a specific voice model, use the `GET /v1/customizations/{customization_id}` method. You must use credentials for the instance of the service that owns a model to list information about it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} [params] - The parameters to send to the service.
     * @param {string} [params.language] - The language for which custom voice models that are owned by the requesting service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the requester.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    listVoiceModels(params?: TextToSpeechV1.ListVoiceModelsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.VoiceModels>): ReadableStream | void;
    /**
     * Updates information and words for a custom voice model.
     *
     * Updates information for the custom voice model with the specified `customization_id`. You can update the metadata such as the name and description of the voice model. You can also update the words in the model and their translations. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to update it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {string} [params.name] - A new name for the custom voice model.
     * @param {string} [params.description] - A new description for the custom voice model.
     * @param {CustomWord[]} [params.words] - An array of words and their translations that are to be added or updated for the custom voice model. Pass an empty array to make no additions or updates.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    updateVoiceModel(params: TextToSpeechV1.UpdateVoiceModelParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): ReadableStream | void;
    /*************************
     * customWords
     ************************/
    /**
     * Adds a word to a custom voice model.
     *
     * Adds a single word and its translation to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add a word to it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {string} params.word - The word that is to be added or updated for the custom voice model.
     * @param {string} params.translation - The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word.
     * @param {string} [params.part_of_speech] - **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes).
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    addWord(params: TextToSpeechV1.AddWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): ReadableStream | void;
    /**
     * Adds one or more words to a custom voice model.
     *
     * Adds one or more words and their translations to the custom voice model with the specified `customization_id`. Adding a new translation for a word that already exists in a custom model overwrites the word's existing translation. A custom model can contain no more than 20,000 entries. You must use credentials for the instance of the service that owns a model to add words to it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {CustomWord[]} params.words - An array of `CustomWord` objects that provides information about the words and their translations that are to be added or updated for the custom voice model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    addWords(params: TextToSpeechV1.AddWordsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): ReadableStream | void;
    /**
     * Deletes a word from a custom voice model.
     *
     * Deletes a single word from the custom voice model with the specified `customization_id`. You must use credentials for the instance of the service that owns a model to delete it.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model from which to delete a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {string} params.word - The word that is to be deleted from the custom voice model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    deleteWord(params: TextToSpeechV1.DeleteWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Empty>): ReadableStream | void;
    /**
     * Queries details about a word in a custom voice model.
     *
     * Returns the translation for a single word from the custom model with the specified `customization_id`. The output shows the translation as it is defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model from which to query a word. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {string} params.word - The word that is to be queried from the custom voice model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    getWord(params: TextToSpeechV1.GetWordParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Translation>): ReadableStream | void;
    /**
     * Queries details about the words in a custom voice model.
     *
     * Lists all of the words and their translations for the custom voice model with the specified `customization_id`. The output shows the translations as they are defined in the model. You must use credentials for the instance of the service that owns a model to query information about its words.   **Note:** This method is currently a beta release.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {string} params.customization_id - The GUID of the custom voice model that is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model.
     * @param {Function} [callback] - The callback that handles the response.
     * @returns {ReadableStream|void}
     */
    listWords(params: TextToSpeechV1.ListWordsParams, callback?: TextToSpeechV1.Callback<TextToSpeechV1.Words>): ReadableStream | void;
}
/*************************
 * interfaces
 ************************/
declare namespace TextToSpeechV1 {
    /** Options for the `TextToSpeechV1` constructor. **/
    type Options = {
        url?: string;
        username?: string;
        password?: string;
        use_unauthenticated?: boolean;
        headers?: object;
    };
    /** The callback for a service request. **/
    type Callback<T> = (error: any, body?: T, response?: RequestResponse) => void;
    /** The body of a service request that returns no response data. **/
    interface Empty {
    }
    /*************************
     * request interfaces
     ************************/
    /** Parameters for the `getVoice` operation. **/
    interface GetVoiceParams {
        /** The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method. **/
        voice: GetVoiceConstants.Voice | string;
        /** The GUID of a custom voice model for which information is to be returned. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see information about the specified voice with no customization. **/
        customization_id?: string;
    }
    /** Constants for the `getVoice` operation. **/
    namespace GetVoiceConstants {
        /** The voice for which information is to be returned. Retrieve available voices with the `GET /v1/voices` method. **/
        enum Voice {
            EN_US_ALLISONVOICE = "en-US_AllisonVoice",
            EN_US_LISAVOICE = "en-US_LisaVoice",
            EN_US_MICHAELVOICE = "en-US_MichaelVoice",
            EN_GB_KATEVOICE = "en-GB_KateVoice",
            ES_ES_ENRIQUEVOICE = "es-ES_EnriqueVoice",
            ES_ES_LAURAVOICE = "es-ES_LauraVoice",
            ES_LA_SOFIAVOICE = "es-LA_SofiaVoice",
            ES_US_SOFIAVOICE = "es-US_SofiaVoice",
            DE_DE_DIETERVOICE = "de-DE_DieterVoice",
            DE_DE_BIRGITVOICE = "de-DE_BirgitVoice",
            FR_FR_RENEEVOICE = "fr-FR_ReneeVoice",
            IT_IT_FRANCESCAVOICE = "it-IT_FrancescaVoice",
            JA_JP_EMIVOICE = "ja-JP_EmiVoice",
            PT_BR_ISABELAVOICE = "pt-BR_IsabelaVoice",
        }
    }
    /** Parameters for the `listVoices` operation. **/
    interface ListVoicesParams {
    }
    /** Parameters for the `synthesize` operation. **/
    interface SynthesizeParams {
        /** The requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
        accept?: SynthesizeConstants.Accept | string;
        /** The requested audio format (MIME type) of the audio. You can use this query parameter or the `Accept` header to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
        accept2?: SynthesizeConstants.Accept | string;
        /** The voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method. **/
        voice?: SynthesizeConstants.Voice | string;
        /** The GUID of a custom voice model to use for the synthesis. If a custom voice model is specified, it is guaranteed to work only if it matches the language of the indicated voice. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to use the specified voice with no customization. **/
        customization_id?: string;
        /** The text to synthesize. **/
        text: string;
    }
    /** Constants for the `synthesize` operation. **/
    namespace SynthesizeConstants {
        /** The requested audio format (MIME type) of the audio. You can use this header or the `accept` query parameter to specify the audio format. (For the `audio/l16` format, you can optionally specify `endianness=big-endian` or `endianness=little-endian`; the default is little endian.). **/
        enum Accept {
            BASIC = "audio/basic",
            FLAC = "audio/flac",
            L16_RATE = "audio/l16",
            OGG = "audio/ogg",
            OGG_CODECS_OPUS = "audio/ogg;codecs=opus",
            OGG_CODECS_VORBIS = "audio/ogg;codecs=vorbis",
            MP3 = "audio/mp3",
            MPEG = "audio/mpeg",
            MULAW_RATE = "audio/mulaw",
            WAV = "audio/wav",
            WEBM = "audio/webm",
            WEBM_CODECS_OPUS = "audio/webm:codecs=opus",
            WEBM_CODECS_VORBIS = "audio/webm:codecs=vorbis",
        }
        /** The voice to use for synthesis. Retrieve available voices with the `GET /v1/voices` method. **/
        enum Voice {
            EN_US_ALLISONVOICE = "en-US_AllisonVoice",
            EN_US_LISAVOICE = "en-US_LisaVoice",
            EN_US_MICHAELVOICE = "en-US_MichaelVoice",
            EN_GB_KATEVOICE = "en-GB_KateVoice",
            ES_ES_ENRIQUEVOICE = "es-ES_EnriqueVoice",
            ES_ES_LAURAVOICE = "es-ES_LauraVoice",
            ES_LA_SOFIAVOICE = "es-LA_SofiaVoice",
            ES_US_SOFIAVOICE = "es-US_SofiaVoice",
            DE_DE_DIETERVOICE = "de-DE_DieterVoice",
            DE_DE_BIRGITVOICE = "de-DE_BirgitVoice",
            FR_FR_RENEEVOICE = "fr-FR_ReneeVoice",
            IT_IT_FRANCESCAVOICE = "it-IT_FrancescaVoice",
            JA_JP_EMIVOICE = "ja-JP_EmiVoice",
            PT_BR_ISABELAVOICE = "pt-BR_IsabelaVoice",
        }
    }
    /** Parameters for the `getPronunciation` operation. **/
    interface GetPronunciationParams {
        /** The word for which the pronunciation is requested. **/
        text: string;
        /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. Retrieve available voices with the `GET /v1/voices` method. **/
        voice?: GetPronunciationConstants.Voice | string;
        /** The phoneme format in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. **/
        format?: GetPronunciationConstants.Format | string;
        /** The GUID of a custom voice model for which the pronunciation is to be returned. The language of a specified custom model must match the language of the specified voice. If the word is not defined in the specified custom model, the service returns the default translation for the custom model's language. You must make the request with service credentials created for the instance of the service that owns the custom model. Omit the parameter to see the translation for the specified voice with no customization. **/
        customization_id?: string;
    }
    /** Constants for the `getPronunciation` operation. **/
    namespace GetPronunciationConstants {
        /** A voice that specifies the language in which the pronunciation is to be returned. All voices for the same language (for example, `en-US`) return the same translation. Retrieve available voices with the `GET /v1/voices` method. **/
        enum Voice {
            EN_US_ALLISONVOICE = "en-US_AllisonVoice",
            EN_US_LISAVOICE = "en-US_LisaVoice",
            EN_US_MICHAELVOICE = "en-US_MichaelVoice",
            EN_GB_KATEVOICE = "en-GB_KateVoice",
            ES_ES_ENRIQUEVOICE = "es-ES_EnriqueVoice",
            ES_ES_LAURAVOICE = "es-ES_LauraVoice",
            ES_LA_SOFIAVOICE = "es-LA_SofiaVoice",
            ES_US_SOFIAVOICE = "es-US_SofiaVoice",
            DE_DE_DIETERVOICE = "de-DE_DieterVoice",
            DE_DE_BIRGITVOICE = "de-DE_BirgitVoice",
            FR_FR_RENEEVOICE = "fr-FR_ReneeVoice",
            IT_IT_FRANCESCAVOICE = "it-IT_FrancescaVoice",
            JA_JP_EMIVOICE = "ja-JP_EmiVoice",
            PT_BR_ISABELAVOICE = "pt-BR_IsabelaVoice",
        }
        /** The phoneme format in which to return the pronunciation. Omit the parameter to obtain the pronunciation in the default format. **/
        enum Format {
            IPA = "ipa",
            IBM = "ibm",
        }
    }
    /** Parameters for the `createVoiceModel` operation. **/
    interface CreateVoiceModelParams {
        /** The name of the new custom voice model. **/
        name: string;
        /** The language of the new custom voice model. Omit the parameter to use the the default language, `en-US`. **/
        language?: CreateVoiceModelConstants.Language | string;
        /** A description of the new custom voice model. Specifying a description is recommended. **/
        description?: string;
    }
    /** Constants for the `createVoiceModel` operation. **/
    namespace CreateVoiceModelConstants {
        /** The language of the new custom voice model. Omit the parameter to use the the default language, `en-US`. **/
        enum Language {
            DE_DE = "de-DE",
            EN_US = "en-US",
            EN_GB = "en-GB",
            ES_ES = "es-ES",
            ES_LA = "es-LA",
            ES_US = "es-US",
            FR_FR = "fr-FR",
            IT_IT = "it-IT",
            JA_JP = "ja-JP",
            PT_BR = "pt-BR",
        }
    }
    /** Parameters for the `deleteVoiceModel` operation. **/
    interface DeleteVoiceModelParams {
        /** The GUID of the custom voice model that is to be deleted. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
    }
    /** Parameters for the `getVoiceModel` operation. **/
    interface GetVoiceModelParams {
        /** The GUID of the custom voice model that is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
    }
    /** Parameters for the `listVoiceModels` operation. **/
    interface ListVoiceModelsParams {
        /** The language for which custom voice models that are owned by the requesting service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the requester. **/
        language?: ListVoiceModelsConstants.Language | string;
    }
    /** Constants for the `listVoiceModels` operation. **/
    namespace ListVoiceModelsConstants {
        /** The language for which custom voice models that are owned by the requesting service credentials are to be returned. Omit the parameter to see all custom voice models that are owned by the requester. **/
        enum Language {
            DE_DE = "de-DE",
            EN_US = "en-US",
            EN_GB = "en-GB",
            ES_ES = "es-ES",
            ES_LA = "es-LA",
            ES_US = "es-US",
            FR_FR = "fr-FR",
            IT_IT = "it-IT",
            JA_JP = "ja-JP",
            PT_BR = "pt-BR",
        }
    }
    /** Parameters for the `updateVoiceModel` operation. **/
    interface UpdateVoiceModelParams {
        /** The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
        /** A new name for the custom voice model. **/
        name?: string;
        /** A new description for the custom voice model. **/
        description?: string;
        /** An array of words and their translations that are to be added or updated for the custom voice model. Pass an empty array to make no additions or updates. **/
        words?: CustomWord[];
    }
    /** Parameters for the `addWord` operation. **/
    interface AddWordParams {
        /** The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
        /** The word that is to be added or updated for the custom voice model. **/
        word: string;
        /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. **/
        translation: string;
        /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
        part_of_speech?: AddWordConstants.PartOfSpeech | string;
    }
    /** Constants for the `addWord` operation. **/
    namespace AddWordConstants {
        /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
        enum PartOfSpeech {
            JOSI = "Josi",
            MESI = "Mesi",
            KIGO = "Kigo",
            GOBI = "Gobi",
            DOSI = "Dosi",
            JODO = "Jodo",
            KOYU = "Koyu",
            STBI = "Stbi",
            SUJI = "Suji",
            KEDO = "Kedo",
            FUKU = "Fuku",
            KEYO = "Keyo",
            STTO = "Stto",
            RETA = "Reta",
            STZO = "Stzo",
            KATO = "Kato",
            HOKA = "Hoka",
        }
    }
    /** Parameters for the `addWords` operation. **/
    interface AddWordsParams {
        /** The GUID of the custom voice model that is to be updated. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
        /** An array of `CustomWord` objects that provides information about the words and their translations that are to be added or updated for the custom voice model. **/
        words: CustomWord[];
    }
    /** Parameters for the `deleteWord` operation. **/
    interface DeleteWordParams {
        /** The GUID of the custom voice model from which to delete a word. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
        /** The word that is to be deleted from the custom voice model. **/
        word: string;
    }
    /** Parameters for the `getWord` operation. **/
    interface GetWordParams {
        /** The GUID of the custom voice model from which to query a word. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
        /** The word that is to be queried from the custom voice model. **/
        word: string;
    }
    /** Parameters for the `listWords` operation. **/
    interface ListWordsParams {
        /** The GUID of the custom voice model that is to be queried. You must make the request with service credentials created for the instance of the service that owns the custom model. **/
        customization_id: string;
    }
    /*************************
     * model interfaces
     ************************/
    /** CustomWord. **/
    interface CustomWord {
        /** A word that is to be added or updated for the custom voice model. **/
        word: string;
        /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word. **/
        translation: string;
        /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
        part_of_speech?: string;
    }
    /** Pronunciation. **/
    interface Pronunciation {
        /** The pronunciation of the requested text in the specified voice and format. **/
        pronunciation: string;
    }
    /** SupportedFeatures. **/
    interface SupportedFeatures {
        /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `customizable`.). **/
        custom_pronunciation: boolean;
        /** If `true`, the voice can be transformed by using the SSML &lt;voice-transformation&gt; element; if `false`, the voice cannot be transformed. **/
        voice_transformation: boolean;
    }
    /** Translation. **/
    interface Translation {
        /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA translation or as an IBM SPR translation. A sounds-like is one or more words that, when combined, sound like the word. **/
        translation: string;
        /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
        part_of_speech?: string;
    }
    /** Voice. **/
    interface Voice {
        /** The URI of the voice. **/
        url: string;
        /** The gender of the voice: `male` or `female`. **/
        gender: string;
        /** The name of the voice. Use this as the voice identifier in all requests. **/
        name: string;
        /** The language and region of the voice (for example, `en-US`). **/
        language: string;
        /** A textual description of the voice. **/
        description: string;
        /** If `true`, the voice can be customized; if `false`, the voice cannot be customized. (Same as `custom_pronunciation`; maintained for backward compatibility.). **/
        customizable: boolean;
        /** Describes the additional service features supported with the voice. **/
        supported_features: SupportedFeatures;
        /** Returns information about a specified custom voice model. **Note:** This field is returned only when you list information about a specific voice and specify the GUID of a custom voice model that is based on that voice. **/
        customization?: VoiceModel;
    }
    /** VoiceModel. **/
    interface VoiceModel {
        /** The customization ID (GUID) of the custom voice model. **Note:** When you create a new custom voice model, the service returns only the GUID of the new custom model; it does not return the other fields of this object. **/
        customization_id: string;
        /** The name of the custom voice model. **/
        name?: string;
        /** The language identifier of the custom voice model (for example, `en-US`). **/
        language?: string;
        /** The GUID of the service credentials for the instance of the service that owns the custom voice model. **/
        owner?: string;
        /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was created. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
        created?: string;
        /** The date and time in Coordinated Universal Time (UTC) at which the custom voice model was last modified. Equals `created` when a new voice model is first added but has yet to be updated. The value is provided in full ISO 8601 format (`YYYY-MM-DDThh:mm:ss.sTZD`). **/
        last_modified?: string;
        /** The description of the custom voice model. **/
        description?: string;
        /** An array of words and their translations from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. **Note:** This field is returned only when you list information about a specific custom voice model. **/
        words?: Word[];
    }
    /** VoiceModels. **/
    interface VoiceModels {
        /** An array of `VoiceModel` objects that provides information about each available custom voice model. The array is empty if the requesting service credentials own no custom voice models (if no language is specified) or own no custom voice models for the specified language. **/
        customizations: VoiceModel[];
    }
    /** Voices. **/
    interface Voices {
        /** A list of available voices. **/
        voices: Voice[];
    }
    /** Word. **/
    interface Word {
        /** A word from the custom voice model. **/
        word: string;
        /** The phonetic or sounds-like translation for the word. A phonetic translation is based on the SSML format for representing the phonetic string of a word either as an IPA or IBM SPR translation. A sounds-like translation consists of one or more words that, when combined, sound like the word. **/
        translation: string;
        /** **Japanese only.** The part of speech for the word. The service uses the value to produce the correct intonation for the word. You can create only a single entry, with or without a single part of speech, for any word; you cannot create multiple entries with different parts of speech for the same word. For more information, see [Working with Japanese entries](https://console.bluemix.net/docs/services/text-to-speech/custom-rules.html#jaNotes). **/
        part_of_speech?: string;
    }
    /** Words. **/
    interface Words {
        /** An array of words and their translations from the custom voice model. The words are listed in alphabetical order, with uppercase letters listed before lowercase letters. The array is empty if the custom model contains no words. **/
        words: Word[];
    }
}
export = TextToSpeechV1;
