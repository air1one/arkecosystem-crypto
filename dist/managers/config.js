"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configManager = exports.ConfigManager = void 0;
const deepmerge_1 = __importDefault(require("deepmerge"));
const lodash_get_1 = __importDefault(require("lodash.get"));
const lodash_set_1 = __importDefault(require("lodash.set"));
const errors_1 = require("../errors");
const networks = __importStar(require("../networks"));
class ConfigManager {
    constructor() {
        this.setConfig(networks.devnet);
    }
    setConfig(config) {
        this.config = {
            network: config.network,
            exceptions: config.exceptions,
            milestones: config.milestones,
            genesisBlock: config.genesisBlock,
        };
        this.validateMilestones();
        this.buildConstants();
    }
    setFromPreset(network) {
        this.setConfig(this.getPreset(network));
    }
    getPreset(network) {
        return networks[network.toLowerCase()];
    }
    all() {
        return this.config;
    }
    set(key, value) {
        if (!this.config) {
            throw new Error();
        }
        lodash_set_1.default(this.config, key, value);
    }
    get(key) {
        return lodash_get_1.default(this.config, key);
    }
    setHeight(value) {
        this.height = value;
    }
    getHeight() {
        return this.height;
    }
    isNewMilestone(height) {
        height = height || this.height;
        if (!this.milestones) {
            throw new Error();
        }
        return this.milestones.some((milestone) => milestone.height === height);
    }
    getMilestone(height) {
        if (!this.milestone || !this.milestones) {
            throw new Error();
        }
        if (!height && this.height) {
            height = this.height;
        }
        if (!height) {
            height = 1;
        }
        while (this.milestone.index < this.milestones.length - 1 &&
            height >= this.milestones[this.milestone.index + 1].height) {
            this.milestone.index++;
            this.milestone.data = this.milestones[this.milestone.index];
        }
        while (height < this.milestones[this.milestone.index].height) {
            this.milestone.index--;
            this.milestone.data = this.milestones[this.milestone.index];
        }
        return this.milestone.data;
    }
    getNextMilestoneWithNewKey(previousMilestone, key) {
        if (!this.milestones || !this.milestones.length) {
            throw new Error(`Attempted to get next milestone but none were set`);
        }
        for (let i = 0; i < this.milestones.length; i++) {
            const milestone = this.milestones[i];
            if (milestone[key] &&
                milestone[key] !== this.getMilestone(previousMilestone)[key] &&
                milestone.height > previousMilestone) {
                return {
                    found: true,
                    height: milestone.height,
                    data: milestone[key],
                };
            }
        }
        return {
            found: false,
            height: previousMilestone,
            data: null,
        };
    }
    getMilestones() {
        return this.milestones;
    }
    buildConstants() {
        if (!this.config) {
            throw new Error();
        }
        this.milestones = this.config.milestones.sort((a, b) => a.height - b.height);
        this.milestone = {
            index: 0,
            data: this.milestones[0],
        };
        let lastMerged = 0;
        const overwriteMerge = (dest, source, options) => source;
        while (lastMerged < this.milestones.length - 1) {
            this.milestones[lastMerged + 1] = deepmerge_1.default(this.milestones[lastMerged], this.milestones[lastMerged + 1], {
                arrayMerge: overwriteMerge,
            });
            lastMerged++;
        }
    }
    validateMilestones() {
        if (!this.config) {
            throw new Error();
        }
        const delegateMilestones = this.config.milestones
            .sort((a, b) => a.height - b.height)
            .filter((milestone) => milestone.activeDelegates);
        for (let i = 1; i < delegateMilestones.length; i++) {
            const previous = delegateMilestones[i - 1];
            const current = delegateMilestones[i];
            if (previous.activeDelegates === current.activeDelegates) {
                continue;
            }
            if ((current.height - previous.height) % previous.activeDelegates !== 0) {
                throw new errors_1.InvalidMilestoneConfigurationError(`Bad milestone at height: ${current.height}. The number of delegates can only be changed at the beginning of a new round.`);
            }
        }
    }
}
exports.ConfigManager = ConfigManager;
exports.configManager = new ConfigManager();
//# sourceMappingURL=config.js.map