import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core'
import React from 'react'
import { FixedSizeGrid } from 'react-window'
import { ChampionGridItem } from '../champion-grid-item/ChampionGridItem'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    item: {
      padding: theme.spacing(1),
      whiteSpace: 'nowrap',
    },
  })
)

const columnCount = 3

const itemKey = ({ columnIndex, data, rowIndex }) => {
  const championIndex = rowIndex * columnCount + columnIndex
  const item = data[championIndex] ?? `${columnIndex}-${rowIndex}`
  return item
}

interface CellProps {
  columnIndex: number
  rowIndex: number
  data: string[]
  style: any
}

const Cell = React.memo((props: CellProps) => {
  const { columnIndex, data, rowIndex, style } = props
  const classes = useStyles()
  const championIds = data
  const championIndex = rowIndex * columnCount + columnIndex
  const championId = championIds[championIndex]

  return (
    <div className={classes.item} style={style}>
      {championId ? <ChampionGridItem championId={championId} /> : null}
    </div>
  )
})

/* eslint-disable-next-line */
export interface ChampionGridContainerProps {
  championIds: string[]
}

export function ChampionGridContainer(props: ChampionGridContainerProps) {
  const { championIds } = props
  const classes = useStyles()
  const theme = useTheme()
  const columnWidth = theme.spacing(38)
  const rowHeight = theme.spacing(19)

  // https://react-window.now.sh/#/api/FixedSizeGrid
  return (
    <FixedSizeGrid
      className={classes.root}
      columnCount={columnCount}
      columnWidth={columnWidth}
      itemKey={itemKey}
      itemData={championIds}
      height={rowHeight * 3.5}
      rowCount={Math.ceil(championIds.length / columnCount)}
      rowHeight={rowHeight + theme.spacing(1)}
      width={912}
    >
      {Cell}
    </FixedSizeGrid>
  )
}

export default ChampionGridContainer
