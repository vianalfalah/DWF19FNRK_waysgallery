import Header from "../../component/Header/Header";
import { useState } from "react";
import { useHistory, useParams, withRouter } from "react-router-dom";
import { addHired } from "../../configs/services";
import { Button } from "react-bootstrap";
// import DatePicker from "react-datepicker";
import "./Hired.css";

function Hired() {
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const router = useHistory();
  let history = useHistory()

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
    if (
      formData.title &&
      formData.description &&
      formData.startDate &&
      formData.endDate &&
      formData.price
    ) {
      const { title, description, startDate, endDate, price } = formData;
      console.log(formData);
      addHired(
        {
          title,
          description,
          startDate,
          endDate,
          price,
          orderTo: id,
        },
        () => router.push("/home")
      );
    }
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
          />
          <div className="date">
            <input
              placeholder="Start Date"
              type="date"
              onFocus="(this.type='date')"
              onBlur="(this.type='text')"
              id="startDate"
              name="startDate"
              className="start"
              onChange={(e) => handleChange(e)}
            />

            <input
              placeholder="End Date"
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
            
            <Button className="cancel" onClick={() => history.goBack()}>Cancel</Button>
            <Button className="post" onClick={(e) => handleButton(e)}>
              Binding
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Hired;
