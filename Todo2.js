import React, { useEffect, useState } from "react";

function Todo2() {
  const LSfunction = () => {
    const data = localStorage.getItem("LocalData");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };

  const [formData, setFormData] = useState("");
  const [newArray, setNewArray] = useState(LSfunction());
  const [newIndex, setNewIndex] = useState("");
  const [editClick, setEditClick] = useState(false);

  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const time = date.getTime();

    if (editClick) {
      const updatedData = [...newArray];
      updatedData[newIndex] = {
        ...updatedData[newIndex],
        name: formData,
      };
      setNewArray(updatedData);
      setFormData("");
      setEditClick(false)

    } else {
      if(formData === "" ){
        alert("Field Are Mandetory")
      }else{
        const newData = {
          id: time,
          name: formData,
          completed: false,
        };
        setNewArray([...newArray, newData]);
        setFormData("");
      }
      }
     
  };

  const handleCheckbox = (id) => {
    const updatedArray = newArray.map((data) => {
      if (data.id === id) {
        return {
          ...data,
          completed: !data.completed,
        };
      }
      return data;
    });
    setNewArray(updatedArray);
  };

  useEffect(() => {
    localStorage.setItem("LocalData", JSON.stringify(newArray));
  }, [newArray]);

  const handleDelete = (index) => {
    const updatedTableData = newArray.filter((ele) => ele.id !== index);
    setNewArray(updatedTableData);
  };

  const handleEdit = (index) => {
    const updatedData = newArray[index];
    setFormData(updatedData.name);
    setNewIndex(index);
    setEditClick(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={formData}
            onChange={handleChange}
            placeholder="Add Todo"
          />
          <button type="submit" className="btn btn-primary">
           {editClick ? "Update" :"Add" }
          </button>
        </div>
      </form>
      <div className="table-responsive mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>S.N.</th>
              <th>Completed</th>
              <th>Task</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {newArray.map((data, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value={data.completed}
                    onChange={() => handleCheckbox(data.id)}
                  />
                </td>
                <td
                  style={
                    data.completed === true
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {data.name}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(index)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(data.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Todo2;

