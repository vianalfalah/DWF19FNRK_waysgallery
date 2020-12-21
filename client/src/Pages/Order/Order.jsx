import { useState, useEffect } from "react";
import { getOrder, getOffer } from "../../configs/services";
import { Dropdown, DropdownButton } from "react-bootstrap";
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
      <div style={{ marginTop: 60, display: "flex", marginLeft: 60 }}>
        <DropdownButton
          id="dropdown-item-button"
          title="My Order"
          size="sm"
          variant="secondary"
        >
          <Dropdown.Item
            as="button"
            onClick={() => {
              setTable(false);
            }}
          >
            My Order
          </Dropdown.Item>
          <Dropdown.Item
            as="button"
            onClick={() => {
              setTable(true);
            }}
          >
            My Offer
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {(table ? dataOffer : dataOrder).length > 0 ? (
        <div style={{ marginTop: 75 }}>
          {table ? (
            <Table table={table} data={dataOffer} />
          ) : (
            <Table table={table} data={dataOrder} />
          )}
        </div>
      ) : (
        <div
          style={{ marginTop: 75, display: "flex", justifyContent: "center" }}
        >
          <h2>Empty</h2>
        </div>
      )}
    </div>
  );
}

export default Order;
