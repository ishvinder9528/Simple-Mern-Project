import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const ShowAll = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const getData = async () => {
    const response = await fetch("http://localhost:5000");
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setData(result);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("Deleted Successfully");
      setTimeout(async () => {
        setError();
      }, 1500);
      getData();
    }
  };
const navigate= useNavigate()
  const handleEdit =  (id) => {
    navigate(`/update/${id}`);
  }

  return (
    <>
      <div className="">
        {error && (
          <div className="alert alert-danger container my-2" role="alert">
            <strong>Error</strong> {error}
          </div>
        )}
        <h1 className=" text-xl-center my-5">All Data</h1>
        <div className="row">
          {data?.map((elem) => {
            const { _id, name, email, age } = elem;
            return (
              <div
                key={_id}
                className="card my-3 mx-2 col-3"
                style={{ width: "18rem" }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>{name}</strong>
                  </li>
                  <li className="list-group-item">{email}</li>
                  <li className="list-group-item">{age}</li>
                  <div className="card-body">
                    <button type="button" className="btn btn-link " onClick={()=>handleEdit(_id)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </button>
                  </div>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShowAll;
