import { FC, useContext, useEffect, useRef } from 'react'
import { createChart } from 'lightweight-charts'
import { ThemeContext } from '../../../hooks/themeContext'
import { areaSeriesOptions, chartOptions } from './chartOptions'
import { createTooltip, updateTooltip } from './Tooltip'

interface ChartProps {
  data: any[]
  secondData?: any[] | null
}

export const Chart: FC<ChartProps> = ({ data, secondData = null }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const seriesRef = useRef<any>(null)
  const { colors, theme } = useContext(ThemeContext)

  useEffect(() => {
    if (!chartRef.current) return

    const chart = createChart(chartRef.current, chartOptions(colors))
    chart.timeScale().fitContent()

    chart.timeScale().applyOptions({ borderColor: 'transparent' })
    chart.priceScale('right').applyOptions({
      borderColor: 'transparent',
      textColor: colors.text.secondary,
    })
    seriesRef.current = chart.addAreaSeries(areaSeriesOptions(colors, theme))
    seriesRef.current.setData(data)

    let secondSeries = null

    if (secondData) {
      secondSeries = chart.addAreaSeries({
        priceScaleId: 'secondPriceScale',
        ...areaSeriesOptions(colors, theme, 'secondLine'),
      })
      secondSeries.setData(secondData)
    }

    tooltipRef.current = createTooltip()
    chartRef.current.appendChild(tooltipRef.current)
    // chart.resize(chartRef.current.clientWidth, chartRef.current.clientHeight)
    const handleResize = () => {
      const { clientWidth, clientHeight } = chartRef.current
      // console.log('resizing to ', clientWidth, clientHeight)
      chart.resize(clientWidth, clientHeight)
    }

    window.addEventListener('resize', handleResize)

    chart.subscribeCrosshairMove((param) => {
      if (tooltipRef.current) updateTooltip(param, seriesRef.current, secondSeries, tooltipRef.current, chartRef.current, '$')
    })

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      if (tooltipRef.current) {
        tooltipRef.current.remove()
        tooltipRef.current = null
      }
    }
  }, [colors, data, chartRef])

  return <div className="f1" ref={chartRef} />
}
