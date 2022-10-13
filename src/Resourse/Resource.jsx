import React, { useEffect, useState } from "react";
import "./Resource.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Resource() {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [vendor, setVendor] = useState([]);
  const [values, setValues] = useState({
    name: "",
    file: "",
    vendorName: "",
    tech: [],
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflow: "Scroll",
    height: "250px",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVendor = async () => {
    try {
      const vendor = await axios({
        method: "get",
        url: "https://witarist.herokuapp.com/vendor",
      }).then((res) => {
        if (res.status === 200) {
          setVendor(res.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handelSearch = async (e) => {
    try {
      const vendor = await axios({
        method: "get",
        url: `https://witarist.herokuapp.com/vendor?name=${e.target.value}`,
      }).then((res) => {
        if (res.status === 200) {
          setVendor(res.data?.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVendor();
  }, []);

  const handleChange = (e,name) => {
    if (name === 'file') {
        console.log(e.target.files[0])
        setValues({...values,file:e.target.files[0]})
    }else if(name == 'vendorName'){
        setOpen(false)
        setValues({...values,vendorName:e})
        console.log(values)
    }else if(name == 'tech'){
        console.log(e.target.value,e.target.checked)
        if(e.target.checked){
        setValues({...values,tech:[...values.tech,e.target.value]})
        }else{
            setValues({...values,tech:values.tech?.filter(x => {return x !== e.target.value})})
        }
        console.log(values)
    }else{
        setValues({...values,[e.target.name]:e.target.value})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {   
        console.log(values)
        const form = new FormData()
        form.append('file',values.file)
        form.append('name',values.name)
        form.append('vendorName',values.vendorName)
        form.append('tech',values.tech)
        await axios({
            method:"post",
            url:"https://witarist.herokuapp.com/resource",
            data:form
        }).then(res => {
          // navigate("/")
        })

    } catch (error) {
        console.log(error)
    }
  }

  const {name, file, vendorName, tech} = values;

  return (
    <div>
      <img
        className="image"
        alt="Image"
        src="https://dl.airtable.com/.formViewCoverImages/0a036aa53540cf36cbb66aad5d789324/69b48725"
      />

      <div className="resource">
        <form>
          <h2>Enter Resource Details</h2>
          <h3>Enter resource information here</h3>
          <div>
            <label className="resourceLabel">Full Name</label>
            <input onChange={(e) => handleChange(e,'name')} name='name' value={name} className="resourceInput" />
          </div>
          <div>
            <label className="resourceLabel">Upload Resume</label>
            <input onChange={(e) => handleChange(e,'file')} name='file' type={"file"} className="resourceInput" />
          </div>
          <div>
            <label className="resourceLabel">Vendor Name</label>
            <button className="addVendor" onClick={(e) => {
              e.preventDefault();
              setOpen(true)
              }}>
              + Add
            </button>
            <span>{vendorName && vendorName}</span>
          </div>
          <div>
            <label className="resourceLabel">Technology</label>
            <div className="checkbox">
              <ul>
                <li>
                  <input onChange={(e) =>handleChange(e,"tech")} id="checkid" type="checkbox" value="Node Js" />
                  <label
                    for="checkid"
                    style={{ wordWrap: "break-word", width: "100px" }}
                  >
                    Node Js
                  </label>
                </li>
                <li>
                  <input  onChange={(e) =>handleChange(e,"tech")}  id="checkid2" type="checkbox" value="PHP" />
                  <label
                    for="checkid2"
                    style={{ wordWrap: "break-word", width: "100px" }}
                  >
                    PHP
                  </label>
                </li>
                <li>
                  <input onChange={(e) =>handleChange(e,"tech")}  id="checkid3" type="checkbox" value="ReactJS" />
                  <label
                    for="checkid3"
                    style={{ wordWrap: "break-word", width: "100px" }}
                  >
                    ReactJS
                  </label>
                </li>
                <li>
                  <input onChange={(e) =>handleChange(e,"tech")}  id="checkid4" type="checkbox" value="TypeScript" />
                  <label
                    for="checkid4"
                    style={{ wordWrap: "break-word", width: "100px" }}
                  >
                    TypeScript
                  </label>
                </li>
                <li>
                  <input onChange={(e) =>handleChange(e,"tech")}  id="checkid5" type="checkbox" value="Express Js" />
                  <label
                    for="checkid5"
                    style={{ wordWrap: "break-word", width: "100px" }}
                  >
                    Express Js
                  </label>
                </li>
              </ul>
            </div>
          </div>
          <button onClick={handleSubmit} className="resourceButton">Submit</button>
          <p style={{fontSize:"10px",display:"block"}}>Never submit passwords through this form. Report malicious form</p>

        </form>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            className="search"
            onChange={handelSearch}
            autoFocus
            type={"search"}
            placeholder="Find an Option"
          />
          <ul>
            {vendor.length &&
              vendor.map((res) => {
                return <li onClick={(e) => handleChange(res.name,'vendorName')} name='vendorName' className="vendorList">{res.name}</li>;
              })}
          </ul>
        </Box>
      </Modal>
    </div>
  );
}

export default Resource;
