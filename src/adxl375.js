import { Common } from './common.js'

export function ADXL375(abus) {
	this.abus = abus
	const obj = this

	Object.entries(Common).map(([key, value]) => {
		obj[key] = (...args) => value(obj.abus, ...args)
	})

	return this
}

ADXL375.from = abus => new ADXL375(abus)
