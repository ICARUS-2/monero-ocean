const COINS = {
	18081: {
		name: "XMR",
		divisor: 1000000000000,
		url: "https://xmrchain.net",
		time: 120,
	},
	//18181: {
	//	name: "XMC",
	//	divisor: 1000000000000,
	//	url: "http://explorer.monero-classic.org",
	//	time: 120,
	//},
	19734: {
		name: "SUMO",
		divisor: 1000000000,
		url: "https://explorer.sumokoin.com",
		time: 240,
	},
	12211: {
		name: "RYO",
		divisor: 1000000000,
		url: "https://explorer.ryo-currency.com",
		time: 240,
	},
	18981: {
		name: "GRFT",
		divisor: 10000000000,
		url: "https://blockexplorer.graft.network",
		time: 120,
	},
	38081: {
		name: "MSR",
		divisor: 1000000000000,
		url: "https://explorer.getmasari.org",
		time: 60,
	},
	48782: {	
		name: "LTHN",
		divisor: 100000000,
		url: "https://lethean.io/explorer",
		time: 120,
	},
	19281: {
		name: "XMV",
		divisor: 100000000000,
		url: "https://explorer.monerov.online",
		time: 60,
		unit: "G",
		factor: 16,
	},
	9231: {
		name: "XEQ",
		divisor: 10000,
		url: "https://explorer.equilibria.network",
		time: 120,
	},
	19950: {
		name: "XWP",
		divisor: 1000000000000,
		url: "https://explorer.xwp.one",
		time: 15,
		unit: "G",
		factor: 32,
	},
	8766: {
		name: "RVN",
		divisor: 100000000,
		url: "https://ravencoin.network",
		time: 60,
		unit: "H",
		factor: 0xFFFFFFFFFFFFFFFF / 0xFF000000,
	},
	9998: {
		name: "RTM",
		divisor: 100000000,
		url: "https://explorer.raptoreum.com",
		time: 120,
	},
	9053: {
		name: "ERG",
		divisor: 1000000000,
		url: "https://explorer.ergoplatform.com/en",
		time: 120,
		unit: "H",
		factor: 1,
	},
	8545: {
		name: "ETH",
		divisor: 1000000000000000000,
		url: "https://etherscan.io",
		time: 13,
		unit: "H",
		factor: 1,
	},
	8645: {
		name: "ETC",
		divisor: 1000000000000000000,
		url: "https://etcblockexplorer.com",
		time: 13,
		unit: "H",
		factor: 1,
	},

	//11181: {
	//	name: "AEON",
	//	divisor: 1000000000000,
	//	url: "https://aeonblockexplorer.com",
	//	time: 240,
	//},
	17750: {
		name: "XHV",
		divisor: 1000000000000,
		url: "https://explorer.havenprotocol.org",
		time: 120,
	},
	20206: {
		name: "DERO",
		divisor: 100000,
		url: "https://explorer.dero.io",
		time: 18,
	},
	25182: {
		name: "TUBE",
		divisor: 1000000000,
		url: "https://explorer.bittube.cash",
		time: 15,
		unit: "G",
		factor: 40,
	},
	11812: {
		name: "XLA",
		divisor: 100,
		url: "https://explorer.scalaproject.io",
		time: 120,
	},
	33124: {
		name: "XTNC",
		divisor: 1000000000,
		url: "https://explorer.xtendcash.com",
		time: 120,
		unit: "G",
		factor: 32,
	},
	11898: {
		name: "TRTL",
		divisor: 100,
		url: "https://explorer.turtlecoin.lol",
		time: 30,
	},
	2086: {
		name: "BLOC",
		divisor: 10000,
		url: "https://bloc-explorer.com",
		time: 120,
	},
	13007: {
		name: "IRD",
		divisor: 100000000,
		url: "https://explorer.ird.cash",
		time: 175,
	},
	19994: {
		name: "ARQ",
		divisor: 1000000000,
		url: "https://explorer.arqma.com",
		time: 120,
	},
	16000: {
		name: "CCX",
		divisor: 1000000,
		url: "https://explorer.conceal.network",
		time: 120,
	},
};


const getMoneroPort = (): number =>
{
	return 18081;
}

const getPortsArray = (): string[] =>
{
	return Object.keys(COINS).map( a=>a )
}

const getDataByPort = (port: number): any | null =>
{
	//@ts-ignore
	return COINS[port];
}

export {
	COINS,
	getPortsArray,
	getMoneroPort,
	getDataByPort
}