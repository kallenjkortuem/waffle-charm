import { Link } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { ChampionData, ChampionMasteryDTO } from '@waffle-charm/api-interfaces'
import { ChampionAvatar, getChampionInfoUrl } from '@waffle-charm/champions'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MasteryProgress } from './MasteryProgress'

export interface MasteryCardProps {
  mastery: ChampionMasteryDTO
  champion: ChampionData
}

export default function MasteryCard(
  props: MasteryCardProps
): React.ReactElement {
  const { champion, mastery } = props
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader
        avatar={
          <ChampionAvatar variant="square" size="small" champion={champion} />
        }
        title={
          <Link
            variant="body2"
            href={getChampionInfoUrl(champion)}
            underline="hover"
            color="textPrimary"
          >
            {champion?.name}
          </Link>
        }
        subheader={
          t('totalMasteryPoints') +
            ' ' +
            mastery?.championPoints?.toLocaleString() ?? 0
        }
      />
      <CardContent>
        <MasteryProgress mastery={mastery} />
      </CardContent>
    </Card>
  )
}
