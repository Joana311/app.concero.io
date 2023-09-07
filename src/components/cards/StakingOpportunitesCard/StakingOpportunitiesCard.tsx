import { Dispatch, FC } from 'react'
import classNames from './StakingOpportunitiesCard.module.pcss'
import { FilteredTags } from './FilteredTags/FilteredTags'
import { StakingCard } from '../StakingCard/StakingCard'
import { Filter, Protocol, Vault } from '../../screens/StakingScreen/stakingReducer/types'

interface StakingOpportunitiesProps {
  selectedVault: Vault
  vaults: Vault[]
  protocols: Protocol
  dispatch: Dispatch<any>
  filter: Filter
}

export const StakingOpportunitiesCard: FC<StakingOpportunitiesProps> = ({ selectedVault, vaults, protocols, dispatch, filter }) => {
  const handleSelect = (vault) => {
    if (selectedVault?.id === vault.id) dispatch({ type: 'SET_SELECTED_VAULT', payload: null })
    else dispatch({ type: 'SET_SELECTED_VAULT', payload: vault })
  }

  return (
    <div className={`card ${classNames.container}`}>
      <h5 className="cardHeaderTitle">Staking opportunities</h5>
      <FilteredTags dispatch={dispatch} filter={filter} />
      <div className={classNames.stakingCardsContainer}>
        {vaults.map((vault) => (
          <StakingCard key={vault.id} isSelected={selectedVault?.id === vault.id} vault={vault} onClick={handleSelect} protocols={protocols} />
        ))}
      </div>
    </div>
  )
}
