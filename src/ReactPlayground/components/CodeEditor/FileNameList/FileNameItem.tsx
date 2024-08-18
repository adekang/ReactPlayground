import classnames from 'classnames'
import React, {useEffect, useRef, useState} from 'react'
import styles from './index.module.scss'
import {Popconfirm} from "antd";

export interface FileNameItemProps {
    value: string
    activated: boolean
    creating: boolean
    readonly: boolean
    onClick: () => void
    onEditComplete: (name: string) => void
    children?: React.ReactNode,
    onRemove: () => void
}

export const FileNameItem: React.FC<FileNameItemProps> = (props) => {
    const {
        value,
        activated = false,
        creating,
        onEditComplete,
        onClick,
        onRemove,
        readonly
    } = props

    console.log(props)

    const [name, setName] = useState(value);
    const [editing, setEditing] = useState(creating)
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (creating) {
            inputRef?.current?.focus()
        }
    }, [creating]);


    const handleInputBlur = () => {
        setEditing(false);
        onEditComplete(name)
    }
    const handleDoubleClick = () => {
        setEditing(true)
        setTimeout(() => {
            inputRef?.current?.focus()
        }, 0)
    }


    return (
        <div
            className={classnames(styles['tab-item'], activated ? styles.activated : null)}
            onClick={onClick}
        >
            {
                editing ? (
                    <input
                        ref={inputRef}
                        className={styles['tabs-item-input']}
                        value={name}
                        onBlur={handleInputBlur}
                        onChange={(e) => setName(e.target.value)}
                    />
                ) : (
                    <>
                        <span onDoubleClick={!readonly ? handleDoubleClick : () => {
                        }}>{name}</span>
                        {
                            !readonly ? (
                                <Popconfirm
                                    title="确认删除该文件吗？"
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={(e) => {
                                        e?.stopPropagation();
                                        onRemove();
                                    }}
                                >
            <span style={{marginLeft: 5, display: 'flex'}}>
                <svg width='12' height='12' viewBox='0 0 24 24'>
                    <line stroke='#999' x1='18' y1='6' x2='6' y2='18'></line>
                    <line stroke='#999' x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
            </span>
                                </Popconfirm>
                            ) : null
                        }
                    </>
                )
            }
        </div>
    )
}
