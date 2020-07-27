const logger = require('log4js').getLogger('etherscanner');
const Geth = require('./geth.js');

class EtherScanner {

	/**
	 *
	 * @param HttpProvider
	 * @param loggerLevel
	 */
	constructor(web3, loggerLevel = 'OFF') {
		logger.level = loggerLevel;
		this.requestId = 1;
		this.node = new Geth(web3);
	}
}

module.exports = (HttpProvider, loggerLevel) => {
	let scanner = new EtherScanner(HttpProvider, loggerLevel);

	return {
		scanBlock: scanner.node.scanBlock.bind(scanner.node),
		scanTransaction: scanner.node.scanTransaction.bind(scanner.node),
	}
};

/**
 * @typedef {object} etherscannerObj
 * @property {String} hash
 * @property {String} from
 * @property {String} to
 * @property {Number} value
 * @property {Number} blockNumber
 * @property {String} blockHash
 * @property {Boolean} isInternal
 * @property {String} type
 */