import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import "./Addreason.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import swal from "sweetalert";
import Table from "react-bootstrap/Table";

const addReason = async (data) => {
  console.log(data);
  const resp = await axios.post(
    "http://localhost:8080/api/admin/addreason",
    data
  );
  console.log(resp.data);
  return resp.data;
};
const getReasons = async () => {
  const resp = await axios.get("http://localhost:8080/api/admin/getAll");
  console.log(resp.data.data);
  return resp.data.data;
};
const AddReason = () => {
  const [reason, setReason] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = localStorage.getItem("token");

  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["reasons"],
    queryFn: getReasons,
  });
  console.log(data);
  const mutation = useMutation({
    mutationFn: (data) => addReason(data),
  });
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(reason);
    mutation.mutate(
      { reason, token },
      {
        onSuccess: (data) => {
          console.log("reason added successfully:", data);
          setReason("");
          swal({
            title: "reason added successfully!",
            icon: "success",
            button: "okk!",
          });
          refetch();
        },
      }
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    handleClose();
  };
  return (
    <>
      <>
        <Button variant="primary button" onClick={handleShow}>
          Add Reason
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Reason</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  type="text"
                  name="reason"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary button" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="secondary button" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <Table className="table" striped bordered hover>
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data?.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.reason}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </>
    </>
  );
};

export default AddReason;
