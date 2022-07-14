import { CellStoreContext } from '@/stores/CellStore'
import { ToolBarStoreContext } from '@/stores/ToolBarStore'
import { normalCell } from '@/utils/constants'
import { observer } from 'mobx-react-lite'
import React, {
    CSSProperties,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Stage, Text, Group, Rect } from 'react-konva'
import HeaderCell from './HeaderCell'
import LeftCell from './LeftCell'
import SingleCell from './SingleCell'

interface IProps {}

export const isNull = (value: any) =>
    value === void 0 || value === null || value === ''

const Cell = React.memo((props: any) => {
    const {
        x = 0,
        y = 0,
        width,
        height,
        fill = 'white',
        strokeWidth = 1,
        stroke = '#d9d9d9',
        align = 'left',
        verticalAlign = 'middle',
        textColor = '#333',
        padding = 5,
        fontFamily = normalCell.fontFamily,
        fontSize = normalCell.fontSize,
        wrap = 'none',
        alpha = 1,
        strokeEnabled = true,
        type = 'normal',
        ownKey,
        ismerge,
        value,
    } = props

    const cellStore = useContext(CellStoreContext)
    const cellsMap = cellStore.cellsMap

    const tabBarStore = useContext(ToolBarStoreContext)

    const fontWeight = tabBarStore.currentTextFillBold ? 'bold' : ''
    const fontItalic = tabBarStore.currentTextFillItalic ? 'italic' : ''

    const fontStyle = (fontItalic + ' ' + fontWeight).trim() || 'normal'

    const textDecoration = tabBarStore.currentTextFillUnderline

    // console.log(props)

    var mergeRect: any = {}

    if (ismerge) {
        const [firstkey, endkey] = ismerge
        if (ownKey == endkey) {
            mergeRect = {
                x: cellsMap[firstkey]!.x,
                y: cellsMap[firstkey]!.y,
                width:
                    cellsMap[endkey]!.x -
                    cellsMap[firstkey]!.x +
                    cellsMap[endkey]!.width,
                height:
                    cellsMap[endkey]!.y -
                    cellsMap[firstkey]!.y +
                    cellsMap[endkey]!.height,
            }
        }
    }

    return (
        <Group>
            <Rect
                x={x + 0}
                y={y + 0}
                ownKey={ownKey}
                height={height}
                width={width}
                fill={fill}
                stroke={stroke}
                type={type}
                strokeWidth={ismerge ? 0 : 0.5}
                ismerge={ismerge}
                alpha={alpha}
            />

            {isNull(value) || mergeRect.width ? null : (
                <Text
                    ownKey={ownKey}
                    x={x + 0}
                    y={y + 0}
                    height={height}
                    type={type}
                    width={width}
                    text={value}
                    fill={textColor}
                    ismerge={ismerge}
                    lineHeight={1.5}
                    verticalAlign={verticalAlign}
                    align={align}
                    fontFamily={fontFamily}
                    fontStyle={fontStyle}
                    textDecoration={textDecoration}
                    padding={padding}
                    wrap={wrap}
                    fontSize={fontSize}
                />
            )}
            {mergeRect.width ? (
                <Text
                    ownKey={ownKey}
                    type={type}
                    x={mergeRect.x}
                    y={mergeRect.y}
                    height={mergeRect.height}
                    width={mergeRect.width}
                    text={value}
                    fill={textColor}
                    // lineHeight={mergeRect.height}
                    verticalAlign={verticalAlign}
                    align={align}
                    fontFamily={fontFamily}
                    fontStyle={fontStyle}
                    textDecoration={textDecoration}
                    padding={padding}
                    wrap={wrap}
                    fontSize={fontSize}
                />
            ) : null}
        </Group>
    )
})

export default Cell
