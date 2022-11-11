"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var glob_1 = require("glob");
var node_1 = require("@gitbeaker/node");
var child_process_1 = require("child_process");
/**
 * A global OOP-style GitLab CI configurator.
 */
var Config = /** @class */ (function () {
    function Config() {
        /**
         * Holding the complete GitLab CI configuration as plain object instead
         * of classes so all is done within this class.
         */
        this.plain = {};
        /**
         * See macro() method.
         */
        this.macros = {};
        /**
         * See patch() method.
         */
        this.patchers = [];
    }
    Object.defineProperty(Config.prototype, "api", {
        /**
         * Get the REST API handler.
         *
         * @see https://www.npmjs.com/package/node-gitlab
         */
        get: function () {
            if (!this.gapi) {
                var _a = process.env, CI_JOB_TOKEN = _a.CI_JOB_TOKEN, GITLAB_TOKEN = _a.GITLAB_TOKEN, CI_SERVER_URL = _a.CI_SERVER_URL;
                this.gapi = new node_1.Gitlab(__assign(__assign({ host: CI_SERVER_URL, token: GITLAB_TOKEN }, (GITLAB_TOKEN ? {} : { jobToken: CI_JOB_TOKEN })), { rejectUnauthorized: true }));
            }
            return this.gapi;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * The top-level `workflow:` key applies to the entirety of a pipeline, and will determine whether
     * or not a pipeline is created. It currently accepts a single `rules:` key that operates similarly
     * to `rules:` defined within jobs, enabling dynamic configuration of the pipeline.
     */
    Config.prototype.workflow = function (workflow) {
        if (!this.plain.workflow) {
            this.plain.workflow = { rules: [] };
        }
        this.plain.workflow = (0, deepmerge_1.default)(this.plain.workflow, workflow);
    };
    /**
     * `stages` is used to define stages that can be used by jobs and is defined globally.
     *
     * @see https://devowl.io/knowledge-base/success-message-but-when-reloading-the-page-i-do-not-see-a-new-item/
     */
    Config.prototype.stages = function () {
        var _a;
        var stages = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            stages[_i] = arguments[_i];
        }
        if (!this.plain.stages) {
            this.plain.stages = [];
        }
        (_a = this.plain.stages).push.apply(_a, stages);
    };
    /**
     * Some parameters can be set globally as the default for all jobs using the `default:` keyword.
     * Default parameters can then be overridden by job-specific configuration.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#global-defaults
     */
    Config.prototype.defaults = function (defaults) {
        if (!this.plain.default) {
            this.plain.default = {};
        }
        this.plain.default = (0, deepmerge_1.default)(this.plain.default, defaults);
    };
    /**
     * GitLab CI/CD allows you to define variables inside .gitlab-ci.yml that are then passed in the job environment.
     * They can be set globally and per-job. When the variables keyword is used on a job level, it will override the global YAML
     * variables and predefined ones of the same name.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#variables
     */
    Config.prototype.variable = function (key, value) {
        if (!this.plain.variables) {
            this.plain.variables = {};
        }
        this.plain.variables[key] = value;
    };
    /**
     * Get variable from job.
     */
    Config.prototype.getVariable = function (job, key) {
        var _a, _b;
        var jobVariable = (_a = this.plain.jobs[job]) === null || _a === void 0 ? void 0 : _a.variables[key];
        if (jobVariable !== undefined) {
            return jobVariable;
        }
        return (_b = this.plain.variables) === null || _b === void 0 ? void 0 : _b[key];
    };
    /**
     * Register a macro. A macro can be used to define jobs from a given variable map.
     *
     * @param key
     * @param callback
     */
    Config.prototype.macro = function (key, callback) {
        if (this.macros[key]) {
            throw new Error("Macro ".concat(key, " already defined! You are not allowed to overwrite it."));
        }
        this.macros[key] = callback;
    };
    /**
     * Apply a macro.
     *
     * @param key
     * @param args
     */
    Config.prototype.from = function (key, args) {
        if (!this.macros[key]) {
            throw new Error("Macro ".concat(key, " not found, please register it with Config#macro! Consider also, that you need to register the macro before you execute from it."));
        }
        this.macros[key](this, args);
    };
    /**
     * Allows to run a callback on the resulting GitLab CI Yaml object (after recursively applying
     * extends and macros).
     */
    Config.prototype.patch = function (callback) {
        this.patchers.push(callback);
    };
    /**
     * A job is defined as a list of parameters that define the job’s behavior.
     *
     * @see https://docs.gitlab.com/ee/ci/yaml/#configuration-parameters
     * @param name The new job name
     * @param job Job definition
     * @param hidden See https://docs.gitlab.com/ee/ci/yaml/#hide-jobs for more infos
     */
    Config.prototype.job = function (name, job, hidden) {
        if (hidden === void 0) { hidden = false; }
        if (!this.plain.jobs) {
            this.plain.jobs = {};
        }
        var useName = hidden && !name.startsWith(".") ? ".".concat(name) : name;
        if (!this.plain.jobs[useName]) {
            this.plain.jobs[useName] = job;
            console.log("Job \"".concat(useName, "\" created successfully!"));
        }
        else {
            console.info("Job \"".concat(useName, "\" already exists, skipping..."));
        }
    };
    /**
     * Similar to [`extends`](https://docs.gitlab.com/ee/ci/yaml/#extends) but it uses
     * a deep-merge mechanism instead of the built-in extend functionality of GitLab CI.
     * This ensures more granular configuration!
     *
     * @param fromName The job name you want to extend from
     * @param name The new job name
     * @param job Job definition
     * @param hidden See https://docs.gitlab.com/ee/ci/yaml/#hide-jobs for more infos
     */
    Config.prototype.extends = function (fromName, name, job, hidden) {
        if (hidden === void 0) { hidden = false; }
        this.job(name, (0, deepmerge_1.default)(job, { extends: Array.isArray(fromName) ? fromName : [fromName] }), hidden);
    };
    /**
     * Include further `.ts` configurations by a glob. This is similar to [`include:local`](https://docs.gitlab.com/ee/ci/yaml/#includelocal)
     * but this implementation should be used instead!
     *
     * @param cwd Current working directy, use `process.cwd()`
     * @param globs See https://www.npmjs.com/package/glob for more information
     */
    Config.prototype.include = function (cwd, globs) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, globs_1, glob, files, _a, files_1, file, exported;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, globs_1 = globs;
                        _b.label = 1;
                    case 1:
                        if (!(_i < globs_1.length)) return [3 /*break*/, 7];
                        glob = globs_1[_i];
                        files = (0, glob_1.sync)(glob, {
                            absolute: true,
                            cwd: cwd,
                            dot: true,
                        });
                        _a = 0, files_1 = files;
                        _b.label = 2;
                    case 2:
                        if (!(_a < files_1.length)) return [3 /*break*/, 6];
                        file = files_1[_a];
                        console.log("Include file \"".concat(file, "...\""));
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require(file)); })];
                    case 3:
                        exported = _b.sent();
                        if (!(exported === null || exported === void 0 ? void 0 : exported.extendConfig)) {
                            throw new Error("Please export a function extendConfig which returns a Config instance!");
                        }
                        if (!(exported.extendConfig instanceof Function)) {
                            throw new Error("The exported extendConfig is not a function!");
                        }
                        return [4 /*yield*/, exported.extendConfig(this)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _a++;
                        return [3 /*break*/, 2];
                    case 6:
                        _i++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the whole configuration as yaml-serializable object.
     */
    Config.prototype.getPlainObject = function () {
        var copy = JSON.parse(JSON.stringify(this.plain));
        this.resolveExtends(copy);
        this.clear(copy);
        for (var _i = 0, _a = this.patchers; _i < _a.length; _i++) {
            var patcher = _a[_i];
            patcher(copy);
        }
        // Move jobs to root
        copy = __assign(__assign({}, copy), copy.jobs);
        delete copy.jobs;
        return copy;
    };
    /**
     * Check if files got changed by a commit by a regexp. E. g. `^\.vscode\/launch\.json$`.
     */
    Config.prototype.hasChanged = function (regexp, sha, cwd) {
        if (cwd === void 0) { cwd = process.cwd(); }
        return __awaiter(this, void 0, void 0, function () {
            var useSha, list;
            return __generator(this, function (_a) {
                useSha = sha ||
                    process.env.CI_COMMIT_SHA ||
                    (0, child_process_1.execSync)("git rev-parse HEAD", {
                        encoding: "utf-8",
                        cwd: cwd,
                    });
                list = (0, child_process_1.execSync)("git diff-tree --no-commit-id --name-only -r " + useSha, {
                    encoding: "utf-8",
                    cwd: cwd,
                }).toString();
                if (!regexp) {
                    return [2 /*return*/, list.split("\n")];
                }
                return [2 /*return*/, regexp.test(list)];
            });
        });
    };
    Config.prototype.recursivelyExtend = function (pipeline, firstJob, job) {
        var _a, _b;
        if (job === void 0) { job = firstJob; }
        if (job.extends) {
            if (!job.needsExtends) {
                job.needsExtends = [];
            }
            for (var _i = 0, _c = job.extends; _i < _c.length; _i++) {
                var from = _c[_i];
                var jobKey = void 0;
                if ((_a = pipeline.jobs) === null || _a === void 0 ? void 0 : _a[from]) {
                    jobKey = from;
                }
                else if ((_b = pipeline.jobs) === null || _b === void 0 ? void 0 : _b[".".concat(from)]) {
                    jobKey = ".".concat(from);
                }
                if (!jobKey) {
                    console.warn("The job \"".concat(from, "\" does not exist, skipping..."));
                    continue;
                }
                var jobObj = pipeline.jobs[jobKey];
                firstJob.needsExtends.unshift(from);
                this.recursivelyExtend(pipeline, firstJob, jobObj);
            }
        }
    };
    /**
     * Resolves all `extends` and puts it in correct order.
     *
     * @param pipeline
     */
    Config.prototype.resolveExtends = function (pipeline) {
        var _a;
        var jobIds = Object.keys((_a = pipeline.jobs) !== null && _a !== void 0 ? _a : {});
        for (var _i = 0, jobIds_1 = jobIds; _i < jobIds_1.length; _i++) {
            var key = jobIds_1[_i];
            var job = pipeline.jobs[key];
            if (job.extends && !key.startsWith(".")) {
                this.recursivelyExtend(pipeline, job);
                var result = {};
                var needsExtends = job.needsExtends;
                for (var _b = 0, needsExtends_1 = needsExtends; _b < needsExtends_1.length; _b++) {
                    var extendKey = needsExtends_1[_b];
                    result = (0, deepmerge_1.default)(result, pipeline.jobs[extendKey]);
                }
                // The main job definition has highest priority
                pipeline.jobs[key] = (0, deepmerge_1.default)(result, job);
            }
        }
    };
    /**
     * Clear temporary hold variables.
     *
     * @param pipeline
     */
    Config.prototype.clear = function (pipeline) {
        var _a;
        // Finally, remove all existing `extends`
        var jobIds = Object.keys((_a = pipeline.jobs) !== null && _a !== void 0 ? _a : {});
        for (var _i = 0, jobIds_2 = jobIds; _i < jobIds_2.length; _i++) {
            var key = jobIds_2[_i];
            var job = pipeline.jobs[key];
            if (job.extends) {
                job.extends = job.extends.filter(function (job) { return jobIds.indexOf(job) === -1; });
                if (!job.extends.length) {
                    delete job.extends;
                    delete job.needsExtends;
                }
            }
        }
    };
    return Config;
}());
exports.Config = Config;
