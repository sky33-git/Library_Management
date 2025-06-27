import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const loc = useLocation();
  const pathBool = loc.pathname.startsWith("/adminportal");

  const linkStyle =
    "no-underline text-white font-bold transition duration-300 ease-in-out hover:text-yellow-300 hover:scale-105";

  return (
    <div className="h-[10vh] w-full bg-amber-900 shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 h-full">
        <ul className="flex flex-wrap justify-evenly items-center h-full py-4 list-none">
          {pathBool ? (
            <>
              <li><NavLink to="/adminportal" className={linkStyle}>HOME</NavLink></li>
              <li><NavLink to="/adminportal/books" className={linkStyle}>BOOKS</NavLink></li>
              <li><NavLink to="/adminportal/addbooks" className={linkStyle}>ADD BOOKS</NavLink></li>
              <li><NavLink to="/login" className={linkStyle}>LOGOUT</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/userportal" className={linkStyle}>HOME</NavLink></li>
              <li><NavLink to="/userportal/books" className={linkStyle}>BOOKS</NavLink></li>
              <li><NavLink to="/userportal/carts" className={linkStyle}>CART</NavLink></li>
              <li><NavLink to="/login" className={linkStyle}>LOGOUT</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
