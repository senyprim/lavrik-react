import React from "react";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
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
        <NavLink exact
            className="nav-link"
            activeClassName="active link-danger"
            aria-current="page" 
            disabled={true}
            to={url}
        >
                {caption}
        </NavLink>
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