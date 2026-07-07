import { useNavigate } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import { useEmployees } from "../features/employees/useEmployees";
import { useToast } from "../features/toast/useToast";

const AddEmployeePage = () => {
  const { addEmployee } = useEmployees();
  const { showToast } = useToast();
  const navigate = useNavigate();

  return (
    <EmployeeForm
      title="Add employee"
      submitLabel="Add employee"
      onSubmit={(values) => {
        addEmployee(values);
        showToast(
          `${values.firstName} ${values.lastName} was added.`,
          "success",
        );
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
};

export default AddEmployeePage;
