import Header from "../../component/Header/Header";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { addHired } from "../../configs/services";
import { Button, Modal } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import "./Hired.css";

function ModalAdd(props) {
  useEffect(() => {
    if (props.show === true) {
      setTimeout(() => {
        props.setShow(false);
        props.custom();
      }, 3000);
    }
  });

  return (
    <Modal {...props} centered>
      <div className="modal-add">
        <p className="modal-title">
          We have sent your offer, please wait for the user to accept it
        </p>
      </div>
    </Modal>
  );
}
function Hired() {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({});

  const { id } = useParams();
  const router = useHistory();
  let history = useHistory();

  const handleChange = (e) => {
    if (e.target) {
      const key = e.target.name;
      let value = e.target.value;
      if (key === "startDate" || key === "endDate") {
        value = dateJson(value);
      }
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleButton = (e) => {
    e.preventDefault();
    // if (
    //   formData.title &&
    //   formData.description &&
    //   formData.startDate &&
    //   formData.endDate &&
    //   formData.price
    // )
    {
      const { title, description, startDate, endDate, price } = formData;
      console.log(formData);
      const body = new FormData();
      body.append("title", title);
      body.append("description", description);
      body.append("startDate", startDate);
      body.append("endDate", endDate);
      body.append("price", price);
      addHired(
        {
          title,
          description,
          startDate,
          endDate,
          price,
          orderTo: id,
        },
        () => setModalShow(true)
      );
      console.log(addHired);
    }
  };
  const redirect = () => {
    router.push("/order");
  };
  const dateJson = (date) => {
    const dateNew = new Date(date);
    const jsonDate = dateNew.toJSON();
    return jsonDate;
  };
  return (
    <div>
      <Header />
      <div className="w-2/5 px-10">
        <form className="form-hired">
          <input
            name="title"
            placeholder="Title"
            className="title"
            onChange={(e) => handleChange(e)}
          />
          <textarea
            placeholder="Description"
            name="description"
            rows="5"
            className="description"
            onChange={(e) => handleChange(e)}
          />
          <div className="date">
            <input
              placeholder="Start Project"
              type="date"
              id="startDate"
              name="startDate"
              className="start"
              onChange={(e) => handleChange(e)}
            />

            <input
              placeholder="End Project"
              type="date"
              id="endDate"
              name="endDate"
              className="end"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="price"
            onChange={(e) => handleChange(e)}
          />
          <div className="box-btn-binding">
            <Button className="cancel" onClick={() => history.goBack()}>
              Cancel
            </Button>
            <Button className="post" onClick={(e) => handleButton(e)}>
              Binding
            </Button>
            <ModalAdd
              show={modalShow}
              setShow={setModalShow}
              custom={redirect}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hired;
