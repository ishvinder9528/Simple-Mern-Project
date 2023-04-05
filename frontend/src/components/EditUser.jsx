import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleUserData = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      const { name, email, age } = result;
      setName(name);
      setEmail(email);
      setAge(age);
      setError();
    }
  };

  useEffect(() => {
    getSingleUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/update/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      
      setError();
      navigate("/show");
    }
  };
  return (
    <div>
      <h2 className="text-center my-2">Modify User Data</h2>
      <div>
        {error && (
          <div className="alert alert-danger container my-2" role="alert">
            <strong>Error</strong> {error}
          </div>
        )}
        <form className="container" onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Update Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Name here..."
              autoComplete="false"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Update Email</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter your Email here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Update Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter your Age here..."
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Updtae Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
