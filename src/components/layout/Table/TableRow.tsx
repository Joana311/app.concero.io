import { animated } from 'react-spring'
import { TableCell } from './TableCell'

export function TableRow({ style, item, columns, onClick }) {
  return (
    <animated.tr style={style} className="hover-dim" onClick={() => onClick && onClick(item)}>
      {columns.map((column, index) => (
        <TableCell key={index} item={item} column={column} />
      ))}
    </animated.tr>
  )
}
