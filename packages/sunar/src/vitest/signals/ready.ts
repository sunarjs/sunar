import { Signal } from '../../builders'
import { execute } from '../../mutators'
import { Signals } from '../../utils'

const signal = new Signal(Signals.ClientReady)

execute(signal, (client) => {
    console.log(`${client.user.tag} ready!`)
})

export { signal }