import { Navigate, useNavigate, useParams } from "react-router-dom";

import EmployeeForm from "../components/EmployeeForm";
import { useEmployees } from "../features/employees/useEmployees";

const EditEmployeePage = () => {
  const { id } = useParams<{ id: string }>();
  const { getById, updateEmployee } = useEmployees();
  const navigate = useNavigate();

  const employee = id ? getById(id) : undefined;

  if (!employee) {
    return <Navigate to="/" replace />;
  }

  return (
    <EmployeeForm
      title="Edit employee"
      submitLabel="Update employee"
      defaultValues={{
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
      }}
      onSubmit={(values) => {
        updateEmployee({ id: employee.id, ...values });
        navigate("/");
      }}
      onCancel={() => navigate("/")}
    />
  );
};

export default EditEmployeePage;
