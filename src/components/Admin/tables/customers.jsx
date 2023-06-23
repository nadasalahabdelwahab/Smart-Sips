import { React, useEffect, useState } from "react";
import "./Customers.scss";
// import CustomersData from "../../../customersData.json";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";

import {
  FaDownload,
  FaPen,
  FaTrash,
  FaPaperPlane,
  FaSearch,
} from "react-icons/fa";
import axiosInstance from "../../../axios";

const Customer = () => {
  const [selects, setSelects] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [tableFilter, setTableFilter] = useState([]);
  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setTableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setDataSource([...dataSource]);
    }
  };

  const recordesPerPage = selects;
  const lastIndex = currentPage * recordesPerPage;
  const firstIndex = lastIndex - recordesPerPage;
  const records = dataSource.slice(firstIndex, lastIndex);
  const npage = Math.ceil(dataSource.length / recordesPerPage);
  const nnumbers = [...Array(npage + 1).keys()].slice(1);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("user_api/userprofile/list");
        const productsData = response.data.map(async (user) => {
          const imageResponse = await axiosInstance.get(
            `/imageupload/${user.id}/imageupload/${user.id}/`
          );
          const image = imageResponse.data;
          return { ...user, image };
        });
        const productsWithImages = await Promise.all(productsData);
        setIsLoad((isLoad) => !isLoad);
        setDataSource(productsWithImages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [isLoad]);

  const handleDelete = (id) => {
    axiosInstance
      .delete(`user_api/userprofile/delete/${id}`)
      .then((res) => {
        toast.success("user deleted successfully");
        setIsLoad((isLoad) => !isLoad);
      })
      .catch((err) => {
        toast.error("Error occured");
      });
  };

  return (
    <>
      <Sidebar />

      <div className="cutstomer-container">
        <div className="cutstomer-header">
          <h1 data-aos="zoom-out" data-aos-duration="2000">
            Customers
          </h1>
          <h5 data-aos="zoom-out-left" data-aos-duration="2000">
            &nbsp;&nbsp;&nbsp; Welcome!
          </h5>
        </div>
        {/** cutstomer-header */}

        <div
          className="bodyOfCustomers container"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <h5>{dataSource.length} Customers</h5>
          <div className="container table-container ">
            <div className="row">
              <div
                className="col-lg-4 col-md-12 entites"
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <label>Show Entities :&nbsp;&nbsp;</label>

                <select
                  className=" select-box number-rows "
                  value={selects}
                  onChange={(e) => setSelects(Number(e.target.value))}
                >
                  <option value="5">5</option>
                  <option value="10" >
                    10
                  </option>
                  <option value="15" selected>15</option>
                  <option value="20">20</option>
                 
                </select>
              </div>
              <div
                className="col-lg-8 col-md-12 dS"
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration="800"
              >
                <div className="input-group mb-3 search d-flex">
                  <input
                    type="text"
                    placeholder="search"
                    style={{ fontFamily: "FontAwesome" }}
                    // placeholder="search"
                    className="form-control"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                    value={value}
                    onChange={filterData}
                  />
                </div>
                <i className="download">
                  <FaDownload />
                </i>
              </div>
            </div>
            <div
              className="container"
              data-aos="zoom-in-up"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="800"
            >
              <TableContainer className="customers-table" component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="tableCell" align="center">
                        Profile
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Name
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Email
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Phone
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Country
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Adress
                      </TableCell>
                      <TableCell className="tableCell" align="center">
                        Join Date
                      </TableCell>

                      <TableCell className="tableCell" align="center">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {/* {records.map((d, i) => ( */}
                    {value.length > 0
                      ? tableFilter.map((d, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className="tableCell">
                                <img src={d.image.profile_photo} alt="img" style={{borderRadius:"50%"}}/>
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.username}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.email}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.phone_number}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.country}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.address}
                              </TableCell>
                              <TableCell className="tableCell">
                                {new Date(d.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </TableCell>

                              <TableCell
                                // style={{ display: "flex", gap: "1rem" }}
                                className="tableCell"
                              >
                                <i style={{ paddingLeft: "6px" }}>
                                  <FaPaperPlane />
                                </i>
                                <i
                                  onClick={() => handleDelete(d.id)}
                                  style={{ paddingLeft: "6px" }}
                                >
                                  <FaTrash className="FaTrash" />{" "}
                                </i>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      : records.map((d, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell className="tableCell">
                                <img src={d.image.profile_photo} alt="img" />
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.username}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.email}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.phone_number}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.country}
                              </TableCell>
                              <TableCell className="tableCell">
                                {d.address}
                              </TableCell>
                              <TableCell className="tableCell">
                                {new Date(d.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </TableCell>

                              <TableCell
                                // style={{ display: "flex", gap: "1rem" }}
                                className="tableCell"
                              >
                                <i style={{ paddingLeft: "6px" }}>
                                  {" "}
                                  <FaPaperPlane />
                                </i>
                                <i
                                  onClick={() => handleDelete(d.id)}
                                  style={{ paddingLeft: "6px" }}
                                >
                                  <FaTrash className="FaTrash" />{" "}
                                </i>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <nav className="customersNavPage">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>
                  Previous
                </a>
              </li>
              {nnumbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    href="#"
                    className="page-link"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
};
export default Customer;
