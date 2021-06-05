import type { InvitationToken } from './InvitationToken';
import type { Guest } from './Guest';

export interface Answerer {
	join(token: InvitationToken): Promise<InvitationToken>;
	onGuest(): Promise<Guest>;
}
