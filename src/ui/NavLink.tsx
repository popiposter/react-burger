import React, { FC } from 'react';
import { Link, NavLinkProps, Route } from 'react-router-dom';

/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
interface INavLinkProps extends Omit<NavLinkProps, 'children' | 'to'> {
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
  to: string | { pathname: string; search: string };
}

const NavLink: FC<INavLinkProps> = ({
  to,
  exact,
  strict,
  location,
  activeClassName,
  className,
  activeStyle,
  style,
  isActive: getIsActive,
  children,
  ...rest
}) => (
  <Route
    path={typeof to === 'object' ? to.pathname : to}
    exact={exact}
    strict={strict}
    location={location}
    children={({ location, match }) => {
      const isActive = !!(getIsActive ? getIsActive(match, location) : match);
      if (isActive) {
        className = `${className} ${activeClassName}`;
        style = { ...style, ...activeStyle };
      } else {
        className = `${className}`;
        style = { ...style };
      }

      return (
        <Link to={to} className={className} style={style} aria-current={isActive} {...rest}>
          {typeof children === 'function' ? children(isActive) : children}
        </Link>
      );
    }}
  />
);

export default NavLink;
