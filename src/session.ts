export const copySessionUrlToClipboard = (sessionDescription: string) => () => {
	const url = `${location.origin}/?connect=${sessionDescription}`;
	navigator.clipboard.writeText(url);
	console.log('Link copied: ', url);
};

export const copySessionDescriptionToClipboard = (sessionDescription: string) => () => {
	navigator.clipboard.writeText(sessionDescription);
	console.log('Session description copied: ', sessionDescription);
};
