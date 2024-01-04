import { useState } from "react";
import "./EmployeeForm.css";
import { EmployeeTypes } from "./EmployeeType";

type Props = {
  handleBackBtn: () => void;
  handleSubmitClick: (data: EmployeeTypes) => void;
};

const AddEmployee = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const { handleBackBtn, handleSubmitClick } = props;

  const handleFirstName = (event: any) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event: any) => {
    setLastname(event.target.value);
  };

  const handleEmail = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data: EmployeeTypes = {
      id: new Date().toJSON().toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    handleSubmitClick(data);
    handleBackBtn();
  };

  return (
    <div className="form-container">
      <div>
        <h3>Add Employee Form</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input type="text" value={firstName} onChange={handleFirstName} />
        </div>
        <div>
          <label>Last Name: </label>
          <input type="text" value={lastName} onChange={handleLastName} />
        </div>
        <div>
          <label>Add Email: </label>
          <input type="text" value={email} onChange={handleEmail} />
        </div>
        <div>
          <input type="button" value="Back" onClick={handleBackBtn} />
          <input type="submit" value="Add Employee" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
