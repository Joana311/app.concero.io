import { FC } from 'react'
import { CardHeader } from './CardHeader'
import { Button } from '../buttons/Button/Button'

export interface ChartCardProps {}

export const ChartCard: FC<ChartCardProps> = () => {
  return (
    <div className="card f1">
      <CardHeader title={'Chart'}>
        <Button secondary sm>
          BSC / USDT
        </Button>
      </CardHeader>
      {/*<AdvancedRealTimeChart theme={'dark'} symbol={'BINANCE:BTCUSDT'} interval={'1'} width={'100%'} height={'100%'} />*/}
    </div>
  )
}