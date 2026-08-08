import { useEffect, useState } from "react";
import {
  updateFaculty,
} from "../../../../services/faculty/facultyService";
import {
  getAllDepartments,
} from "../../../../services/department/departmentService";

export default function EditFacultyModal({
  open,
  onClose,
  onSuccess,
  faculty,
}) {

  const [departments, setDepartments] = useState([]);

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    qualification:"",
    experience:"",
    departmentId:"",
    isActive:true,
  });

  useEffect(() => {

    if(open){

      loadDepartments();

    }

  },[open]);

  useEffect(()=>{

    if(faculty){

      setFormData({

        name:faculty.user.name,
        email:faculty.user.email,
        phone:faculty.phone || "",
        qualification:faculty.qualification || "",
        experience:faculty.experience || "",
        departmentId:faculty.department.id,
        isActive:faculty.user.isActive,

      });

    }

  },[faculty]);

  const loadDepartments = async()=>{

    const data = await getAllDepartments();

    setDepartments(data);

  };

  const handleChange=(e)=>{

    const {name,value}=e.target;

    setFormData({

      ...formData,

      [name]:
        name==="isActive"
          ? value==="true"
          : value,

    });

  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    await updateFaculty(faculty.id,{

      ...formData,

      experience:Number(formData.experience),

      departmentId:Number(formData.departmentId),

    });

    onSuccess();

    onClose();

  };

  if(!open) return null;

  return(

    <div className="faculty-modal-overlay">

      <div className="faculty-modal">

        <h2>Edit Faculty</h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          <input
            name="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
          />

          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
          >

            {departments.map((department)=>(

              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>

            ))}

          </select>

          <select
            name="isActive"
            value={formData.isActive}
            onChange={handleChange}
          >

            <option value={true}>Active</option>

            <option value={false}>Inactive</option>

          </select>

          <button type="submit">

            Update Faculty

          </button>

        </form>

      </div>

    </div>

  );

}