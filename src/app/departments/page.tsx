"use client";
import { PlusIcon } from "@heroicons/react/16/solid";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useState } from "react";
import {
  deleteDepartment,
  fetchDepartments,
} from "@/redux/reducer/departments-slice";
import { AppDispatch, RootState } from "@/redux/store";
import AddDepartment from "./components/add-department";
import Pagination from "../components/pagination";
import RestApi from "@/utils/api";

const Departments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { departments } = useSelector<RootState>((state) => state.departments);
  const [isAddDepartment, setIsAddDepartment] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(() => {
    new RestApi().get(`/user/query`).then((response) => {
      console.log("response", response);
    });

    new RestApi().get(`/user/query2`).then((response) => {
      console.log("response2", response);
    });
  }, []);

  useEffect(() => {
    console.log("fetching departments", currentPage, pageSize);
    dispatch(
      fetchDepartments({
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, dispatch, pageSize]);

  const handleEdit = (departmentsData) => {
    console.log("edit", departmentsData);
    setDefaultValues(departmentsData);
    setIsAddDepartment(true);
  };

  const handleDelete = (id) => {
    console.log("delete", id);
    dispatch(deleteDepartment({ _id: id }));
  };

  return (
    <Layout>
      <div className="rounded-xl overflow-hidden bg-white">
        <div className="flex justify-between items-center bg-sky-200 p-3 border-b-[4px] border-blue-500">
          <div>
            <h1 className="font-bold">Departments</h1>
          </div>
          <div
            className="bg-blue-500 rounded-md p-2 text-white"
            onClick={() => setIsAddDepartment((prev) => !prev)}
          >
            {isAddDepartment ? (
              "Back to list"
            ) : (
              <PlusIcon className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
        <div className="p-4">
          {!isAddDepartment && (
            <div>
              <table className="w-full">
                <thead>
                  <tr className="text-base font-bold text-white bg-slate-800">
                    <th>Name</th>
                    <th>Category name</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Employees</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {departments?.docs?.map((departmentsData) => {
                    return (
                      <tr key={departmentsData?._id}>
                        <td>{departmentsData?.department_name}</td>
                        <td>{departmentsData?.category_name}</td>
                        <td>{departmentsData?.location}</td>
                        <td>{departmentsData?.salary}</td>
                        <td>{departmentsData?.employee_ids?.length}</td>

                        <td>
                          <button
                            onClick={() => {
                              handleEdit(departmentsData);
                            }}
                          >
                            edit
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              handleDelete(departmentsData?._id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                totalPages={departments?.totalPages}
                rowsPerPage={departments?.limit ?? 5}
                page={departments?.page ?? 1}
                onPageChange={(page) => setCurrentPage(page)}
                onRowsPerPageChange={(rowsPerPage) => setPageSize(rowsPerPage)}
              />
            </div>
          )}

          {isAddDepartment && (
            <AddDepartment
              defaultValues={defaultValues}
              onClose={() => {
                setDefaultValues(null);
                setIsAddDepartment(false);
              }}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Departments;
