import type { InvitationToken } from './InvitationToken';
import type { Guest } from './Guest';

export interface Offerer {
	invite(): Promise<InvitationToken>;
	accept(token: InvitationToken): Promise<Guest>;
}
