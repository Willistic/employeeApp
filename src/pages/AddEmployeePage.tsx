import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import { useEmployees } from "../features/employees/useEmployees";

const AddEmployeePage = () => {
  const { addEmployee } = useEmployees();
  const navigate = useNavigate();

  return (
    <EmployeeForm
      title="Add employee"
      submitLabel="Add employee"
      onSubmit={(values) => {
        addEmployee(values);
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
};

export default AddEmployeePage;
