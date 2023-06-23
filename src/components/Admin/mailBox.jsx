import { BrowserRouter, Link, Route } from "react-router-dom";
import InBox from "./inBox";
import mailData from "./mailBoxData.json";
import "./mailBox.css";
import MailChat from "./mailChat";
import { useState } from "react";
import Sidebar from "./Sidebar";

const MailBox = () => {
  const [toggleState, SettoggleState] = useState(1);
  const toggleLink = (index) => {
    SettoggleState(index);
  };

  const [closeState, SetcloseState] = useState(false);
  function HandelCloseFunction() {
    SetcloseState(!closeState);
  }
  function HandelOpenFunction() {
    SetcloseState(false);
  }
  let displayclass = closeState ? "display_Chat" : null;
  return (
    <>
      <Sidebar />
      <div
        className="cutstomer-container"
        style={{ paddingBottom: "55px", height: "100%" }}
      >
        <div className="cutstomer-header">
          <h1 data-aos="zoom-out" data-aos-duration="2000">ChatBox</h1>
          <h5 data-aos="zoom-out-left" data-aos-duration="2000">&nbsp;&nbsp;&nbsp; Welcome!</h5>
        </div>

        <div className="container mail_Box_InfoAndChat" >
          <div className="row mail_Box_InfoAndChat_Space "  data-aos="zoom-out"
              data-aos-easing="linear"
              data-aos-duration="800">
            <div
              className={
                !closeState
                  ? `col-lg-6  col-md-10  mail_box_Info`
                  : `col-md-11 col-12 mail_box_Info`
              }
              // data-aos="fade-right"
              // data-aos-easing="linear"
              // data-aos-duration="800"
             
            >
              <div className="container mail_Box_Nav">
                <ul className="row mail-Box-list-links">
                  <li
                    className={
                      toggleState === 1
                        ? `d-flex mail-Box-list-link mail-Box-list-link-Active col-2 `
                        : `d-flex mail-Box-list-link col-2`
                    }
                    onClick={() => toggleLink(1)}
                  >
                    <img
                      src={
                        toggleState === 1
                          ? "./icons/inbox.png"
                          : "./icons/inbox (2).png"
                      }
                      alt="download"
                      className="mail-nav-download"
                    ></img>
                    <Link
                      to="/mailbox/"
                      className={
                        toggleState === 1
                          ? "Link-Active-Color-InBox"
                          : "Link-NonActive-Color-InBox"
                      }
                    >
                      Chat
                    </Link>
                    <div
                      className="inbox_count"
                      style={
                        toggleState === 1
                          ? { backgroundColor: "#0B69BB" }
                          : { backgroundColor: "rgb(192, 189, 189)" }
                      }
                    >
                      1
                    </div>
                  </li>
                  <li
                    className={
                      toggleState === 2
                        ? "d-flex mail-Box-list-link mail-Box-list-link-Active col-2"
                        : "d-flex mail-Box-list-link col-2"
                    }
                    onClick={() => toggleLink(2)}
                  >
                    <img
                      src={
                        toggleState === 2
                          ? "./icons/paper-plane (4).png"
                          : "./icons/paper-plane (5).png"
                      }
                      alt="paper-plane"
                      className="mail-nav-download "
                    ></img>
                    <Link
                      to="/mailbox/sent"
                      className={
                        toggleState === 2
                          ? "Link-Active-Color-InBox"
                          : "Link-NonActive-Color-InBox"
                      }
                    >
                      Sent
                    </Link>
                  </li>
                  <li
                    className={
                      toggleState === 3
                        ? "col-2 d-flex mail-Box-list-link mail-Box-list-link-Active"
                        : "col-2 d-flex mail-Box-list-link"
                    }
                    onClick={() => toggleLink(3)}
                  >
                    <img
                      src={
                        toggleState === 3
                          ? "./icons/star (1).png"
                          : "./icons/star (2).png"
                      }
                      alt="star"
                      className="mail-nav-download "
                    ></img>
                    <Link
                      to="/mailbox/star"
                      className={
                        toggleState === 3
                          ? "Link-Active-Color-InBox"
                          : "Link-NonActive-Color-InBox"
                      }
                    >
                      Star
                    </Link>
                    <div
                      className="star-count"
                      style={
                        toggleState === 3
                          ? { backgroundColor: "#0B69BB" }
                          : { backgroundColor: "rgb(192, 189, 189)" }
                      }
                    >
                      2
                    </div>
                  </li>
                  <li
                    className={
                      toggleState === 4
                        ? "col-2 d-flex mail-Box-list-link mail-Box-list-link-Active"
                        : "col-2 d-flex mail-Box-list-link"
                    }
                    onClick={() => toggleLink(4)}
                  >
                    <img
                      src={
                        toggleState === 4
                          ? "./icons/pencil (3).png"
                          : "./icons/pencil (4).png"
                      }
                      alt="pencil"
                      className="mail-nav-download"
                    ></img>
                    <Link
                      to="/mailbox/draft"
                      className={
                        toggleState === 4
                          ? "Link-Active-Color-InBox"
                          : "Link-NonActive-Color-InBox"
                      }
                    >
                      Draft
                    </Link>
                  </li>
                  <li
                    className={
                      toggleState === 5
                        ? "col-2 d-flex mail-Box-list-link mail-Box-list-link-Active"
                        : " col-2 d-flex mail-Box-list-link"
                    }
                    onClick={() => toggleLink(5)}
                  >
                    <img
                      src={`./icons/${
                        toggleState === 5 ? "trash.png" : "pencil (4).png"
                      }`}
                      alt="paper-plane"
                      className="mail-nav-download "
                    ></img>
                    <Link
                      to="/mailbox/deleted"
                      className={
                        toggleState === 5
                          ? "Link-Active-Color-InBox"
                          : "Link-NonActive-Color-InBox"
                      }
                    >
                      Deleted
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="container mail_Box_pages" >
                <BrowserRouter>
                  <Route path="/mailbox/" exact>
                    <InBox
                      data={mailData}
                      HandelOpen={HandelOpenFunction}
                    ></InBox>
                  </Route>
                </BrowserRouter>
              </div>
            </div>

            <div className={`col-lg-4 col-9  mail_box_Chat ${displayclass}`} data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="800">
              <MailChat HandelClose={HandelCloseFunction} />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default MailBox;
