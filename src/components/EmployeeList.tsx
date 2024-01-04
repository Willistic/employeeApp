import { useState } from "react";
import EmployeeModal from "./EmployeeModal";
import { EmployeeTypes } from "./EmployeeType";

type Props = {
  list: EmployeeTypes[];
  handleDelete: (data: EmployeeTypes) => void;
  onEdit: (data: EmployeeTypes) => void;
};

const EmployeeList = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null as EmployeeTypes | null);
  const { list, handleDelete, onEdit } = props;

  const onCloseModal = () => {
    setShowModal(false);
  };

  const viewEmployee = (data: EmployeeTypes) => {
    setModalData(data);
    setShowModal(true);
  };

  return (
    <div>
      <article>
        <h1>Employee List</h1>
      </article>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee) => {
            return (
              <tr key={employee.id}>
                <td>{`${employee.firstName} ${employee.lastName}`}</td>
                <td>{employee.email}</td>
                <td>
                  <div>
                    <input
                      type="button"
                      value="view"
                      onClick={() => viewEmployee(employee)}
                    />
                    <input
                      type="button"
                      value="edit"
                      onClick={() => onEdit(employee)}
                    />
                    <input
                      type="button"
                      value="delete"
                      onClick={() => handleDelete(employee)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && modalData !== null && (
        <EmployeeModal
          onClose={onCloseModal}
          data={modalData}
          onEdit={viewEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
