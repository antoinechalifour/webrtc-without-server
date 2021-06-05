import type { InvitationToken } from '../domain/InvitationToken';

export const makeInvitationToken = (sessionDescription: RTCSessionDescription) =>
	btoa(JSON.stringify(sessionDescription));

export const parseInvitationToken = (str: InvitationToken): RTCSessionDescription =>
	JSON.parse(atob(str));
