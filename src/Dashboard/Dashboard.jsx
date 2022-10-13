import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function Dashboard() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [resources, setResources] = useState([]);
  const [open, setOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('')

  const getVendors = async () => {
    try {
      const data = await axios({
        method: "get",
        url: "http://witarist.herokuapp.com/vendor",
      }).then((res) => {
        if (res.data.data) {
          setVendors(res.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getResources = async () => {
    try {
      const data = await axios({
        method: "get",
        url: "http://witarist.herokuapp.com/resource",
      }).then((res) => {
        console.log("------------------------", res);
        if (res.data.data) {
          setResources(res.data.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendors();
    getResources();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "Scroll",
    height: "800px",
    padding:0
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    
    <h1>{"<Witarist Assignment />"}</h1>
    <div className="tableContainer">
      <button className="home" onClick={() => navigate("/")}>
        Home
      </button>
      <table className="table">
        <tr>
          <th>Vendor Name</th>
        </tr>
        {vendors
          ? vendors.map((x) => {
              return (
                <tr>
                  <td>{x.name}</td>
                </tr>
              );
            })
          : "Loading..."}
      </table>
      <table>
        <thead>
          <tr>
            <th colspan="4">Resources</th>
          </tr>
          <tr>
            <th>Name</th>
            <th>Vendor Name</th>
            <th>Technology</th>
            <th>Resume</th>
          </tr>
        </thead>
        <tbody>
          {resources.length
            ? resources.map((x) => {
                return (
                  <tr>
                    <td>{x.name}</td>
                    <td>{x.vendorName}</td>
                    <td>technology</td>
                    <td>
                      <a onClick={() => {
                        setOpen(true)
                        setPdfUrl(x.file?.data?.data)
                        }}>show</a>
                    </td>
                  </tr>
                );
              })
            : "loading..."}
        </tbody>
      </table>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {
                pdfUrl ?
                <iframe  src={`data:application/pdf;base64,${arrayBufferToBase64(pdfUrl)}`}></iframe>
                : 
                "Loading..."
            }
        </Box>
      </Modal>
    </div>
    </>
  );
}

export default Dashboard;
