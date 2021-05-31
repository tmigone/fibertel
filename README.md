# fibertel-niveles

Utilidad para monitorear los niveles de señal de los cable modems de Fibertel (Tx, Rx. MER).
Obtiene la informacion del servicio de provisioning de Fibertel: http://provisioning.fibertel.com.ar/asp/nivelesPrima.asp

Inspirado en https://github.com/fcingolani/fibertel-stats

## Instalación

Usando NPM:

```bash
npm install fibertel
```

Requiere node.js v12.4.0 o mayor.

## Uso

### CLI
```
tomi@sirius: ✗ fibertel
--- Fibertel Stats ---
Tx: 44.5 dBmV
Freq Tx: 38600 MHz
Rx: 4.9 dBmV
Freq Rx: 603000 MHz
MER: 38.9 dB
Equipo: DPC3848VE
Descripción: Cisco DPC3848VE DOCSIS 3.0 DB-WiFi(3x3) Apps Docway <>
Versión OS: "dpc3800-v303r204318-200508aARG"
```

### Modulo

```js
// es2015
import { getStats } from 'fibertel'

await getStats()

// commonjs 
const const { getStats }  = require('fibertel')

await getStats()
```

## ¿Están bien mis valores?

>Los valores apropiados varían de acuerdo a la versión de DOCSIS (un estandar internacional para la transmisión de datos), aunque podemos encontrar algunos valores de referencia en [http://www.dslreports.com/faq/16085](), que se detallan a continuación.
>### Rx
>| Estado                  | Mínimo      | Máximo      |
>|-------------------------|-------------|-------------|
>| Recomendado             | -7 dBmV     | +7 dBmV     |
>| Aceptable               | -10 dBmV    | +10 dBmV    |
>| Máximo tolerable        | -15 dBmV    | +15 dBmV    |
>| Fuera de Especificación | < -15 dBmV  | > +15 dBmV  |
>
>### Tx
>
>| Versión     | Mínimo    | Máximo    |
>|-------------|-----------|-----------|
>| DOCSIS 3.1  | +35 dBmV  | +47 dBmV  |
>| DOCSIS 3.0  | +35 dBmV  | +49 dBmV  |
<sub>Fuente: https://github.com/fcingolani/fibertel-stats#est%C3%A1n-bien-mis-valores</sub>

## ¿Puedo hacer algo para mejorar los valores?
TODO