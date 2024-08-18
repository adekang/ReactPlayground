import {useContext, useEffect, useState} from "react"
import {PlaygroundContext} from "../../../PlaygroundContext.tsx";
import styles from './index.module.scss'
import {FileNameItem} from "./FileNameItem.tsx";
import {APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME} from "../../../files.ts";

export default function FileNameList() {
    const {
        files,
        addFile,
        removeFile,
        selectedFileName,
        setSelectedFileName,
        updateFileName,
    } = useContext(PlaygroundContext)
    const readonlyFileNames = [ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME, APP_COMPONENT_FILE_NAME];
    const [tabs, setTabs] = useState([''])

    useEffect(() => {
        setTabs(Object.keys(files))
    }, [files])

    const handleEditComplete = (name: string, oldName: string) => {
        updateFileName(oldName, name)
        setSelectedFileName(name)
    }

    const [creating, setCreating] = useState(false);

    const addTab = () => {
        const newFileName = 'Comp' + Math.random().toString().slice(2, 8) + '.tsx';
        addFile(newFileName);
        setSelectedFileName(newFileName);
        setCreating(true)
    }

    const handleRemove = (name: string) => {
        removeFile(name)
        setSelectedFileName(ENTRY_FILE_NAME)
    }

    return <div className={styles.tabs}>
        {
            tabs.map((item, index, arr) => (
                <FileNameItem
                    key={item + index}
                    value={item}
                    readonly={readonlyFileNames.includes(item)}
                    activated={selectedFileName === item}
                    creating={creating && index === arr.length - 1}
                    onClick={() => setSelectedFileName(item)}
                    onEditComplete={(name: string) => handleEditComplete(name, item)}
                    onRemove={() => handleRemove(item)}
                >
                </FileNameItem>
            ))
        }
        <div className={styles.add} onClick={addTab}>
            +
        </div>
    </div>
}
