import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router-dom";
const ProfileEdit = (props) => {
  // const detail= localStorage.getItem("details");
  // const detailData= JSON.parse(detail);
  // console.log(detailData._id);
  // console.log(detail)
  // const id=detailData._id;
//   if(id == null){
// <Navigate to={"/"}/>
//   }
  const updateDetails = async ({ id, data }) => {
    console.log(id);
    console.log(data);
    const resp = await axios.post(
      `http://localhost:8080/api/user/update/${id}`,
      data
    );
    console.log(resp);
    return resp;
  };
  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateDetails({ id, data }),
    onSuccess:(resp)=>{
      console.log(resp)
      if(resp.status===200){
        swal({
          title: "Update successfully!",
          icon: "success",
          button: "okk!",
        });
      }
    }
  });
  const [data1, setData] = useState({
    name: "",
    email: "",
    address: "",
    gender: "",
  });
  const [formData, setFormData] = useState({ ...data1 });
  const fetchdetail = () => {
    if (token) {
      try {
        // Update the states with data from the token
        setData({
          name: decoded.name || "", // Use defaults if fields are missing
          email: decoded.email || "",
          address: decoded.address || "",
          gender: decoded.gender || "",
        });
        setFormData({
          name: decoded.data.name || "",
          email: decoded.data.email || "",
          address: decoded.data.address || "",
          gender: decoded.data.gender || "",
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchdetail,
    // enabled:false
  });
  const handleSave = () => {
    mutation.mutate({ data: formData, id });
    // Update the main details state setDetails(formData);
    props.onHide();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={true}
      enforceFocus={false}
      id="view"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender </Form.Label>
            <div>
              <Form.Check
                inline
                label="Male"
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
              />
              <Form.Check
                inline
                label="Female"
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileEdit;
