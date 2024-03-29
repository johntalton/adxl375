export const DEVICE_ID =  0xE5

export const DATA_FORMAT_FIXED_VALUE = 0b000001011

export const MODE_SHIFT = 6

export const MASK = {
	DATA_FORMAT: {
		FIXED: 0b0001_1011,
		SELF_TEST: 0b1000_0000,
		SPI: 0b0100_0000,
		INT_POL: 0b0010_0000,
		JUSTIFY: 0b0000_0100
	},
	FIFO_STATUS: {
		TRIGGER: 0b1000_0000,
		ENTRIES: 0b0011_1111
	},
	FIFO_CONTROL: {
		MODE: 0b1100_0000,
		TRIGGER_LINK_INT2: 0b0010_0000,
		SAMPLES: 0b0001_1111
	},
	BW_POWER_MODE: {
		LOW_POWER: 0b0001_0000 ,
		RATE: 0b0000_1111
	},
	POWER_CONTROL: {
		LINK: 0b0010_0000,
		AUTO_SLEEP: 0b0001_0000,
		MEASURE: 0b0000_1000,
		SLEEP: 0b0000_0100,
		WAKEUP: 0b0000_0011,
	}
}


function decodeByte(buffer) {
	const u8 = ArrayBuffer.isView(buffer) ?
			new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new Uint8Array(buffer)

	return u8[0]
}

export class Converter {
	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeID(buffer) {
		const value = decodeByte(buffer)
		const id = value
		const valid = id === DEVICE_ID

		return {
			id, valid
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockThreshold(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeOffset(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return { value }
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockDuration(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockLatency(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockWindow(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeActivityThreshold(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInactivityThreshold(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInactivityTime(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeActivityControl(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockAxes(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeShockStatus(buffer) {
		const value = decodeByte(buffer)
		// TODO
		return {value}
	}


	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeBitrateAndPowerMode(buffer) {
		const value = decodeByte(buffer)

		const reducedPowerMode = (value & MASK.BW_POWER_MODE.LOW_POWER) === MASK.BW_POWER_MODE.LOW_POWER
		const rate = value & MASK.BW_POWER_MODE.RATE

		return {
			reducedPowerMode,
			rate
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodePowerControl(buffer) {
		const value = decodeByte(buffer)

		// Link AUTO_SLEEP Measure Sleep Wakeup
		const linkActivity = (value & MASK.POWER_CONTROL.LINK) === MASK.POWER_CONTROL.LINK
		const autoSleep = (value & MASK.POWER_CONTROL.AUTO_SLEEP) === MASK.POWER_CONTROL.AUTO_SLEEP
		const measure = (value & MASK.POWER_CONTROL.MEASURE) === MASK.POWER_CONTROL.MEASURE
		const sleep = (value & MASK.POWER_CONTROL.SLEEP) === MASK.POWER_CONTROL.SLEEP
		const wakeupValue = value & MASK.POWER_CONTROL.WAKEUP

		const wakeup =
			(wakeupValue === 0b00) ? '8Hz' :
			(wakeupValue === 0b01) ? '4Hz' :
			(wakeupValue === 0b10) ? '2Hz' :
			(wakeupValue === 0b11) ? '1Hz' :
			'unknown'

		return {
			linkActivity,
			autoSleep,
			measure,
			sleep,
			wakeupValue, wakeup
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInterruptEnable(buffer) {
		const value = decodeByte(buffer)

		// TODO

		return {
			value
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInterruptMap(buffer) {
		const value = decodeByte(buffer)

		// TODO

		return {
			value
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInterruptSource(buffer) {
		const value = decodeByte(buffer)

		// TODO

		return {
			value
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeDataFormat(buffer) {
		const value = decodeByte(buffer)

		// SELF_TEST SPI INT_INVERT 0 1 Justify 1 1
		const selfTestEnabled = (value & MASK.DATA_FORMAT.SELF_TEST) === MASK.DATA_FORMAT.SELF_TEST
		const spi3WireEnabled = (value & MASK.DATA_FORMAT.SPI) === MASK.DATA_FORMAT.SPI
		const invertInterruptPolarity = (value & MASK.DATA_FORMAT.INT_POL) === MASK.DATA_FORMAT.INT_POL
		const justifyLeft = (value & MASK.DATA_FORMAT.JUSTIFY) === MASK.DATA_FORMAT.JUSTIFY

		const ok = (value & MASK.DATA_FORMAT.FIXED) === DATA_FORMAT_FIXED_VALUE

		return {
			ok,
			selfTestEnabled,
			spi3WireEnabled,
			invertInterruptPolarity,
			justifyLeft
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeFIFOControl(buffer) {
		const value = decodeByte(buffer)

		//D7 D6 D5 D4 D3 D2 D1 D0
		//FIFO_MODE Trigger Samples
		const modeValue = (value & MASK.FIFO_CONTROL.MODE) >> MODE_SHIFT // BitSmush.extractBit(value, 7, 2)
		const triggerLinkInterrupt2 = (value & MASK.FIFO_CONTROL.TRIGGER_LINK_INT2) === MASK.FIFO_CONTROL.TRIGGER_LINK_INT2
		const samples = value & MASK.FIFO_CONTROL.SAMPLES

		const mode = modeValue === 0b00 ? 'Bypass' :
			modeValue === 0b01 ? 'FIFO' :
			modeValue === 0b10 ? 'Stream' :
			modeValue === 0b11 ? 'Trigger' :
			'unknown'

		return {
			modeValue, mode,
			triggerLinkInterrupt2,
			samples
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeFIFOStatus(buffer) {
		const value = decodeByte(buffer)

		const triggerFlag = (value & MASK.FIFO_STATUS.TRIGGER) === MASK.FIFO_STATUS.TRIGGER
		const entries = value & MASK.FIFO_STATUS.ENTRIES

		return {
			triggerFlag,
			entries
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeXYZ(buffer) {
		const dv = ArrayBuffer.isView(buffer) ?
			new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength) :
			new DataView(buffer)

		const x = dv.getUint16(0, true)
		const y = dv.getUint16(2, true)
		const z = dv.getUint16(4, true)

		return {
			x: ((x & 0x8000) === 0x8000) ? -(0x8000 - (x & 0x7fff)) : x,
			y: ((y & 0x8000) === 0x8000) ? -(0x8000 - (y & 0x7fff)) : y,
			z: ((z & 0x8000) === 0x8000) ? -(0x8000 - (z & 0x7fff)) : z,
		}
	}

	//
	//
	//

	/** @returns {ArrayBuffer} */
	static encodeShockThreshold(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 780 mg/LSB.

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeOffset(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 0.196 g/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeShockDuration(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 625 µs/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeShockLatency(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// s 1.25 ms/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeShockWindow(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		//  1.25 ms/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeActivityThreshold(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 780 mg/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeInactivityThreshold(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 780 mg/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeInactivityTime(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		// 1 sec/LSB

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeActivityControl(profile) {
		const {

		} = profile

		const value = 0

		// TODO
		//

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeShockAxes(profile) {
		const {

		} = profile

		const value = 0

		// TODO

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeBitrateAndPowerMode(profile) {
		const {
			rate
		} = profile

		const value = 0 | (rate)

		// TODO

		return Uint8Array.from([ value ]).buffer
	}


	/** @returns {ArrayBuffer} */
	static encodePowerControl(profile) {
		const {
			linkActivity,
			autoSleep,
			measure,
			sleep,
			wakeupValue, wakeup
		} = profile

		const value = 0
			| (measure ? MASK.POWER_CONTROL.MEASURE : 0)

		// TODO

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeInterruptEnabled(profile) {
		const {

		} = profile

		const value = 0

		// TODO

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeInterruptMap(profile) {
		const {

		} = profile

		const value = 0

		// TODO

		return Uint8Array.from([ value ]).buffer
	}



	/** @returns {ArrayBuffer} */
	static encodeDataFormat(profile) {
		const {
			selfTestEnabled,
			spi3WireEnabled,
			invertInterruptPolarity,
			justifyLeft
		} = profile

		const value = DATA_FORMAT_FIXED_VALUE
			| (selfTestEnabled ? MASK.DATA_FORMAT.SELF_TEST : 0)
			| (spi3WireEnabled ? MASK.DATA_FORMAT.SPI : 0)
			| (invertInterruptPolarity ? MASK.DATA_FORMAT.INT_POL : 0)
			| (justifyLeft ? MASK.DATA_FORMAT.JUSTIFY : 0)

		console.log('encodedDataFormat', value.toString(16))

		return Uint8Array.from([ value ]).buffer
	}

	/** @returns {ArrayBuffer} */
	static encodeFIFOControl(profile) {
		const {
			mode,
			triggerLinkInterrupt2,
			samples
		} = profile

		const lmode = (mode ?? 'bypass').toLowerCase()
		const modeValue = lmode === 'bypass' ? 0b00 :
			lmode === 'fifo' ? 0b01 :
			lmode === 'stream' ? 0b10 :
			lmode === 'trigger' ? 0b11 :
			0


		const value = 0
			| modeValue << MODE_SHIFT
			| (triggerLinkInterrupt2 ? MASK.FIFO_CONTROL.TRIGGER_LINK_INT2 : 0)
			| samples  & MASK.FIFO_CONTROL.SAMPLES

		return Uint8Array.from([ value ]).buffer
	}
}
