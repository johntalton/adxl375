# ADXL375

3-Axis Accelerometer using [`I2CBus`](https://github.com/johntalton/and-other-delights) abstraction

[![npm Version](http://img.shields.io/npm/v/@johntalton/adxl375.svg)](https://www.npmjs.com/package/@johntalton/adxl375)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/adxl375)
[![CI](https://github.com/johntalton/adxl375/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/adxl375/actions/workflows/CI.yml)

# Example

```javascript
import { I2CAddressedBus } from '@johntalton/and-other-delights'
import { ADXL375 } from '@johntalton/adxl375'

const bus = /* I2CBus */
const aBus = new I2CAddressedBus(bus, 0x53)
const device = new ADXL375(aBus)

const id = await device.getID()

const { x, y, z } = await device.getXYZ()

```