import "footer.css"

export const Footer = ()=>{
    return(
            <footer>
                <img 
                className="logo" 
                src="logo.svg"/>
                <div className="social">
                    <a className="fa-brands" fa-x-twitter></a>
                    //more brands to search
                </div>
                <div className="links">
                    <ul>
                        <li>
                            <h2>Services</h2>
                        </li>
                        <li>
                            <h2>Staking</h2>
                        </li>
                    </ul>
                </div>
            </footer>
    )
}