import {
  ChampionData,
  ChampionDataDragon,
  ChampionMasteryDTO,
} from '@waffle-charm/api-interfaces'
import React from 'react'
import MasteryGridGroup from '../MasteryGridGroup/MasteryGridGroup'

export const MasteryGridView = (props: {
  masteryLevels: string[]
  sortAscending: boolean
  championData: ChampionDataDragon
  masteries: ChampionMasteryDTO[]
  roles: string[]
}): React.ReactElement => {
  const { masteryLevels, sortAscending, championData, masteries, roles } = props

  const mappedData: Record<number, ChampionData> = React.useMemo(
    () =>
      Object.entries(championData?.data || []).reduce(
        (accumulated, [_, entry]) => {
          accumulated[entry.key] = entry
          return accumulated
        },
        {}
      ) || {},
    [championData]
  )

  const groupedMasteries: Record<number, ChampionMasteryDTO[]> = React.useMemo(
    () =>
      masteries.reduce((accum, current) => {
        if (accum[current.championLevel]) {
          accum[current.championLevel].push(current)
        } else {
          accum[current.championLevel] = [current]
        }
        return accum
      }, {}) || {},
    [masteries]
  )

  return (
    <>
      {masteryLevels
        .sort((a, b) =>
          sortAscending ? parseInt(a) - parseInt(b) : parseInt(b) - parseInt(a)
        )
        .map((level) => {
          return (
            <MasteryGridGroup
              key={level}
              level={level}
              groupedMasteries={groupedMasteries}
              roles={roles}
              mappedData={mappedData}
            ></MasteryGridGroup>
          )
        })}
    </>
  )
}

export default MasteryGridView
