import { useState, useEffect } from 'react';
import './App.css'

import { EmployeeTypes, PageEnum } from "./components/EmployeeType";
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/editEmployee';

function App() {
  const [employeeList, setEmployeeList] = useState([] as EmployeeTypes[]);
  const [shownPage, setShownPage] = useState(PageEnum.list)
  const [editedData, setEditedData] = useState({}  as EmployeeTypes)

  useEffect(() => {
    const listStringfied = window.localStorage.getItem("EmployeeList");

    if (listStringfied) {
      saveEmployeeList(JSON.parse(listStringfied))
    }
  }, [])

  const addEmployee = (data: EmployeeTypes) => { 
    saveEmployeeList([...employeeList, data])
  }

  const deleteEmployee = (data: EmployeeTypes) => {
    // to index from array example employeeList
    // splice that
    // update new record
    const indexToDelete = employeeList.indexOf(data)
    const tempList = [ ...employeeList ]
    tempList.splice(indexToDelete, 1)
    saveEmployeeList(tempList)
  }
  
  const handleEmployee = () => { 
    setShownPage(PageEnum.add)
  }

  const showListPage = () => {
    setShownPage(PageEnum.list)
  }

  const editEmployeeData = (data: EmployeeTypes) => {
    setShownPage(PageEnum.edit)
    setEditedData(data)
  }

  const updateData = (data: EmployeeTypes) => {
    const filteredData = employeeList.filter(x => x.id === data.id)[0]
    const indexOfData = employeeList.indexOf(filteredData);
    const tempData = [...employeeList ]
    tempData[indexOfData] = data
    saveEmployeeList(tempData)
  }

  const saveEmployeeList = (list: EmployeeTypes[]) => {
    setEmployeeList(list)
    window.localStorage.setItem("EmployeeList", JSON.stringify(list))
  }
  
  return (
    <>
      <article className="article-header">
        <header>
          <h1>Employee App</h1>
        </header>
      </article>

      <section className="section-content">
        {shownPage === PageEnum.list && (
          <>
            <input
              type="button"
              value="Add Employee"
              onClick={handleEmployee}
              className="add-employee-btn"
            />
            <EmployeeList
              list={employeeList}
              handleDelete={deleteEmployee}
              onEdit={editEmployeeData}
            />
          </>
        )}
        {shownPage === PageEnum.add && (
          <AddEmployee
            handleBackBtn={showListPage}
            handleSubmitClick={addEmployee}
          />
        )}

        {shownPage === PageEnum.edit && (
          <EditEmployee
            data={editedData}
            handleBackBtn={showListPage}
            handleUpdate={updateData}
            onSubmitHandle={updateData}
          />
        )}
      </section>
    </>
  );
}

export default App
