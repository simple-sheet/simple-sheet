import { CellStoreContext } from '@/stores/CellStore'
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
import _ from 'lodash'
import { Stage, Text, Group, Rect, Line } from 'react-konva'
const DraggableRect = React.memo((props: any) => {
    const cellStore = useContext(CellStoreContext)
    const mouseEventStore = useContext(MouseEventStoreContext)
    // console.log(mouseEventStore.scrollLeft,mouseEventStore.scrollTop)
    const { type, x, y, height, width } = props

    const minWidth = 40

    const minHeight = 18
    return (
        <>
            {type == 'header' ? (
                <Rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="rgb(26, 115, 232)"
                    type={props.type}
                    opacity={0}
                    draggable
                    onDragMove={_.throttle((e) => {
                        // console.log('sss')
                        const node = e.target
                        // console.log(node)
                        node.opacity(0)
                        const newWidth = node.x() - props.ownx + props.width
                        const k = props.ownKey
                        // onResize(columnIndex, newWidth);
                        // console.log(Math.min(newWidth,minWidth))

                        cellStore.changeWidth(
                            k,
                            Math.max(newWidth, minWidth),
                            node.x() + props.width
                        )
                    }, 100)}
                    hitStrokeWidth={20}
                    onMouseEnter={(e) => {
                        e.target.opacity(1)
                        document.body.style.cursor = 'ew-resize'

                        // e.target.fill
                    }}
                    onMouseLeave={(e) => {
                        e.target.opacity(0)
                        document.body.style.cursor = 'default'
                    }}
                    dragBoundFunc={_.throttle((pos) => {
                        var rx = props.ownx - mouseEventStore.scrollLeft
                        if (pos.x - rx < minWidth) {
                            return {
                                x: minWidth + rx,
                                y: 0,
                            }
                        }

                        return {
                            ...pos,
                            y: 0,
                        }
                    }, 100)}
                />
            ) : (
                <Rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill="rgb(26, 115, 232)"
                    type={type}
                    opacity={0}
                    draggable
                    onDragMove={_.throttle((e: KonvaEventObject<DragEvent>) => {
                        // console.log('sss')
                        const node = e.target
                        const newHeight = node.y() - props.owny + props.height
                        node.opacity(0)
                        const k = props.ownKey
                        // onResize(columnIndex, newWidth);
                        // console.log(newHeight)

                        cellStore.changeHeight(
                            k,
                            Math.max(newHeight, minHeight)
                        )
                    }, 100)}
                    hitStrokeWidth={20}
                    onMouseEnter={(e) => {
                        document.body.style.cursor = 'ns-resize'
                        e.target.opacity(1)
                    }}
                    onMouseLeave={(e) => {
                        document.body.style.cursor = 'default'
                        e.target.opacity(0)
                    }}
                    dragBoundFunc={_.throttle((pos) => {
                        var ry = props.ownx - mouseEventStore.scrollTop
                        if (pos.y - ry < minHeight) {
                            return {
                                y: ry + minHeight,
                                x: 0,
                            }
                        }
                        return {
                            ...pos,
                            x: 0,
                        }
                    }, 100)}
                />
            )}
        </>
    )
})

export default DraggableRect
