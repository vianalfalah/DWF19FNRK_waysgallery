import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editStatusHired } from "../../configs/services";
import { Modal } from "react-bootstrap";
import "./Table.css";
import { SUCCESS, UNSUCCESS } from "../../configs/icons";
import WAIT from "../../assets/icons/wait.svg";
import PROGRESS from "../../assets/icons/progress.png";
import format from "../../configs/formatCurency";

const ModalView = ({ show, setShow, data, table, index }) => {
  const handleClose = () => setShow(false);
  console.log(data);
  return (
    <Modal centered show={show} setShow={setShow} onHide={handleClose}>
      <div style={{ margin: 20, fontFamily: "Poppins" }}>
        <p>Title : {table ? data.offers.title : data.title}</p>
        <p>
          Description : {table ? data.offers.description : data.description}
        </p>
        <p style={{ color: "#00E016" }}>
          Price : {format(table ? data.offers.price : data.price)}
        </p>
      </div>
    </Modal>
  );
};
function Table({ data, table }) {
  return (
    <table className="table-income" border="2">
      <thead className="head">
        <tr>
          <th>No</th>
          <th>{table ? "Client" : "Vendor"}</th>
          <th>Order</th>
          <th>Start Project</th>
          <th>End Project</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0
          ? data.map((hire, index) => (
              <Td data={hire} index={index} table={table} key={index} />
            ))
          : null}
      </tbody>
    </table>
  );
}
const Td = ({ data, index, table, dispatch, state }) => {
  const [status, setStatus] = useState(data.status);
  const [showView, setShowView] = useState(false);
  const onAction = (status) => {
    editStatusHired(data.id, { status });
    setStatus(status);
  };

  const handleModal = () => {
    setShowView(true);
  };
  return (
    <>
      <tr>
        <td>{+index + 1}</td>
        <td>{table ? data.offers.fullName : data.orders.fullName}</td>
        <td>
          <div onClick={handleModal}>{data.title}</div>
          <ModalView
            show={showView}
            setShow={setShowView}
            dispatch={dispatch}
            state={state}
            data={data}
          />
        </td>
        <td>{new Date(data.startDate).toUTCString()}</td>
        <td>{new Date(data.endDate).toUTCString()}</td>
        <td>
          {status === "Success" ? (
            <p className="success text-center">Success</p>
          ) : status === "Waiting Approve" ? (
            <p className="waiting-approve">Waiting Approve</p>
          ) : status === "On Progress" ? (
            <p className="on-the-way text-center">On Progress</p>
          ) : (
            <p className="cancel text-center">Cancel</p>
          )}
        </td>
        <td>
          {status === "Success" && !table ? (
            <Link to={`/project/${data.projects.id}`}>
              <button className="cek">Cek Project</button>
            </Link>
          ) : status === "Success" ? (
            <div className="item-center">
              <img src={SUCCESS} />
            </div>
          ) : status === "On Progress" && table ? (
            <Link to={`/send-project/${data.id}`}>
              <button className="cek">Submit</button>
            </Link>
          ) : status === "Waiting Approve" && table ? (
            <div className="item-center">
              <button
                className="btn-action cancell"
                onClick={() => onAction("Cancel")}
              >
                Cancel
              </button>
              <button
                className="btn-action successs"
                onClick={() => onAction("On Progress")}
              >
                Approve
              </button>
            </div>
          ) : status === "Waiting Approve" ? (
            <div className="item-center">
              <img src={WAIT} />
            </div>
          ) : (
            <div className="item-center">
              {table ? <img src={UNSUCCESS} /> : <img src={PROGRESS} />}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default Table;
