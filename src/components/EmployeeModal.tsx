import "./EmployeeModal.css";
import { EmployeeTypes } from "./EmployeeType";

type Props = {
  onClose: () => void;
  data: EmployeeTypes;
  onEdit: (data: EmployeeTypes) => void;
};
const EmployeeModal = (props: Props) => {
    const { onClose, data } = props;
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div>
          <h3>Employee Data</h3>
          <div>
            <div>
              <label>First Name: {data.firstName}</label>
            </div>
            <div>
              <label>Last Name: {data.lastName}</label>
            </div>
            <div>
              <label>Email Address: {data.email}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
