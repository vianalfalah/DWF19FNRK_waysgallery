import { useState, useEffect } from "react";
import { getOrder, getOffer } from "../../configs/services";
import Table from "./Table";
import "./Order.css";
import Header from "../../component/Header/Header";
function Order() {
  const [table, setTable] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [dataOffer, setDataOffer] = useState([]);
  useEffect(() => {
    getOrder(setDataOrder);
    getOffer(setDataOffer);
  }, []);
  return (
    <div>
      <Header />
      <div>
        <button
          className="btn"
          onClick={() => {
            setTable(false);
          }}
        >
          My Order
        </button>
        <button
          className="btn"
          onClick={() => {
            setTable(true);
          }}
        >
          My Offer
        </button>
      </div>
      {(table ? dataOffer : dataOrder).length > 0 ? (
        <div className="mt-50">
          {table ? (
            <Table table={table} data={dataOffer} />
          ) : (
            <Table table={table} data={dataOrder} />
          )}
        </div>
      ) : (
        <div className="mt-50">
          <h2>Empty</h2>
        </div>
      )}
    </div>
  );
}

export default Order;
