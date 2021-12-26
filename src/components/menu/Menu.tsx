import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import history from "../../history";

export interface ILink{
    url:string,
    caption:string,
    disabled?:boolean
}

interface IProps {
    links:Array<ILink>,
    activePage:string,
}

const Menu = (props:IProps)=>{
    const {links,activePage}=props;
    const currentPage = history.location.pathname;
    const renderLink = (args:ILink,isActive:boolean)=>{
        const {url, caption, disabled} = args
        return(
        <Link 
            className={`nav-link ${isActive?'active':''} ${disabled?'disabled':''}`}  
            aria-current="page" 
            to={url}>{caption}
        </Link>
        )
    }
    
    return (
    <ul className="nav flex-column">
        {links.map(it=>(
            <li className="nav-item" key={it.url}>
                {renderLink(it,it.url===currentPage)}
            </li>
        ))}
    </ul>
    )
}
export default Menu;