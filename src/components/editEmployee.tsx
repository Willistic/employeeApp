import { useState } from "react"

import { EmployeeTypes } from "./EmployeeType"
import "./EmployeeForm.css"

type Props = {
  data: EmployeeTypes;
  handleBackBtn: () => void;
  onSubmitHandle: (data: EmployeeTypes) => void;
    handleUpdate: (data: EmployeeTypes) => void;
};

const EditEmployee = (props: Props) => {
     const { data } = props;
     const [firstName, setFirstName] = useState(data.firstName);
     const [lastName, setLastname] = useState(data.lastName);
    const [email, setEmail] = useState(data.email);
      const { handleBackBtn, onSubmitHandle } = props;
    
     const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
       setFirstName(event.target.value);
     };

     const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
       setLastname(event.target.value);
     };

     const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
       setEmail(event.target.value);
     };

     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const updatedData: EmployeeTypes = {
         id: data.id,
         firstName: firstName,
         lastName: lastName,
         email: email,
       };
       onSubmitHandle(updatedData);
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
          <input type="submit" value="Update Employee" />
        </div>
      </form>
    </div>
  );
}

export default EditEmployee