import React, { useState } from "react";
import "./Sidebar.css";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaChartSimple, FaBell, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

let easeing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};
const fadeInUp = {
  initial: {
    y: -60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easeing,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: easeing,
    },
  },
};

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const btnGroup = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.6, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};
const star = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.8, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};

const header = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.05, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};
const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState();
  const adminImage = localStorage.getItem("adminImage");
  console.log(adminImage);

  return (
    <motion.main
      className={show ? "space-toggle" : null}
      initial="initial"
      animate="animate"
    >
      <motion.header className="header" variants={stagger}>
        {/* <header  className="header" className={`header ${show ? 'space-toggle' : null}`}> */}
        <div className="logoandlink">
          <Link to="/dashboard" className="smart-linkk">
            <motion.img
              src={"./images/smartSipsLogo.png"}
              className="photologo"
              style={{ marginLeft: "-3px" }}
              variants={header}
            />

            <motion.span className="nav-link-name mt-2" variants={header}>
              Smart Sips
            </motion.span>
          </Link>
        </div>
        {/* <img src={"./images/smartSipsLogo.png"} className="photologo" style={{marginLeft:"-160px",position:"fixed"}}/> */}
        <div
          className="header-toggle"
          onClick={() => setShow(!show)}
          variants={header}
        >
          <i className={`fas fa-bars ${show ? "fa-solid fa-xmark" : null}`}></i>
        </div>
        <motion.nav className="navbar bg-body-tertiary" variants={stagger}>
          <motion.div className="container-fluid"  variants={header}>
            <form className="d-flex" role="search">
              <div className="input-containerr pass mt-3 big-searsh">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <i className="RegEyeSlash">
                  <FaSearch />
                </i>
              </div>
              {/* <i className='fabell ps-3  pt-1'><FaBell style={{width:"29px"}}/></i> */}
              <div className="headerrnotif">
                <div className="container">
                  <div className="links">
                    <i className="fabell   pt-1">
                      <FaBell style={{ width: "29px" }} />
                    </i>

                    <ul>
                      <li>
                        <a href="#">Notification</a>
                      </li>
                      <li>
                        <img
                          src={"./icons/Ellipse 13.png"}
                          alt="img"
                          className="notifphoto"
                        />
                        <span className="ms-1 spanpara">
                          Ahmed shared file with you
                        </span>
                        <span className="ms-3 spanmarg">3 hours</span>
                      </li>
                      <li>
                        <img
                          src={"./icons/Intersect-1.png"}
                          alt="img"
                          className="notifphoto"
                        />
                        <span className="ms-1 spanpara">
                          Ali send file in your Email
                        </span>
                        <span className="ms-4 spanmarg">12:34 pm</span>
                      </li>
                      <li>
                        <img
                          src={"./icons/Intersect.png"}
                          alt="img"
                          className="notifphoto"
                        />
                        <span className="ms-1 spanpara">
                          Omar send Message for you
                        </span>
                        <span className="ms-3 spanmarg">yesterday</span>
                      </li>
                      <Link to="/notification">
                        <li>
                          <a href="#" className="text-center text-primary">
                            View All
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </form>

            <div className="headerr">
              <div className="container">
                <div className="links">
                  <img
                    src={
                      adminImage ==
                      "http://smartsips-production.up.railway.app/images/upload_to/default.png"
                        ? "./icons/Ellipse 13.png"
                        : adminImage
                        ? adminImage
                        : "./icons/Ellipse 13.png"
                    }
                    alt="img"
                    className="imgnav"
                    style={{ borderRadius: "50%" }}
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  />

                  <ul className={toggle ? "showMenu" : ""}>
                    <Link to="/myaccount">
                      <li>
                        <a href="#">Account</a>
                      </li>
                    </Link>
                    <Link to="/setting">
                      {" "}
                      <li>
                        <a href="#">Setting</a>
                      </li>
                    </Link>
                    <li>
                      <Link to={"/logout"}>
                        <span>Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.nav>
      </motion.header>

      <aside className={`sidebar ${show ? "show" : null}`}>
        <nav className="nav">
          <div>
            <Link to="/dashboard" className="nav-linkk">
              <img
                src={"./images/smartSipsLogo.png"}
                className="photologo"
                style={{ marginLeft: "-3px" }}
              />
              <span className="nav-link-name mt-2">Smart Sips</span>
            </Link>
            <div className="nav-list">
              <NavLink
                to="/dashboard"
                className="nav-linnk"
                activeClassName="active-link"
              >
                <img src={"./icons/bar-chart.png"} className="dashphoto" />
                <span className="nav-link-name">Dashboard</span>
              </NavLink>
              <NavLink
                to="/customers"
                className="nav-linnk"
                activeClassName="active-link"
              >
                <img src={"./icons/group.png"} className="dashphoto" />
                <span className="nav-link-name">Customers</span>
              </NavLink>
              <NavLink
                to="/orders"
                className="nav-linnk"
                activeClassName="active-link"
              >
                <img
                  src={"./icons/shopping-bag (3).png"}
                  className="dashphoto"
                />
                <span className="nav-link-name">Orders</span>
              </NavLink>
              <NavLink
                to="/products"
                className="nav-linnk"
                activeClassName="active-link"
              >
                <img src={"./icons/box.png"} className="dashphoto" />
                <span className="nav-link-name">Products</span>
              </NavLink>

              <NavLink
                to="/mailbox"
                className="nav-linnk"
                activeClassName="active-link"
              >
                <img src={"./icons/letter.png"} className="dashphoto" />
                <span className="nav-link-name">Mailbox</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
    </motion.main>
  );
};

export default Sidebar;
