/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.model = (function() {

    /**
     * Namespace model.
     * @exports model
     * @namespace
     */
    var model = {};

    model.Payload = (function() {

        /**
         * Properties of a Payload.
         * @memberof model
         * @interface IPayload
         * @property {model.Payload.Action|null} [action] Payload action
         * @property {model.IUploadKycParams|null} [uploadKycData] Payload uploadKycData
         * @property {model.IVerifyKycParams|null} [verifyKycData] Payload verifyKycData
         */

        /**
         * Constructs a new Payload.
         * @memberof model
         * @classdesc Represents a Payload.
         * @implements IPayload
         * @constructor
         * @param {model.IPayload=} [properties] Properties to set
         */
        function Payload(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Payload action.
         * @member {model.Payload.Action} action
         * @memberof model.Payload
         * @instance
         */
        Payload.prototype.action = 0;

        /**
         * Payload uploadKycData.
         * @member {model.IUploadKycParams|null|undefined} uploadKycData
         * @memberof model.Payload
         * @instance
         */
        Payload.prototype.uploadKycData = null;

        /**
         * Payload verifyKycData.
         * @member {model.IVerifyKycParams|null|undefined} verifyKycData
         * @memberof model.Payload
         * @instance
         */
        Payload.prototype.verifyKycData = null;

        /**
         * Creates a new Payload instance using the specified properties.
         * @function create
         * @memberof model.Payload
         * @static
         * @param {model.IPayload=} [properties] Properties to set
         * @returns {model.Payload} Payload instance
         */
        Payload.create = function create(properties) {
            return new Payload(properties);
        };

        /**
         * Encodes the specified Payload message. Does not implicitly {@link model.Payload.verify|verify} messages.
         * @function encode
         * @memberof model.Payload
         * @static
         * @param {model.IPayload} message Payload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Payload.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.action != null && message.hasOwnProperty("action"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
            if (message.uploadKycData != null && message.hasOwnProperty("uploadKycData"))
                $root.model.UploadKycParams.encode(message.uploadKycData, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.verifyKycData != null && message.hasOwnProperty("verifyKycData"))
                $root.model.VerifyKycParams.encode(message.verifyKycData, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Payload message, length delimited. Does not implicitly {@link model.Payload.verify|verify} messages.
         * @function encodeDelimited
         * @memberof model.Payload
         * @static
         * @param {model.IPayload} message Payload message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Payload.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Payload message from the specified reader or buffer.
         * @function decode
         * @memberof model.Payload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {model.Payload} Payload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Payload.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.Payload();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.action = reader.int32();
                    break;
                case 2:
                    message.uploadKycData = $root.model.UploadKycParams.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.verifyKycData = $root.model.VerifyKycParams.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Payload message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof model.Payload
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {model.Payload} Payload
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Payload.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Payload message.
         * @function verify
         * @memberof model.Payload
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Payload.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.action != null && message.hasOwnProperty("action"))
                switch (message.action) {
                default:
                    return "action: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.uploadKycData != null && message.hasOwnProperty("uploadKycData")) {
                var error = $root.model.UploadKycParams.verify(message.uploadKycData);
                if (error)
                    return "uploadKycData." + error;
            }
            if (message.verifyKycData != null && message.hasOwnProperty("verifyKycData")) {
                var error = $root.model.VerifyKycParams.verify(message.verifyKycData);
                if (error)
                    return "verifyKycData." + error;
            }
            return null;
        };

        /**
         * Creates a Payload message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof model.Payload
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {model.Payload} Payload
         */
        Payload.fromObject = function fromObject(object) {
            if (object instanceof $root.model.Payload)
                return object;
            var message = new $root.model.Payload();
            switch (object.action) {
            case "UPLOAD_KYC_DATA":
            case 0:
                message.action = 0;
                break;
            case "VERIFY_KYC_DATA":
            case 1:
                message.action = 1;
                break;
            }
            if (object.uploadKycData != null) {
                if (typeof object.uploadKycData !== "object")
                    throw TypeError(".model.Payload.uploadKycData: object expected");
                message.uploadKycData = $root.model.UploadKycParams.fromObject(object.uploadKycData);
            }
            if (object.verifyKycData != null) {
                if (typeof object.verifyKycData !== "object")
                    throw TypeError(".model.Payload.verifyKycData: object expected");
                message.verifyKycData = $root.model.VerifyKycParams.fromObject(object.verifyKycData);
            }
            return message;
        };

        /**
         * Creates a plain object from a Payload message. Also converts values to other types if specified.
         * @function toObject
         * @memberof model.Payload
         * @static
         * @param {model.Payload} message Payload
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Payload.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.action = options.enums === String ? "UPLOAD_KYC_DATA" : 0;
                object.uploadKycData = null;
                object.verifyKycData = null;
            }
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = options.enums === String ? $root.model.Payload.Action[message.action] : message.action;
            if (message.uploadKycData != null && message.hasOwnProperty("uploadKycData"))
                object.uploadKycData = $root.model.UploadKycParams.toObject(message.uploadKycData, options);
            if (message.verifyKycData != null && message.hasOwnProperty("verifyKycData"))
                object.verifyKycData = $root.model.VerifyKycParams.toObject(message.verifyKycData, options);
            return object;
        };

        /**
         * Converts this Payload to JSON.
         * @function toJSON
         * @memberof model.Payload
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Payload.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Action enum.
         * @name model.Payload.Action
         * @enum {string}
         * @property {number} UPLOAD_KYC_DATA=0 UPLOAD_KYC_DATA value
         * @property {number} VERIFY_KYC_DATA=1 VERIFY_KYC_DATA value
         */
        Payload.Action = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "UPLOAD_KYC_DATA"] = 0;
            values[valuesById[1] = "VERIFY_KYC_DATA"] = 1;
            return values;
        })();

        return Payload;
    })();

    model.UploadKycParams = (function() {

        /**
         * Properties of an UploadKycParams.
         * @memberof model
         * @interface IUploadKycParams
         * @property {string} id UploadKycParams id
         * @property {string} name UploadKycParams name
         * @property {string} bankname UploadKycParams bankname
         */

        /**
         * Constructs a new UploadKycParams.
         * @memberof model
         * @classdesc Represents an UploadKycParams.
         * @implements IUploadKycParams
         * @constructor
         * @param {model.IUploadKycParams=} [properties] Properties to set
         */
        function UploadKycParams(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UploadKycParams id.
         * @member {string} id
         * @memberof model.UploadKycParams
         * @instance
         */
        UploadKycParams.prototype.id = "";

        /**
         * UploadKycParams name.
         * @member {string} name
         * @memberof model.UploadKycParams
         * @instance
         */
        UploadKycParams.prototype.name = "";

        /**
         * UploadKycParams bankname.
         * @member {string} bankname
         * @memberof model.UploadKycParams
         * @instance
         */
        UploadKycParams.prototype.bankname = "";

        /**
         * Creates a new UploadKycParams instance using the specified properties.
         * @function create
         * @memberof model.UploadKycParams
         * @static
         * @param {model.IUploadKycParams=} [properties] Properties to set
         * @returns {model.UploadKycParams} UploadKycParams instance
         */
        UploadKycParams.create = function create(properties) {
            return new UploadKycParams(properties);
        };

        /**
         * Encodes the specified UploadKycParams message. Does not implicitly {@link model.UploadKycParams.verify|verify} messages.
         * @function encode
         * @memberof model.UploadKycParams
         * @static
         * @param {model.IUploadKycParams} message UploadKycParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UploadKycParams.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            writer.uint32(/* id 3, wireType 2 =*/26).string(message.bankname);
            return writer;
        };

        /**
         * Encodes the specified UploadKycParams message, length delimited. Does not implicitly {@link model.UploadKycParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof model.UploadKycParams
         * @static
         * @param {model.IUploadKycParams} message UploadKycParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UploadKycParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UploadKycParams message from the specified reader or buffer.
         * @function decode
         * @memberof model.UploadKycParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {model.UploadKycParams} UploadKycParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UploadKycParams.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.UploadKycParams();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.bankname = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("name"))
                throw $util.ProtocolError("missing required 'name'", { instance: message });
            if (!message.hasOwnProperty("bankname"))
                throw $util.ProtocolError("missing required 'bankname'", { instance: message });
            return message;
        };

        /**
         * Decodes an UploadKycParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof model.UploadKycParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {model.UploadKycParams} UploadKycParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UploadKycParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UploadKycParams message.
         * @function verify
         * @memberof model.UploadKycParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UploadKycParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.id))
                return "id: string expected";
            if (!$util.isString(message.name))
                return "name: string expected";
            if (!$util.isString(message.bankname))
                return "bankname: string expected";
            return null;
        };

        /**
         * Creates an UploadKycParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof model.UploadKycParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {model.UploadKycParams} UploadKycParams
         */
        UploadKycParams.fromObject = function fromObject(object) {
            if (object instanceof $root.model.UploadKycParams)
                return object;
            var message = new $root.model.UploadKycParams();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            if (object.bankname != null)
                message.bankname = String(object.bankname);
            return message;
        };

        /**
         * Creates a plain object from an UploadKycParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof model.UploadKycParams
         * @static
         * @param {model.UploadKycParams} message UploadKycParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UploadKycParams.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
                object.bankname = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.bankname != null && message.hasOwnProperty("bankname"))
                object.bankname = message.bankname;
            return object;
        };

        /**
         * Converts this UploadKycParams to JSON.
         * @function toJSON
         * @memberof model.UploadKycParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UploadKycParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UploadKycParams;
    })();

    model.VerifyKycParams = (function() {

        /**
         * Properties of a VerifyKycParams.
         * @memberof model
         * @interface IVerifyKycParams
         * @property {string} id VerifyKycParams id
         * @property {string} status VerifyKycParams status
         */

        /**
         * Constructs a new VerifyKycParams.
         * @memberof model
         * @classdesc Represents a VerifyKycParams.
         * @implements IVerifyKycParams
         * @constructor
         * @param {model.IVerifyKycParams=} [properties] Properties to set
         */
        function VerifyKycParams(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VerifyKycParams id.
         * @member {string} id
         * @memberof model.VerifyKycParams
         * @instance
         */
        VerifyKycParams.prototype.id = "";

        /**
         * VerifyKycParams status.
         * @member {string} status
         * @memberof model.VerifyKycParams
         * @instance
         */
        VerifyKycParams.prototype.status = "";

        /**
         * Creates a new VerifyKycParams instance using the specified properties.
         * @function create
         * @memberof model.VerifyKycParams
         * @static
         * @param {model.IVerifyKycParams=} [properties] Properties to set
         * @returns {model.VerifyKycParams} VerifyKycParams instance
         */
        VerifyKycParams.create = function create(properties) {
            return new VerifyKycParams(properties);
        };

        /**
         * Encodes the specified VerifyKycParams message. Does not implicitly {@link model.VerifyKycParams.verify|verify} messages.
         * @function encode
         * @memberof model.VerifyKycParams
         * @static
         * @param {model.IVerifyKycParams} message VerifyKycParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerifyKycParams.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.status);
            return writer;
        };

        /**
         * Encodes the specified VerifyKycParams message, length delimited. Does not implicitly {@link model.VerifyKycParams.verify|verify} messages.
         * @function encodeDelimited
         * @memberof model.VerifyKycParams
         * @static
         * @param {model.IVerifyKycParams} message VerifyKycParams message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerifyKycParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VerifyKycParams message from the specified reader or buffer.
         * @function decode
         * @memberof model.VerifyKycParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {model.VerifyKycParams} VerifyKycParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerifyKycParams.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.model.VerifyKycParams();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.status = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            if (!message.hasOwnProperty("id"))
                throw $util.ProtocolError("missing required 'id'", { instance: message });
            if (!message.hasOwnProperty("status"))
                throw $util.ProtocolError("missing required 'status'", { instance: message });
            return message;
        };

        /**
         * Decodes a VerifyKycParams message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof model.VerifyKycParams
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {model.VerifyKycParams} VerifyKycParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerifyKycParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VerifyKycParams message.
         * @function verify
         * @memberof model.VerifyKycParams
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VerifyKycParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (!$util.isString(message.id))
                return "id: string expected";
            if (!$util.isString(message.status))
                return "status: string expected";
            return null;
        };

        /**
         * Creates a VerifyKycParams message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof model.VerifyKycParams
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {model.VerifyKycParams} VerifyKycParams
         */
        VerifyKycParams.fromObject = function fromObject(object) {
            if (object instanceof $root.model.VerifyKycParams)
                return object;
            var message = new $root.model.VerifyKycParams();
            if (object.id != null)
                message.id = String(object.id);
            if (object.status != null)
                message.status = String(object.status);
            return message;
        };

        /**
         * Creates a plain object from a VerifyKycParams message. Also converts values to other types if specified.
         * @function toObject
         * @memberof model.VerifyKycParams
         * @static
         * @param {model.VerifyKycParams} message VerifyKycParams
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VerifyKycParams.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = "";
                object.status = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.status != null && message.hasOwnProperty("status"))
                object.status = message.status;
            return object;
        };

        /**
         * Converts this VerifyKycParams to JSON.
         * @function toJSON
         * @memberof model.VerifyKycParams
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VerifyKycParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VerifyKycParams;
    })();

    return model;
})();

module.exports = $root;
