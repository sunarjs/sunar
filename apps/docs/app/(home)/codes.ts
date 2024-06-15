export const slashCommandCode = `import { Slash, execute } from 'sunar';
 
const slash = new Slash({
    name: 'ping',
    description: 'Ping command',
});
 
execute(slash, (interaction) => {
	interaction.reply({ content: 'Pong!' });
});
 
export { slash };`;

export const contextMenuCode = `import { ContextMenu, execute } from 'sunar';
 
const contextMenu = new ContextMenu({
	name: 'Ping',
	type: 2,
});
 
execute(contextMenu, (interaction) => {
	interaction.reply({ content: 'Pong!' });
});
 
export { contextMenu };`;

export const signalCode = `import { Signal, execute } from 'sunar';
 
const signal = new Signal('ready', { once: true });
 
execute(signal, () => {
	console.log('Logged in!');
});
 
export { signal };`;

export const buttonCode = `import { Button, execute } from 'sunar';
 
const button = new Button({ id: 'my-button' });
 
execute(button, (interaction) => {
	interaction.reply({ content: 'Pong!' });
});
 
export { button };`;

export const modalCode = `import { Modal, execute } from 'sunar';
 
const modal = new Modal({ id: 'my-modal' });
 
execute(modal, (interaction) => {
	interaction.reply({ content: 'Pong!' });
});
 
export { modal };`;

export const selectMenuCode = `import { SelectMenu, execute } from 'sunar';
 
const selectMenu = new SelectMenu({
    id: 'my-select-menu',
    type: 3,
});
 
execute(selectMenu, (interaction) => {
	interaction.reply({ content: 'Pong!' });
});
 
export { selectMenu };`;
