import { useForm } from "react-hook-form";

const DepartmentSearch = ({ setSearchTerm, setIsActive }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { isActive, search } = data;
    setIsActive(isActive);
    setSearchTerm(search);
    console.log(search, "search");
  };
  return (
    <div>
      <form className="flex gap-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search Department"
          className="w-full p-2 my-2  border-1 rounded-md border-gray-400 border-[1px]"
          {...register("search")}
        />
        <label className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-5 h-5"
            {...register("isActive")}
          />
          <p className="whitespace-nowrap ">Active Department</p>
        </label>
        <label className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-5 h-5"
            {...register("autoFilter")}
          />
          <p className="whitespace-nowrap ">Auto Filter</p>
        </label>
        <button className="py-2 px-3 rounded-md my-2 bg-blue-400 text-white whitespace-nowrap">apply filter</button>
      </form>
    </div>
  );
};

export default DepartmentSearch;
