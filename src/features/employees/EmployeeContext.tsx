import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import {
  EmployeeService,
  employeeService,
} from "../../services/employeeService";
import { employeeReducer } from "./reducer";
import type { Employee, EmployeeInput } from "./types";

export interface EmployeeContextValue {
  employees: Employee[];
  getById: (id: string) => Employee | undefined;
  addEmployee: (input: EmployeeInput) => void;
  updateEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => void;
}

export const EmployeeContext = createContext<EmployeeContextValue | null>(null);
interface EmployeeProviderProps {
  children: ReactNode;
  /** Injectable for testing; defaults to the localStorage-backed service. */
  service?: EmployeeService;
}

export function EmployeeProvider({
  children,
  service = employeeService,
}: EmployeeProviderProps) {
  const [state, dispatch] = useReducer(employeeReducer, { employees: [] });

  useEffect(() => {
    dispatch({ type: "set", payload: service.getAll() });
  }, [service]);

  const getById = useCallback(
    (id: string) => state.employees.find((employee) => employee.id === id),
    [state.employees],
  );

  const addEmployee = useCallback(
    (input: EmployeeInput) => {
      const created = service.create(input);
      dispatch({ type: "add", payload: created });
    },
    [service],
  );

  const updateEmployee = useCallback(
    (employee: Employee) => {
      const updated = service.update(employee);
      dispatch({ type: "update", payload: updated });
    },
    [service],
  );

  const deleteEmployee = useCallback(
    (id: string) => {
      service.remove(id);
      dispatch({ type: "remove", payload: { id } });
    },
    [service],
  );

  const value = useMemo<EmployeeContextValue>(
    () => ({
      employees: state.employees,
      getById,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [state.employees, getById, addEmployee, updateEmployee, deleteEmployee],
  );

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}
