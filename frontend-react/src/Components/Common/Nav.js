import React from "react";

export const Nav = ({
                      links,
                      navClass,
                      innerContainerClass,
                      activeLink,
                      activeLinkClass
                    }) =>
  <nav className={`nav ${navClass}`}>
    <ul className={innerContainerClass}>
      {
        links.map(({ name, href, children, target, itemClass, linkClass, onClick }, i) =>
          <li key={`${href}-${i}`} className={itemClass}>
            <a name={name}
               className={`${linkClass} ${name === activeLink && activeLinkClass}`}
               href={href}
               target={target}
               onClick={onClick}
            >
              {children}
            </a>
          </li>
        )
      }
    </ul>
  </nav>
;
