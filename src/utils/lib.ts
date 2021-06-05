export function isDefined(value: any): asserts value {
	if (!value) throw new Error('Expected value to be defined');
}
