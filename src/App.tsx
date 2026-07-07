import { Navigate, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import AddEmployeePage from "./pages/AddEmployeePage";
import EditEmployeePage from "./pages/EditEmployeePage";
import EmployeeListPage from "./pages/EmployeeListPage";
import "./App.css";

function App() {
	return (
		<>
			<Header />
			<main className='section-content'>
				<Routes>
					<Route path='/' element={<EmployeeListPage />} />
					<Route
						path='/employees/new'
						element={<AddEmployeePage />}
					/>
					<Route
						path='/employees/:id/edit'
						element={<EditEmployeePage />}
					/>
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
