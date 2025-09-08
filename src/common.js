import { REGISTER, REGISTER_BLOCK } from './registers.js'
import { Converter } from './converter.js'

/** @import { I2CAddressedBus } from '@johntalton/and-other-delights' */

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
	getShockThreshold: getFromByte(REGISTER.THRESH_SHOCK, Converter.decodeShockThreshold),
	getOffsetX: getFromByte(REGISTER.OFSX, Converter.decodeOffset),
	getOffsetY: getFromByte(REGISTER.OFSX, Converter.decodeOffset),
	getOffsetZ: getFromByte(REGISTER.OFSX, Converter.decodeOffset),
	getShockDuration: getFromByte(REGISTER.DUR, Converter.decodeShockDuration),
	getShockLatency: getFromByte(REGISTER.Latent, Converter.decodeShockLatency),
	getShockWindow: getFromByte(REGISTER.Window, Converter.decodeShockWindow),
	getActivityThreshold: getFromByte(REGISTER.THRESH_ACT, Converter.decodeActivityThreshold),
	getInactivityThreshold: getFromByte(REGISTER.THRESH_INACT, Converter.decodeInactivityThreshold),
	getInactivityTime: getFromByte(REGISTER.TIME_INACT, Converter.decodeInactivityTime),
	getActivityControl: getFromByte(REGISTER.ACT_INACT_CTL, Converter.decodeActivityControl),
	getShockAxes: getFromByte(REGISTER.SHOCK_AXES, Converter.decodeShockAxes),
	getShockStatus: getFromByte(REGISTER.ACT_SHOCK_STATUS, Converter.decodeShockStatus),
	getBitrateAndPowerMode: getFromByte(REGISTER.BW_RATE, Converter.decodeBitrateAndPowerMode),
	getPowerControl: getFromByte(REGISTER.POWER_CTL, Converter.decodePowerControl),

	getInterruptEnable: getFromByte(REGISTER.INT_ENABLE, Converter.decodeInterruptEnable),
	getInterruptMap: getFromByte(REGISTER.INT_MAP, Converter.decodeInterruptMap),
	getInterruptSource: getFromByte(REGISTER.INT_SOURCE, Converter.decodeInterruptSource),

	getDataFormat: getFromByte(REGISTER.DATA_FORMAT, Converter.decodeDataFormat),
	getFIFOControl: getFromByte(REGISTER.FIFO_CTL, Converter.decodeFIFOControl),
	getFIFOStatus: getFromByte(REGISTER.FIFO_STATUS, Converter.decodeFIFOStatus),

	getXYZ: async (abus) => {
		const buffer = await abus.readI2cBlock(REGISTER_BLOCK.DATA.START, REGISTER_BLOCK.DATA.LENGTH)
		return Converter.decodeXYZ(buffer)
	},

	//
	//
	//
	setShockThreshold: setToByte(REGISTER.THRESH_SHOCK, Converter.encodeShockThreshold),
	setOffsetX: setToByte(REGISTER.OFSX, Converter.encodeOffset),
	setOffsetY: setToByte(REGISTER.OFSY, Converter.encodeOffset),
	setOffsetZ: setToByte(REGISTER.OFSZ, Converter.encodeOffset),
	setShockDuration: setToByte(REGISTER.DUR, Converter.encodeShockDuration),
	setShockLatency: setToByte(REGISTER.Laten, Converter.encodeShockLatency),
	setShockWindow: setToByte(REGISTER.Window, Converter.encodeShockWindow),
	setActivityThreshold: setToByte(REGISTER.THRESH_ACT, Converter.encodeActivityThreshold),
	setInactivityThreshold: setToByte(REGISTER.THRESH_INACT, Converter.encodeInactivityThreshold),
	setInactivityTime: setToByte(REGISTER.TIME_INACT, Converter.encodeInactivityTime),
	setActivityControl: setToByte(REGISTER.ACT_INACT_CTL, Converter.encodeActivityControl),
	setShockAxes: setToByte(REGISTER.SHOCK_AXES, Converter.encodeShockAxes),
	setBitrateAndPowerMode: setToByte(REGISTER.BW_RATE, Converter.encodeBitrateAndPowerMode),
	setPowerControl: setToByte(REGISTER.POWER_CTL, Converter.encodePowerControl),
	setInterruptEnabled: setToByte(REGISTER.INT_ENABLE, Converter.encodeInterruptEnabled),
	setInterruptMap: setToByte(REGISTER.INT_MAP, Converter.encodeInterruptMap),
	setDataFormat: setToByte(REGISTER.DATA_FORMAT, Converter.encodeDataFormat),
	setFIFOControl: setToByte(REGISTER.FIFO_CTL, Converter.encodeFIFOControl)
}
