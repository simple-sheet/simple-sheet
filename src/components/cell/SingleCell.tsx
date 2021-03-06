import { CellAttrs, CellStoreContext } from '@/stores/CellStore'
import { MouseEventStoreContext } from '@/stores/MouseEventStore'
import { KonvaEventObject } from 'konva/lib/Node'
import { observer } from 'mobx-react-lite'
import React, {
    CSSProperties,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Stage, Text, Group, Rect, Line } from 'react-konva'

const SingleCell = React.memo(
    observer((props: any) => {
        let { width, height, stroke = '#c6c6c6' } = props

        let x = props.x + 0,
            y = props.y + 0

        const cellStore = useContext(CellStoreContext)

        const activeCell = cellStore.activeCell

        let text1 = activeCell?.ownKey.split(':')[0]
        let text2 = String.fromCharCode(
            Number(activeCell?.ownKey.split(':')[1]) + 64
        )

        let textS = text1 + ':' + text2

        return (
            <>
                <Rect
                    stroke={stroke}
                    strokeWidth={0.5}
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                    fill={'#fff'}
                ></Rect>
                <Text
                    x={x}
                    y={y}
                    height={height}
                    width={width}
                    verticalAlign={'middle'}
                    align={'center'}
                    fill={'#000'}
                    text={activeCell ? textS : ''}
                ></Text>
            </>
        )
    })
)

export default SingleCell
