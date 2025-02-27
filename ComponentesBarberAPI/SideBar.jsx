import { useState, useRef} from "react"
import "./sidebar.css"

const items = [
    {
        name: "home", icon:"home-2",
    }
]

const Icon = ({children}) => <i className={`lni lni-${children}`} />

export const SideBar = () =>{
    const [width, setWidth] = useState(60)
    const sidebarRef = useRef(null)
    const sidebar = sidebarRef.current

    const resize = e =>{
        let newWidth = e.clientX - sidebar?.offsetLeft
        if (newWidth < 60) newWidth = 60
        if (newWidth > 259) newWidth = 260
        setWidth(newWidth)
    }

    const stopResize = () =>{
        document.body.style.cursor = "default"
        window.removeEventListener("mousemove", resize)
        window.removeEventListener("mouseup", stopResize)
    }

    const initResize = () =>{
        document.body.style.cursor = "col-resize"
        window.addEventListener("mousemove", resize)
        window.addEventListener("mouseup", stopResize)
    }

    return (
        <aside
            ref={sidebarRef}
            style={{width: `${width}px`}}
            className="sidebar"
        >
            <div
                className="handle"
                onMouseDown={initResize}
            >
            </div>
            <div className="inner">
                <nav className="menu">
                    {items.map(item=>(
                        <button key={item.name}>
                            <Icon>{item.icon}</Icon>
                            <p>{item.name}</p>
                        </button>
                    ))}
                </nav>
            </div>
        </aside>
    )
}