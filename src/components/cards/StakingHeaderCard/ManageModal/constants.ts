export enum ModalType {
	input = 0,
	tokens = 1,
	chains = 2,
}

export enum SwapType {
	stake = 0,
	withdraw = 1,
}

export enum Status {
	input = 0,
	stake = 1,
	loading = 2,
	success = 3,
	failure = 4,
	canceled = 5,
	balanceError = 6,
	unknownError = 7,
	noRoute = 8,
	thisMakeTakeAWhile = 9,
	withdraw = 10,
}

interface ButtonMessages {
	[Status.input]: string
	[Status.stake]: string
	[Status.withdraw]: string
	[Status.loading]: string
	[Status.success]: string
	[Status.failure]: string
	[Status.canceled]: string
	[Status.balanceError]: string
	[Status.unknownError]: string
	[Status.noRoute]: string
	[Status.thisMakeTakeAWhile]: string
}

export const buttonMessages: ButtonMessages = {
	[Status.input]: 'Enter amount to swap',
	[Status.stake]: 'Stake',
	[Status.withdraw]: 'Withdraw',
	[Status.loading]: '',
	[Status.success]: 'Swap started successfully!',
	[Status.failure]: 'Failure',
	[Status.canceled]: 'Canceled by user',
	[Status.balanceError]: 'Insufficient balance',
	[Status.unknownError]: 'Something went wrong.',
	[Status.noRoute]: 'No route found',
	[Status.thisMakeTakeAWhile]: 'Hang tight, this may take a while…',
}
