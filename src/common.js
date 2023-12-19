import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { REGISTER } from './registers.js'
import { Converter } from './converter.js'

function getFromByte(reg, converterFn) {
	/** @param {I2CAddressedBus} abus  */
	return async (abus, ...options) => {
		const buffer = await abus.readI2cBlock(reg, 1)
		return converterFn(buffer, ...options)
	}
}

function setToByte(reg, converterFn) {
	/** @param {I2CAddressedBus} abus  */
	return async (abus, profile) => {
		const buffer = converterFn(profile)
		return abus.writeI2cBlock(reg, buffer)
	}
}

export const Common = {
	getID: getFromByte(REGISTER.DEVID, Converter.decodeID),
	getBitrateAndPowerMode: getFromByte(REGISTER.BW_RATE, Converter.decodeBitrateAndPowerMode),
	getPowerControl: getFromByte(REGISTER.POWER_CTL, Converter.decodePowerControl),
	getInterruptSource: getFromByte(REGISTER.INT_SOURCE, Converter.decodeInterruptSource),
	getDataFormat: getFromByte(REGISTER.DATA_FORMAT, Converter.decodeDataFormat),
	getFIFOControl: getFromByte(REGISTER.FIFO_CTL, Converter.decodeFIFOControl),
	getFIFOStatus: getFromByte(REGISTER.FIFO_STATUS, Converter.decodeFIFOStatus),

	setDataFormat: setToByte(REGISTER.DATA_FORMAT, Converter.encodeDataFormat)
}

// export class Common {
// 	/** @param {I2CAddressedBus} abus  */
// 	static async getID(abus) {
// 		const buffer = abus.readI2cBlock(REGISTER.DEVID, 1)
// 		return Converter.decodeID(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getBitrateAndPowerMode(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.INT_SOURCE, 1)
// 		return Converter.decodeBitrateAndPowerMode(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getPowerControl(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.INT_SOURCE, 1)
// 		return Converter.decodePowerControl(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getInterruptSource(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.INT_SOURCE, 1)
// 		return Converter.decodeInterruptSource(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getDataFormat(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.DATA_FORMAT, 1)
// 		return Converter.decodeDataFormat(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async setDataFormat(abus, profile) {
// 		const buffer = Converter.encodeDataFormat(profile)
// 		return abus.writeI2cBlock(REGISTER.DATA_FORMAT, buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getFIFOControl(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.FIFO_CTL, 1)
// 		return Converter.decodeFIFOControl(buffer)
// 	}

// 	/** @param {I2CAddressedBus} abus  */
// 	static async getFIFOStatus(abus) {
// 		const buffer = await abus.readI2cBlock(REGISTER.FIFO_STATUS, 1)
// 		return Converter.decodeFIFOStatus(buffer)
// 	}

// }