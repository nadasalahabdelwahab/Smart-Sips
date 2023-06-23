import { Component } from "react";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { FaPhone, FaRegEnvelope, FaBriefcase } from "react-icons/fa";
import NavBar from "../NavBar/NavBar";
import Footer from "./../../Footer/Footer";
// import { FaCirclePhone } from "@react-icons/all-files/fa/FaBeer";
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_zdsh8cd",
        "template_g81tffo",
        form.current,
        "YZ7ckoaKeFb_lFfqB"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <NavBar />
      <div className="big-contact-section">
        <div className="head-contact">
          <h1 data-aos="zoom-out" data-aos-duration="2000">
            Contact Us
          </h1>
        </div>
        <div
          className="container contact-section"
          data-aos="zoom-in"
          data-aos-easing="linear"
          data-aos-duration="800"
        >
          <div className="container" >
            <div className="row">
              <div className="col-lg-4 col-md-12 contact-information" >
                <form ref={form} onSubmit={sendEmail} method="get">
                  <label>Full Name </label>
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Enter Your Name"
                    required
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Enter Your Email"
                    required
                  />
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    required
                  />
                  <label>Your Message</label>
                  <textarea name="message" placeholder="Enter Your Message" />
                  <button
                    aria-label="submit the form"
                    className="btn"
                    type="submit"
                  >
                    SEND
                  </button>
                </form>
              </div>{" "}
              {/** end of contact-information */}
              <div
                className="col-lg-4 col-md-12 contact-getInTouch"
                data-aos="fade-down"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <h5 style={{ marginBottom: "20px" }}>Get In Touch </h5>
                <i>
                  {" "}
                  <FaPhone />{" "}
                </i>

                <h6>PHONE NUMBER</h6>
                <p>012 267 388 192</p>
                <i>
                  {" "}
                  <FaRegEnvelope />{" "}
                </i>

                <h6>EMAIL</h6>
                <p>Smartsips@Gmail.com</p>

                <h5>Our Office</h5>
                <i>
                  {" "}
                  <FaBriefcase />{" "}
                </i>
                <p>15 St Cairo Egypt, NY 10033</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
