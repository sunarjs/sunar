import { Slash } from '../../builders'
import { execute } from '../../mutators'

const slash = new Slash({ name: 'ping', description: 'Pong' })

execute(slash, (interaction) => {
    interaction.reply({ content: 'Pong!' })
})

export { slash }