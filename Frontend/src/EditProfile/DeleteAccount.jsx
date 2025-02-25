import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import swal from "sweetalert";
import "./alert.css";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
const DeleteAccount = (props) => {
  const [reason, setReason] = useState("");
  const [reasonId, setReasonId] = useState("");
  // const detail= localStorage.getItem("details");
  // const detailData= JSON.parse(detail);
  // console.log(detailData._id);
  // const id=detailData._id;
  const getReason = async () => {
    const resp = await axios.get("http://localhost:8080/api/admin/getAll");
    console.log(resp);
    return resp.data.data;
  };
  const deleteAccount = async () => {
    console.log(reasonId);
    const resp = await axios.post(
      `http://localhost:8080/api/user/deleteAccount/${id}`,
      { reasonId }
    );
    console.log(resp);
    console.log(resp.data);
    return resp.data;
  };
  const handleReasonChange = (e) => {
    setReason(e.target.value);
    setReasonId(e.target.id);
  };
  const { data } = useQuery({
    queryKey: ["reasons"],
    queryFn: getReason,
  });
  const mutation = useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: (resp) => {
      console.log(resp);
      if (resp.status === 200) {
        swal({
          title: "Account Deleted successfully!",
          icon: "success",
          button: "okk!",
        });
        localStorage.removeItem("token");
        <Navigate to={"/"}/>
      }
    },
  });
  useEffect(() => {
    console.log(reason);
    console.log(reasonId);
  }, [reason, reasonId]);
  // console.log(id);
  const handleDelete = () => {
    mutation.mutate();
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
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
          <Modal.Title>Select Reason For Delete Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {data &&
            data?.map((item, index) => (
              <>
                <div key={item._id}>
                  <input
                    type="radio"
                    name="reason"
                    checked={reason === item?.reason && reasonId === item?._id}
                    value={item?.reason}
                    id={item?._id}
                    onChange={handleReasonChange}
                  />
                  <span>{item.reason}</span>
                  <br />
                </div>
              </>
            ))}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteAccount;
