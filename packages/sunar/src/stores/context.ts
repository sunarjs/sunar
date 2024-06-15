import type { Client } from '../client';

export interface Context {
	client: Client;
	config: unknown;
}

export const context = {
	config: {},
} as Context;
