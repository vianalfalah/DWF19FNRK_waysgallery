import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { editStatusHired } from "../../configs/services";
import "./Table.css";
import { SUCCESS, UNSUCCESS } from "../../configs/icons";
import SEND from "../../assets/icon/truck.svg";

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
const Td = ({ data, index, table }) => {
  const [status, setStatus] = useState(data.status);
  const onAction = (status) => {
    editStatusHired(data.id, { status });
    setStatus(status);
  };
  return (
    <>
      <tr>
        <td>{+index + 1}</td>
        <td>{table ? data.offers.fullName : data.orders.fullName}</td>
        <td>{data.title}</td>
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
              <button className="action-succsess cursor">Cek Project</button>
            </Link>
          ) : status === "Success" ? (
            <div className="item-center">
              <i className="fas fa-check status-check"></i>
            </div>
          ) : status === "On Progress" && table ? (
            <Link to={`/send-project/${data.id}`}>
              <button className="action-succsess cursor">Submit</button>
            </Link>
          ) : status === "Waiting Approve" && !table ? (
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
              <i className="fas fa-check status-check"></i>
            </div>
          ) : (
            <div className="item-center">
              {table ? <i className="fas fa-times status-cancel"></i> : "Wait"}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};

export default Table;
