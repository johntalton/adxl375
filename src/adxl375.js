export class ADXL375 {
	#abus

	/** @param {I2CAddressedBus } abus  */
	static from(abus) { return new ADXL375(abus) }

	constructor(abus) { this.#abus = abus }

	async getID() { Common.getID(this.#abus) }

	async getDataFormat() { return Common.getDataFormat(this.#abus) }
	async setDataFormat(profile) { return Common.setDataFormat(this.#abus, profile) }

	async getFIFOControl() { return Common.getFIFOControl(this.#abus) }
	async setFIFOControl(profile) { return Common.setFIFOControl(this.#abus, profile) }

	async getFIFOStatus() { return Common.getFIFOStatus(this.#abus) }
}