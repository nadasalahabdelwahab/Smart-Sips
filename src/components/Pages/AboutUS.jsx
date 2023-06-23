import React from "react";
import './AboutUs.css'
import NavBar from "../Header/NavBar/NavBar";
import Footer from "../Footer/Footer";
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
 
const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};
const AboutUs = () => {
  return (<>

    <NavBar />
    <motion.div className="rapborder container" initial='initial' animate='animate'>
      <div className="abutpara"><h1>About Us</h1></div>
      <motion.div className="container download-section" variants={stagger}>
        <motion.div className="row mb-5" variants={header}>
          <div className="col-lg-5 col-sm-12 ms-5">

            <div className="explainn">
              <h1>
                Our Vision
              </h1>
              <p className="para-explain">
                We Are A Team in The College of Computer Science Working On
                Creating A Product That Analyzes Water Periodically To Product Our Health
                From Polluted Water That We Drink Or Use For Irrigation Which May Causes Plant Disesses.
              </p>
            </div>
          </div>

          <div className="col-lg-5 col-sm-12 download-image ms-5">

            <motion.img src="./images/aboutus1.png" alt="Download" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
          </div>


        </motion.div>
        {/* {'rowww'} */}
        <div className="row margrow mt-5">
          <div className="col-lg-5 col-sm-12 download-image me-5">

            <motion.img src="./images/ourteam1.png" alt="Download" initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:0.8}}/>
          </div>{" "}


          <div className="col-lg-5 col-sm-12 ms-5">

            <div className="explainn">

              <p className="para-explain mt-5">
                This Product Will Be Put Into Pure Water Centers To Determine Suitability For Drinking.
                In Water Tanks In Homes Or Near Water Filters In Faucets To Determine Filter Efficiency.
              </p>
              <p className="para-explain mt-5">
                Thess Sensor Collect And Anallyze Data In Real
                Time Upload it To The Server, And Then Display This Results
                On Our Mobile App DashBoard Which User Will Download it
                TO Monitor Concentrations Remotely Generated items And Warnings
              </p>
            </div>
          </div>

        </div>
        {/* {'roww'} */}
      </motion.div>
    </motion.div>
    <Footer />

  </>)
}
export default AboutUs;