import { useDashboardContext } from '../pages/Dashboard';
import { linksAdmin, linksInventoryManager, linksClerk } from '../utilities/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
    const { toggleSidebar, role } = useDashboardContext();

    if (role === 'admin') {
        return (
            <div className="nav-links">
                {linksAdmin.map((link) => {
                    const { text, path, icon } = link;
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            className="nav-link"
                            onClick={isBigSidebar ? 'null' : toggleSidebar}
                            end
                        >
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
    if (role === 'inventoryManager') {
        return (
            <div className="nav-links">
                {linksInventoryManager.map((link) => {
                    const { text, path, icon } = link;
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            className="nav-link"
                            onClick={isBigSidebar ? 'null' : toggleSidebar}
                            end
                        >
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
    if (role === 'clerk') {
        return (
            <div className="nav-links">
                {linksClerk.map((link) => {
                    const { text, path, icon } = link;
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            className="nav-link"
                            onClick={isBigSidebar ? 'null' : toggleSidebar}
                            end
                        >
                            <span className="icon">{icon}</span>
                            {text}
                        </NavLink>
                    );
                })}
            </div>
        );
    }
};

export default NavLinks;
