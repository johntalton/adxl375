export const REGISTER = {
	DEVID: 0x00,  // read-only

	THRESH_SHOCK: 0x1D,

	OFSX: 0x1E,
	OFSY: 0x1F,
	OFSZ: 0x20,

	DUR: 0x21,
	Latent: 0x22,
	Window: 0x23,

	THRESH_ACT: 0x24,
	THRESH_INACT: 0x25,
	TIME_INACT: 0x26,
	ACT_INACT_CTL: 0x27,

	SHOCK_AXES: 0x2A,
	ACT_SHOCK_STATUS: 0x2B,  // read-only

	BW_RATE: 0x2C,
	POWER_CTL: 0x2D,

	INT_ENABLE: 0x2E,
	INT_MAP: 0x2F,
	INT_SOURCE: 0x30,  // read-only

	DATA_FORMAT: 0x31,

	DATAX0: 0x32,  // read-only
	DATAX1: 0x33,  // read-only
	DATAY0: 0x34,  // read-only
	DATAY1: 0x35,  // read-only
	DATAZ0: 0x36,  // read-only
	DATAZ1: 0x37,  // read-only

	FIFO_CTL: 0x38,
	FIFO_STATUS: 0x39  // read-only
}

export const REGISTER_BLOCK = {
	DATA: {
		START: REGISTER.DATAX0,
		LENGTH: 6
	}
}



