import { FC, useState } from 'react'
import classNames from './Table.module.pcss'
import { TableSkeleton } from './TableSkeleton'
import { TableRow } from './TableRow'
import { TableHeader } from './TableHeader'

export interface TableColumn {
  columnTitle: string
  cellComponent: (item: any) => JSX.Element
  headerStyle?: React.CSSProperties
}

export interface TableProps {
  columns: TableColumn[]
  data: never[]
  isHeaderVisible?: boolean
  onClick?: (item: any) => void
}

export const Table: FC<TableProps> = ({ columns, data, isHeaderVisible = true, onClick }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={classNames.container}>
      {isLoading ? (
        <TableSkeleton columns={columns} />
      ) : (
        <table>
          {isHeaderVisible && <TableHeader columns={columns} />}
          <tbody className="striped">
            {data.map((item, index) => (
              <TableRow key={index} item={item} columns={columns} onClick={onClick} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
