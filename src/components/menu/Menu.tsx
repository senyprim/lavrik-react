import React from "react";
import { NavLink} from "react-router-dom";

export interface ILink {
  url: string;
  caption: string;
  disabled?: boolean;
}

interface IProps {
  links: Array<ILink>;
}

const Menu = (props: IProps) => {
  const { links } = props;
  console.log(links);
  const renderLink = (args: ILink) => {
    const { url, caption, disabled } = args;
    return (
      <NavLink
        className={`nav-link} ${disabled ? "disabled" : ""}`}
        activeClassName="active"
        aria-current="page"
        to={url}
      >
        {caption}
      </NavLink>
    );
  };

  return (
    <ul className="nav flex-column">
      {links.map((it) => (
        <li className="nav-item" key={it.url}>
          {renderLink(it)}
        </li>
      ))}
    </ul>
  );
};
export default Menu;
