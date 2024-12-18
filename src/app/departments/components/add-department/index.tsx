import { TextField } from "@/componets/form-fields/text";
import {
  saveDepartment,
  updateDepartment,
} from "@/redux/reducer/departments-slice";
import { AppDispatch } from "@/redux/store";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddDepartment = ({ defaultValues, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data) => {
    console.log("data", data, defaultValues);
    if (defaultValues) {
      delete data._id;
      delete data.deleted;
      delete data.createdAt;
      delete data.updatedAt;
      dispatch(updateDepartment({ _id: defaultValues._id, data }));
    } else {
      dispatch(saveDepartment(data))
        .unwrap()
        .then(() => {
          onClose();
        });
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-wrap justify-center gap-4"
      >
        <div className="grid grid-cols-2 gap-8 max-w-[700px]">
          <div className="w-full">
            <TextField
              type="text"
              placeholder="Department Name"
              label="Department Name"
              name="department_name"
              error={errors?.department_name}
              {...register("department_name", {
                required: "Department Name is required",
              })}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <select
              {...register("category_name", {
                required: "Category Name is required",
              })}
              className="w-full p-2 my-2  border-1 rounded-md border-gray-300 border"
            >
              <option value="">Select Category</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="sales">Sales</option>
              <option value="product">Product</option>
              <option value="marketing">Marketing</option>
            </select>
            {errors.category_name && (
              <p className="mt-2 text-sm text-red-600">
                {errors.category_name.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <TextField
              type="text"
              placeholder="Location"
              label="Location"
              name="location"
              error={errors?.location}
              {...register("location", {
                required: "Location is required",
              })}
            />
          </div>
          <div className="w-full">
            <TextField
              type="number"
              placeholder="Salary"
              label="Salary"
              name="salary"
              error={errors?.salary}
              {...register("salary", {
                required: "Salary is required",
              })}
            />
          </div>
        </div>
        <div className="flex gap-5 px-4 py-2 bg-gray-100">
          <button className="py-2 px-3 rounded-md my-2 bg-blue-400 text-white">
            Submit
          </button>
          <button
            className="py-2 px-3 rounded-md my-2 bg-red-400 text-white"
            type="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartment;
