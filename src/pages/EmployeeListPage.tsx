import { useState } from "react";
import { useNavigate } from "react-router-dom";

import EmployeeList from "../components/EmployeeList";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { useEmployees } from "../features/employees/useEmployees";
import type { Employee } from "../features/employees/types";
import { useToast } from "../features/toast/useToast";

const EmployeeListPage = () => {
  const { employees, deleteEmployee } = useEmployees();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [pendingDelete, setPendingDelete] = useState<Employee | null>(null);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    const name = `${pendingDelete.firstName} ${pendingDelete.lastName}`;
    deleteEmployee(pendingDelete.id);
    setPendingDelete(null);
    showToast(`${name} was deleted.`, "success");
  };

  return (
    <>
      <div className="page-toolbar">
        <Button onClick={() => navigate("/employees/new")}>Add employee</Button>
      </div>

      <EmployeeList
        employees={employees}
        onEdit={(employee) => navigate(`/employees/${employee.id}/edit`)}
        onDelete={setPendingDelete}
      />

      {pendingDelete && (
        <ConfirmDialog
          title="Delete employee"
          message={`Are you sure you want to delete ${pendingDelete.firstName} ${pendingDelete.lastName}? This action cannot be undone.`}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          onConfirm={confirmDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </>
  );
};

export default EmployeeListPage;
