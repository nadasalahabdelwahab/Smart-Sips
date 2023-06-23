import { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import { FaRegHeart, FaRegUser, FaShoppingBag, FaCartPlus, FaRegUserCircle } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RiUserSettingsLine } from 'react-icons/ri'
import { IoMdLogOut, IoIosClose } from 'react-icons/io'
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../../axios';


import { motion } from "framer-motion"; 
 
let easeing = [0.6,-0.05,0.01,0.99]; 
 
const stagger = { 
  animate:{ 
    transition:{ 
      delayChildren:0.4, 
      staggerChildren:0.2, 
      staggerDirection:1 
    } 
  } 
} 
const fadeInUp = { 
  initial:{ 
    y:-60, 
    opacity:0, 
    transition:{ 
      duration:0.6, ease:easeing 
    } 
  }, 
  animate:{ 
    y:0, 
    opacity:1, 
    transition:{ 
      duration:0.6, 
      delay:0.5, 
      ease:easeing 
    } 
  } 
}; 
 
const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]}; 
 
const firstName = { 
  initial:{ 
    y:-20, 
  }, 
  animate:{ 
    y:0, 
    transition:{ 
      delayChildren:0.4, 
      staggerChildren:0.04, 
      staggerDirection:-1 
    } 
  } 
} 
 
const lastName = { 
  initial:{ 
    y:-20, 
  }, 
  animate:{ 
    y:0, 
    transition:{ 
      delayChildren:0.4, 
      staggerChildren:0.04, 
      staggerDirection:1 
    } 
  } 
} 
 
const letter = { 
  initial:{ 
    y:400, 
  }, 
  animate:{ 
    y:0, 
    transition:{duration:1, ...transition} 
  } 
}; 
 
const btnGroup={ 
  initial:{ 
    y:-60, 
    opacity:0, 
    transition:{duration:0.6, ease:easeing} 
  }, 
  animate:{ 
    y:0, 
    opacity:1, 
    animation:{ 
      duration:0.6, 
      ease:easeing 
    } 
  } 
}; 
const star={ 
  initial:{ 
    y:60, 
    opacity:0, 
    transition:{duration:0.8, ease:easeing} 
  }, 
  animate:{ 
    y:0, 
    opacity:1, 
    animation:{ 
      duration:0.6, 
      ease:easeing 
    } 
  } 
}; 
 
const header={ 
  initial:{ 
    y:-60, 
    opacity:0, 
    transition:{duration:0.05, ease:easeing} 
  }, 
  animate:{ 
    y:0, 
    opacity:1, 
    animation:{ 
      duration:0.6, 
      ease:easeing 
    } 
  } 
};
class NavBar extends Component {
  state = { token: false, layout: false, userName: '', dropdownOpen: false }
  handleDropdownToggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  componentDidMount() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token')
    if (token) {
      this.setState({ token: true })
      const fetchUserProfiles = async () => {
        try {
          const response = await axiosInstance.get(`/user_api/${userId}/userprofile/get`);
          this.setState({ userName: response.data[0].username })
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserProfiles();
    }
  }
  handleUserLogin() {

    if (this.state.token) {
      this.setState({ layout: true })
    } else {
      window.location.assign('/signin')
    }
  }

  render() {
    const { dropdownOpen } = this.state;
    return (<>
    <motion.div initial='initial' animate='animate'>
     <motion.nav className="navbar navbarr navbar-expand-lg bg-light " variants={stagger}>
     <div className="container-fluid navpos">
     <div>
          <motion.img
           src={"./images/smartSipsLogo.png"}
            className="logoImg"
            style={{ marginLeft: "-3px" }}
            variants={header}
          />
         
          <motion.span className="nav-link-name logl mt-3" variants={header}>Smart Sips</motion.span>
          </div>
        
          <button aria-label="button toggler" className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>
          <motion.div className="collapse navbar-collapse " id="navbarSupportedContent" variants={stagger}>
            <motion.ul className="navbar-nav navLink ms-auto" variants={header}>
              <li className="nav-item">
                <Link className="nav-link active Home_link" aria-current="page" to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/shop">Shop</Link>
              </li>

              <li className={`nav-item dropdown ${dropdownOpen ? "drop" : ""}`}>
                <a onClick={this.handleDropdownToggle} className="nav-link dropdown-toggle" href="#/" role="button" aria-expanded="false">
                  Pages
                </a>
                <ul className="dropdown-menu" style={{ display: dropdownOpen ? "block" : "none" }}>
                  <li><Link className="dropdown-item" to='/aboutus'>About Us</Link></li>
                  <li><Link className="dropdown-item" to='/orderhistory'>History Order</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#/" to='/contact'>Contact</Link>
              </li>

              <li className="nav-item nav-icon" style={{ marginLeft: "20px" }} >
                <Link className="nav-link" href="/" to='/wishlist'><FaRegHeart /></Link>
              </li>
              <li className="nav-item nav-icon">
                <Link className="nav-link" href="/" to='/cart'> <FaCartPlus /></Link>
              </li>



              <li className="nav-item nav-icon lastNavIcon" style={{ marginRight: "20px", marginTop: "2px" }}>
                <button aria-label="button toggler" style={{ background: "transparent", border: "none", color: "#0B69BB" }} className="nav-link" href="#/" onClick={this.handleUserLogin.bind(this)}><FaRegUser /></button>
                {
                  this.state.layout && (
                    <div className="userLoggedInWrapper">
                      <span>{this.state.userName}</span>
                      <hr />
                      <Link to={'/profile'} >
                        <RiUserSettingsLine />
                        <span>Profile</span>
                      </Link>
                      <Link to={'/logout'} >
                        <IoMdLogOut />
                        <span>Logout</span>
                      </Link>
                      <span className="ioCloseIcon" title="close menu" onClick={() => this.setState({ layout: false })}>
                        <IoIosClose />
                      </span>
                    </div>
                  )
                }
              </li>
              {/* <li className="nav-item nav-icon" style={{marginRight:"20px"}}>
          <Link className="nav-link" href="#/" to='/profile'><FaRegUser/></Link>
        </li> */}


            </motion.ul>
          </motion.div>
        </div>
      </motion.nav>
      </motion.div>



    </>);
  }
}

export default NavBar;