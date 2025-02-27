import {
    useEffect,
    useState,
    useRef,
    createRef
} from "react"

import 'table.css'

const TableHeader =
({ index, column, columnRef, initResize}) =>{
    const width = !!initResize
    ? column.width
    : "100%"

    return (
        <th
        ref={columnRef}
        style={{
            width: `${width}px`,
            minWidth: `${width}px`,
            maxWidth: `${width}px`, 
        }}
        >
        {column.name}
        {!!initResize &&(
            <span
                className="draggable"
                onMouseDown={e=> initResize(e,index)}
            ></span>
        )}
        </th>
    )
}

export const Table = ({ columns, data}) => {
    const [columnState, setColumnState] = useState(columns)
    const [columnRefs , setColumnRefs] = useState([])

    const wrapperRef = useRef(null)
    const activeIndex = useRef(null)

    const resize = e =>{
        const columnsCopy = [...columns]
        const column = columnsCopy[activeIndex.current]
        const columnRef = columnRefs[activeIndex.current]
        const nextWidth = e.clientX - columnRef.current.offsetLeft

        column.width = nextWidth
        setColumnState(columnsCopy)
    }

    const StopResize = () =>{
        document.body.style.cursor = "default"
        window.removeEventListener("mousemove", resize)
        window.removeEventListener("mouseup", StopResize)
    }

    const initResize = (e, index) =>{
        activeIndex.current = index
        e.stopPropagation()
        document.body.style.cursor = "col-resize"
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup",StopResize)
    }

    useEffect(()=>{
        setColumnRefs(
            Array(columns.length)
            .fill()
            .map((_, index) => 
                columnRefs[index] || createRef())
        )
    }, [])

    return(
        <div className="wrapper" ref={wrapperRef}>
            <table>
                <thead>
                    <tr>
                        {
                            columnState.map((column, index) => {
                                <TableHeader
                                key={column.name}
                                index={index}
                                column={column}
                                columnRef={columnRefs[index]}
                                initResize={
                                    index === columnState.length -1
                                    ? null
                                    : initResize
                                }
                                />
                            })
                        }
                    </tr>
                </thead>
                {/* tbody content here-->*/}
            </table>
        </div>
    )
}