import { FC, useEffect, useState } from 'react'
import { CardHeader } from '../CardHeader/CardHeader'
import { Table } from '../../layout/Table/Table'
import classNames from './NewsCard.module.pcss'
import { Button } from '../../buttons/Button/Button'
import { CryptoSymbol } from '../../tags/CryptoSymbol/CryptoSymbol'
import { getPosts } from '../../../api/cryptopanic/getPosts'
import { EntityListModal } from '../../modals/EntityListModal/EntityListModal'
import { chains } from '../../../constants/chains'
import { columns } from './columns'

interface NewsCardProps {}

const modalColumns = [
  {
    columnTitle: 'Symbol',
    cellComponent: (item) => <CryptoSymbol name={item.symbol} symbol={item.symbol} />,
  },
  {
    columnTitle: 'Name',
    cellComponent: (item) => <p className="body1">{item.name}</p>,
  },
  {
    columnTitle: 'Balance',
    cellComponent: (item) => <p className="body1">{item.balance}</p>,
  },
]

export const NewsCard: FC<NewsCardProps> = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedChain, setSelectedChain] = useState(chains[0])

  const fetchNews = async (page) => {
    setIsLoading(true)
    const response = await getPosts({ currencies: [selectedChain.symbol], page })
    setData([...data, ...response.results])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNews(page)
  }, [selectedChain])

  const handleSelectChain = (chain) => {
    setSelectedChain(chain)
    setIsModalVisible(false)
  }

  return (
    <div>
      <div className={`${classNames.container} card`}>
        <CardHeader title="News">
          <Button
            variant="subtle"
            rightIcon={{
              name: 'ChevronDown',
              iconProps: { size: 18 },
            }}
            size="sm"
            onClick={() => setIsModalVisible(true)}
          >
            <CryptoSymbol name={selectedChain.symbol} symbol={selectedChain.symbol} />
          </Button>
        </CardHeader>
        <Table
          items={data}
          columns={columns}
          isHeaderVisible={false}
          isLoading={isLoading}
          onEndReached={() => fetchNews(page + 1)}
        />
      </div>
      <EntityListModal
        title="Select chain"
        show={isModalVisible}
        setShow={setIsModalVisible}
        data={chains}
        columns={modalColumns}
        onSelect={(chain) => handleSelectChain(chain)}
      />
    </div>
  )
}
