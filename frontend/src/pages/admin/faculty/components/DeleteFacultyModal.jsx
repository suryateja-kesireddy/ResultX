import {
  deleteFaculty,
} from "../../../../services/faculty/facultyService";

export default function DeleteFacultyModal({

  open,

  onClose,

  onSuccess,

  faculty,

}){

  if(!open || !faculty) return null;

  const handleDelete=async()=>{

    await deleteFaculty(faculty.id);

    onSuccess();

    onClose();

  };

  return(

    <div className="faculty-modal-overlay">

      <div className="faculty-delete-modal">

        <h2>

          Delete Faculty

        </h2>

        <p>

          Are you sure you want to delete

          <strong>

            {" "}

            {faculty.user.name}

          </strong>

          ?

        </p>

        <div className="faculty-delete-actions">

          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

}