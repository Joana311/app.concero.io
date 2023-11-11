import { Dispatch, useReducer } from 'react'
import { initialState } from './initialState'
import { StakingAction, StakingState } from './types'

const stakingScreenReducer = (state: StakingState, action: StakingAction): StakingState => {
	switch (action.type) {
		case 'SET_FILTER':
			return { ...state, filter: { ...state.filter, [action.payload.filter]: action.payload.value } }
		case 'SET_SELECTED_VAULT':
			return { ...state, selectedVault: action.payload }
		case 'SET_VAULTS':
			return { ...state, vaults: action.payload }
		case 'PUSH_VAULTS':
			return { ...state, vaults: [...state.vaults, ...action.payload] }
		case 'SET_LOADING':
			return { ...state, loading: action.payload }
		case 'SET_BALANCES':
			return { ...state, balances: action.payload }
		case 'SET_ADDRESS':
			return { ...state, address: action.payload }
		default:
			throw new Error(`Unhandled action type`)
	}
}

export function useStakingReducer(): [StakingState, Dispatch<StakingAction>] {
	const [stakingState, dispatch] = useReducer(stakingScreenReducer, initialState)
	return [stakingState, dispatch]
}