import { useState } from "react";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input";
import PasswordInput from "../../../components/ui/PasswordInput";
import Button from "../../../components/ui/Button";
import { createAccount } from "../../../services/admin/accountService";
const AccountForm = () => {
  const [formData, setFormData] = useState({
    role: "STUDENT",

    name: "",
    email: "",
    password: "",
    phone: "",

    hallTicket: "",
    employeeId: "",

    departmentId: "",
    semesterId: "",

    section: "A",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;

  const toastId = toast.loading("Creating account...");

  try {
    setLoading(true);

    const response = await createAccount(formData);

    console.log(response);

    toast.success(
      "Account created successfully 🎉",
      {
        id: toastId,
      }
    );

    setFormData({
      role: "STUDENT",
      name: "",
      email: "",
      password: "",
      phone: "",
      hallTicket: "",
      employeeId: "",
      departmentId: "",
      semesterId: "",
      section: "A",
    });

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to create account",
      {
        id: toastId,
      }
    );

  } finally {
    setLoading(false);
  }
};

  return (
  <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-md">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800">
        Create Account
      </h1>

      <p className="mt-2 text-slate-500">
        Create Student, HOD and Exam Cell accounts.
      </p>
    </div>

    {/* Form */}
    <form
  className="space-y-6"
  onSubmit={handleSubmit}
>

      {/* Role */}
      <div>
        <label className="mb-2 block font-medium">
          Role
        </label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="STUDENT">Student</option>
          <option value="HOD">HOD</option>
          <option value="EXAM_CELL">Exam Cell</option>
        </select>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        </div>
        {/* Student Fields */}

{formData.role === "STUDENT" && (

<div className="grid grid-cols-1 gap-6 md:grid-cols-2">

    <Input
        label="Hall Ticket"
        name="hallTicket"
        value={formData.hallTicket}
        onChange={handleChange}
        placeholder="Enter Hall Ticket"
    />

    <Input
        label="Department ID"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
        placeholder="Department ID"
    />

    <Input
        label="Semester ID"
        name="semesterId"
        value={formData.semesterId}
        onChange={handleChange}
        placeholder="Semester ID"
    />

    <Input
        label="Section"
        name="section"
        value={formData.section}
        onChange={handleChange}
        placeholder="Section"
    />

</div>

)}
{formData.role === "HOD" && (

<div className="grid grid-cols-1 gap-6 md:grid-cols-2">

    <Input
        label="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        placeholder="Employee ID"
    />

    <Input
        label="Department ID"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
        placeholder="Department ID"
    />

</div>

)}
{formData.role === "EXAM_CELL" && (

<div>

    <Input
        label="Employee ID"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        placeholder="Employee ID"
    />

</div>

)}
<div className="flex justify-end">
  <Button
  type="submit"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
</Button>
</div>

    </form>

  </div>
);
};

export default AccountForm;