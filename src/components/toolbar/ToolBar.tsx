import React, {
    CSSProperties,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react'

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

import { MouseEventStoreContext } from '@/stores/MouseEventStore'
import ReactTooltip from 'react-tooltip'
import styles from './styles.module.css'
import { observer } from 'mobx-react-lite'
import { CellAttrs, CellStoreContext } from '@/stores/CellStore'
import { ToolBarStoreContext } from '@/stores/ToolBarStore'

import _ from 'lodash'
import ColorPanel from './components/ColorPanel'
import { cellDash, normalCell } from '@/utils/constants'

interface IProps {}

const ToolBar = (props: any) => {
    const cellStore = useContext(CellStoreContext)
    const toolbarStore = useContext(ToolBarStoreContext)

    const mergeCell = () => {
        toolbarStore.mergeCell(cellStore)
    }
    const splitCell = () => {
        toolbarStore.splitCell(cellStore)
    }

    const colorCell = (color: string) => {
        toolbarStore.colorBorderCell(color, cellStore)
    }

    const borderStyleCell = (style: string) => {
        toolbarStore.dashBorderCell(cellDash[style], cellStore)
    }

    const toggleBorderCell = (flag: boolean) => {
        toolbarStore.toggleBorderCell(flag, cellStore)
    }
    const fillCell = (color: string) => {
        toolbarStore.fillCell(color, cellStore)
    }

    const textBoldCell = () => {
        toolbarStore.textBoldCell(cellStore)
    }
    const textItalicCell = () => {
        toolbarStore.textItalicCell(cellStore)
    }

    const textUnderLineCell = () => {
        toolbarStore.textUnderlineCell(cellStore)
    }

    const textColorCell = (color: string) => {
        toolbarStore.textColorCell(color, cellStore)
    }

    const [curVA, setCurVA] = useState<string>('middle')
    const verticalAlignCell = (align: string) => {
        setCurVA(align)
        toolbarStore.verticalAlignCell(align, cellStore)
    }
    const getVAlignBtn = () => {
        if (curVA == 'middle') {
            return <div className={styles['cell-v-align-middle']}></div>
        } else if (curVA == 'top') {
            return <div className={styles['cell-v-align-top']}></div>
        } else {
            return <div className={styles['cell-v-align-bottom']}></div>
        }
    }

    const [curA, setCurA] = useState<string>('left')
    const alignCell = (align: string) => {
        setCurA(align)
        toolbarStore.alignCell(align, cellStore)
    }
    const getAlignBtn = () => {
        if (curA == 'center') {
            return <div className={styles['cell-align-center']}></div>
        } else if (curVA == 'left') {
            return <div className={styles['cell-align-left']}></div>
        } else {
            return <div className={styles['cell-align-right']}></div>
        }
    }

    const [curF, setCurF] = useState<string>(normalCell.fontFamily)
    const fontFamilyCell = (str: string) => {
        setCurF(str)
        toolbarStore.fontFamaiyCell(str, cellStore)
    }
    useEffect(() => {
        setCurFS(
            cellStore.activeCell?.fontSize
                ? cellStore.activeCell?.fontSize
                : normalCell.fontSize
        )
        setCurF(
            cellStore.activeCell?.fontFamily
                ? cellStore.activeCell?.fontFamily
                : normalCell.fontFamily
        )
    }, [cellStore.activeCell])

    const [curFS, setCurFS] = useState<number>(normalCell.fontSize)
    const fontSizeCell = (size: number) => {
        setCurFS(size)
        toolbarStore.fontSizeCell(size, cellStore)
    }

    return (
        <div className={`${styles['tool-bar-wrap']}`}>
            <ReactTooltip
                effect="solid"
                place="bottom"
                className="ReactTooltip"
            ></ReactTooltip>

            <div className={styles['btn-wrap']}>
                <div className={styles['back-cell']} data-tip="撤销"></div>
            </div>
            <div className={styles['btn-wrap']}>
                <div className={styles['front-cell']} data-tip="前进"></div>
            </div>

            <div className={styles.divider}></div>

            <Menu
                menuClassName="border-menu"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="字体">
                        <div className={styles['font-family']}>{curF}</div>
                        <div className={styles.triangle}></div>
                    </div>
                }
            >
                <MenuItem onClick={() => fontFamilyCell('Arial')}>
                    Arial
                </MenuItem>
                <MenuItem onClick={() => fontFamilyCell('Helvetica')}>
                    Helvetica
                </MenuItem>
                <MenuItem onClick={() => fontFamilyCell('Calibri')}>
                    Calibri
                </MenuItem>
                <MenuItem onClick={() => fontFamilyCell('Tahoma')}>
                    Tahoma
                </MenuItem>
                <MenuItem onClick={() => fontFamilyCell('Times')}>
                    Times
                </MenuItem>
            </Menu>

            <Menu
                menuClassName="border-menu font-size"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="字号">
                        <div className={styles['font-family']}>{curFS}</div>
                        <div className={styles.triangle}></div>
                    </div>
                }
            >
                {[10, 12, 14, 16, 18, 20, 22, 24].map((i) => (
                    <MenuItem onClick={() => fontSizeCell(i)} key={i}>
                        {i}
                    </MenuItem>
                ))}
            </Menu>

            <div className={styles.divider}></div>

            <Menu
                menuClassName="border-menu no"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="文字颜色">
                        <div className={styles['text-color']}></div>
                    </div>
                }
            >
                <MenuItem>
                    <ColorPanel getColor={textColorCell}></ColorPanel>
                </MenuItem>
            </Menu>
            <div
                className={`${styles['btn-wrap']} ${
                    toolbarStore.currentTextFillBold
                        ? styles['acitve-btn-wrap']
                        : ''
                } `}
            >
                <div
                    className={`${styles['text-bold']}`}
                    onClick={textBoldCell}
                    data-tip="加粗"
                ></div>
            </div>
            <div
                className={`${styles['btn-wrap']} ${
                    toolbarStore.currentTextFillItalic
                        ? styles['acitve-btn-wrap']
                        : ''
                } `}
            >
                <div
                    className={`${styles['text-italic']}`}
                    onClick={textItalicCell}
                    data-tip="斜体"
                ></div>
            </div>
            <div
                className={`${styles['btn-wrap']} ${
                    toolbarStore.currentTextFillUnderline
                        ? styles['acitve-btn-wrap']
                        : ''
                } `}
            >
                <div
                    className={`${styles['text-underline']}`}
                    onClick={textUnderLineCell}
                    data-tip="下划线"
                ></div>
            </div>
            <div className={styles['btn-wrap']}>
                <div
                    className={styles['merge-cell']}
                    onClick={mergeCell}
                    data-tip="合并单元格"
                ></div>
            </div>
            <div className={styles['btn-wrap']}>
                <div
                    className={styles['split-cell']}
                    onClick={splitCell}
                    data-tip="拆分单元格"
                ></div>
            </div>
            <Menu
                menuClassName="border-menu"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="边框">
                        <div className={styles.border}></div>
                    </div>
                }
            >
                <MenuItem onClick={() => toggleBorderCell(true)}>
                    <div className={styles['border-item']}>
                        <div className={styles['item-icon-all']}></div>
                        <div className={styles['item-text']}>所有框线</div>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => toggleBorderCell(false)}>
                    <div className={styles['border-item']}>
                        <div className={styles['item-icon-none']}></div>
                        <div className={styles['item-text']}>无框线</div>
                    </div>
                </MenuItem>
            </Menu>

            <Menu
                menuClassName="border-menu"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="边框线条">
                        <div className={styles['border-style']}></div>
                    </div>
                }
            >
                <MenuItem onClick={() => borderStyleCell('solid')}>
                    <div
                        className={styles['border-style-item']}
                        style={{ borderBottom: '2px solid #000' }}
                    ></div>
                </MenuItem>
                <MenuItem onClick={() => borderStyleCell('dashed')}>
                    <div
                        className={styles['border-style-item']}
                        style={{ borderBottom: '2px dashed #000' }}
                    ></div>
                </MenuItem>
                <MenuItem onClick={() => borderStyleCell('dotted')}>
                    <div
                        className={styles['border-style-item']}
                        style={{ borderBottom: '2px dotted #000' }}
                    ></div>
                </MenuItem>
            </Menu>
            <Menu
                menuClassName="border-menu no"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="边框颜色">
                        <div className={styles['border-color']}></div>
                    </div>
                }
            >
                <MenuItem>
                    <ColorPanel getColor={colorCell}></ColorPanel>
                </MenuItem>
            </Menu>

            <Menu
                menuClassName="border-menu no"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="单元格颜色">
                        <div className={styles['paint-fill']}></div>
                    </div>
                }
            >
                <MenuItem>
                    <ColorPanel getColor={fillCell}></ColorPanel>
                </MenuItem>
            </Menu>

            <Menu
                menuClassName="border-menu"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="垂直对齐">
                        {getVAlignBtn()}

                        <div className={styles.triangle}></div>
                    </div>
                }
            >
                <MenuItem onClick={() => verticalAlignCell('top')}>
                    <div className={styles['cell-v-align-top']}></div>
                </MenuItem>
                <MenuItem onClick={() => verticalAlignCell('middle')}>
                    <div className={styles['cell-v-align-middle']}></div>
                </MenuItem>
                <MenuItem onClick={() => verticalAlignCell('bottom')}>
                    <div className={styles['cell-v-align-bottom']}></div>
                </MenuItem>
            </Menu>

            <Menu
                menuClassName="border-menu"
                menuButton={
                    <div className={styles['btn-wrap']} data-tip="水平对齐">
                        {getAlignBtn()}
                        <div className={styles.triangle}></div>
                    </div>
                }
            >
                <MenuItem onClick={() => alignCell('left')}>
                    <div className={styles['cell-align-left']}></div>
                </MenuItem>
                <MenuItem onClick={() => alignCell('center')}>
                    <div className={styles['cell-align-center']}></div>
                </MenuItem>
                <MenuItem onClick={() => alignCell('right')}>
                    <div className={styles['cell-align-right']}></div>
                </MenuItem>
            </Menu>
        </div>
    )
}

export default observer(ToolBar)
