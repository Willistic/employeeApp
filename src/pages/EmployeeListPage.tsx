import { Link, useNavigate } from "react-router-dom";

import EmployeeList from "../components/EmployeeList";
import { useEmployees } from "../features/employees/useEmployees";

const EmployeeListPage = () => {
  const { employees, deleteEmployee } = useEmployees();
  const navigate = useNavigate();

  return (
    <>
      <div className="page-toolbar">
        <Link to="/employees/new" className="button-link">
          Add employee
        </Link>
      </div>
      <EmployeeList
        employees={employees}
        onEdit={(employee) => navigate(`/employees/${employee.id}/edit`)}
        onDelete={deleteEmployee}
      />
    </>
  );
};

export default EmployeeListPage;
