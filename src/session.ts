export const copySessionDescriptionToClipboard = (sessionDescription: string) => () => {
	navigator.clipboard.writeText(sessionDescription);
	console.log('Session description copied: ', sessionDescription);
};
