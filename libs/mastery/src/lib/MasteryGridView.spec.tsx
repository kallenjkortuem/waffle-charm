import { render } from '@testing-library/react'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { enablei18nMocks } from '@waffle-charm/testing-utils'
import React from 'react'
import MasteryGridView from './MasteryGridView'

enablei18nMocks()
describe('MasteryGridView', () => {
  const masteries: ChampionMasteryDTO[] = []
  const championMap: Record<number, ChampionData> = {}
  it('should render successfully', () => {
    const { baseElement } = render(
      <MasteryGridView
        masteryLevels={['7', '6', '5']}
        tag="Assasin"
        masteries={masteries}
        sortAscending={false}
        championMap={championMap}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
