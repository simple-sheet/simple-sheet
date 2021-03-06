import React, {
    CSSProperties,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { MouseEventStoreContext } from '@/stores/MouseEventStore'
import styles from './styles.module.css'
import { observer } from 'mobx-react-lite'
import { CellAttrs, CellStoreContext } from '@/stores/CellStore'

import _ from 'lodash'
import {
    headerCell,
    leftCell,
    normalCell,
    singleCell,
    rowStartIndex,
    rowStopIndex,
    columnStartIndex,
    columnStopIndex,
} from '@/utils/constants'
import { getCurrentCellByOwnKey, getCurrentCellByXY } from '@/utils/index'

interface IProps {}

const EditAreaLayer = (props: any) => {
    const mouseEventStore = useContext(MouseEventStoreContext)
    const dbc = mouseEventStore.dbcCellAttr

    const cellStore = useContext(CellStoreContext)

    const [editCell, setEditCell] = useState<CellAttrs>(null)

    useEffect(() => {
        // console.log(dbc)
        if (!dbc || !dbc.ownKey || dbc.noEdit) return
        var cur = getCurrentCellByOwnKey(dbc!.ownKey, cellStore.cellsMap, true)
        // dbc.value = '222'
        if (cur?.isMerge) {
            setEditCell({
                ...cur,
                ownKey: cellStore.cellsMap[cur.isMerge[1]]!.ownKey,
                value: cellStore.cellsMap[cur.isMerge[1]]?.value,
            })
            return
        }
        // console.log(dbc)
        setEditCell(dbc)
    }, [dbc])

    // useEffect(() => {
    //     setEditCell(null)
    // }, [mouseEventStore.downCellAttr])

    const editCellRenderer = (o: any) => {
        const style: CSSProperties = {
            position: 'absolute',
            left: o.x,
            top: o.y,
            borderWidth: o.strokeWidth,
            borderColor: o.stroke,
            width: o.width + 1,
            height: o.height + 1,
            borderStyle: 'solid',
            boxSizing: 'border-box',
            boxShadow: 'rgb(60 64 67 / 15%) 0px 2px 6px 2px',
            backgroundColor: '#fff',
        }

        return (
            <div style={style}>
                <textarea
                    defaultValue={o.value}
                    className={styles['edit-textarea']}
                    autoFocus
                    onBlur={(e) => {
                        let cur = getCurrentCellByOwnKey(
                            o.ownKey,
                            cellStore.cellsMap
                        )
                        if (cur) {
                            cur.value = e.target.value
                            // cur.imgUrl = 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd1ebc6f88746c390d6b87d766018d4~tplv-k3u1fbpfcp-zoom-1.image'
                            // cur.imgUrl = 'https://qiniu.nihaoshijie.com.cn/qunmingp.jpg'
                        }
                        setEditCell(null)
                    }}
                ></textarea>
            </div>
        )
    }

    const getEditCellSelection = useCallback(() => {
        if (!editCell) return null

        // console.log(editCell)

        const cell = editCellRenderer({
            stroke: '#1a73e8',
            strokeWidth: 2,
            fill: 'transparent',
            x: editCell.x,
            y: editCell.y,
            width: editCell.width,
            height: editCell.height,
            value: editCell.value,
            ownKey: editCell.ownKey,
        })

        return cell
    }, [editCell])

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'absolute',
                left: -leftCell.width,
                top: -headerCell.height,
                right: 0,
                bottom: 0,
                zIndex: 3,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    transform: `translate(-${
                        mouseEventStore.scrollLeft + 0
                    }px, -${mouseEventStore.scrollTop + 0}px)`,
                }}
            >
                {getEditCellSelection()}
            </div>
        </div>
    )
}

export default observer(EditAreaLayer)
