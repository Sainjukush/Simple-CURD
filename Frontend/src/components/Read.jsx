import React, { useEffect, useState } from "react";
import Counter from "./Counter";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8000/${id}`, {
      method: "DELETE",
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  async function getData() {
    const response = await fetch("http://localhost:8000");
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleTitleClick = (id) => {
    setSelectedUserId(id);
  };

  return (
    <div className="container my-2">
      {selectedUserId ? (
        <Counter userId={selectedUserId} />
      ) : (
        <div className="row">
          {data?.map((ele, index) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title" onClick={() => handleTitleClick(ele._id)}>
                    {index + 1}. {ele.name}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <a href={ele._id} className="card-link">Edit</a>
                  <a className="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
