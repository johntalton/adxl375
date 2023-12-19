export const DEVICE_ID =  0xE5

export const DATA_FORMAT_FIXED_VALUE = 0b000010011

export const MASK = {
	DATA_FORMAT: {
		FIXED: 0b000110011,
		SELF_TEST: 0b1000_0000,
		SPI: 0b0100_0000,
		INT_POL: 0b0010_0000,
		JUSTIFY: 0b0000_0100
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
	static decodePowerControl(buffer) {
		const value = decodeByte(buffer)
		return {}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeInterruptSource(buffer) {
		const value = decodeByte(buffer)

		return {}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeDataFormat(buffer) {
		const value = decodeByte(buffer)

		// SELF_TEST SPI INT_INVERT 0 1 Justify 1 1
		const selfTestEnabled = value & MASK.DATA_FORMAT.SELF_TEST === MASK.DATA_FORMAT.SELF_TEST
		const spi3WireEnabled = value & MASK.DATA_FORMAT.SPI === MASK.DATA_FORMAT.SPI
		const invertInterruptPolarity = value & MASK.DATA_FORMAT.INT_POL === MASK.DATA_FORMAT.INT_POL
		const justifyLeft = value & MASK.DATA_FORMAT.JUSTIFY === MASK.DATA_FORMAT.JUSTIFY

		return {
			selfTestEnabled,
			spi3WireEnabled,
			invertInterruptPolarity,
			justifyLeft
		}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeFIFOControl(buffer) {
		const value = decodeByte(buffer)
		return {}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeFIFOStatus(buffer) {
		const value = decodeByte(buffer)
		return {}
	}

	/** @param {ArrayBufferLike|ArrayBufferView} buffer  */
	static decodeBitrateAndPowerMode(buffer) {
		const value = decodeByte(buffer)
		return {}
	}


	//
	//
	//

	/** @returns {ArrayBuffer} */
	static encodeDataFormat(profile) {
		const {
			selfTestEnabled,
			spi3WireEnabled,
			invertInterruptPolarity,
			justifyLeft
		} = profile
	}

}
