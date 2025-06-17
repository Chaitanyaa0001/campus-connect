import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./LostnFound.css";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { uselostnfound } from "../../hooks/lostnfound/uselnfhooks";
import { useAddlostnfound } from "../../hooks/lostnfound/useaddlnfhooks";

const LostnFound = () => {
  const { lostAndFound, getallLostnfound } = uselostnfound();
  const { createlostnfound } = useAddlostnfound();

  const [showForm, setShowForm] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [newlnf, setNewlnf] = useState({
    itemName: "",
    itemDescription: "",
    itemStatus: "Lost",
    choosefile: "",
  });

  const [imagefile, setImagefile] = useState(null);



  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewlnf((prev) => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagefile(file); // real file for upload
      setNewlnf((prev) => ({ ...prev, choosefile: imageUrl })); // preview
    }
  };

 const submitHandler = async (e) => {
  e.preventDefault();

  try {
    await createlostnfound(newlnf, imagefile);
    setNewlnf({
      itemName: "",
      itemDescription: "",
      choosefile: "",
    });
    setImagefile(null);
    getallLostnfound();
    setShowForm(false);
  } catch (err) {
    console.error("Submission failed", err);
  }
};


  if (!lostAndFound) {
      return (
        <div className="loader-container">
          <motion.div
            className="loader"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p>Loading Car Rentals...</p>
       </div>  
      );
  }

  const filteredlostnfound = lostAndFound?.filter((item) => {
    const query = searchquery.toLowerCase();
    const matchesQuery =
      item.itemName?.toLowerCase().includes(query) ||
      item.itemDescription?.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "All" ||
      statusFilter === "" ||
      item.itemStatus === statusFilter;
    return matchesQuery && matchesStatus;
  }) || [];


  return (
    <div className="component-container">
      <Sidebar />
      <motion.div
        id="lostnfound"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="lnf-heading">
          <h2>Lost & Found</h2>
          <p>Find all reported lost/found items or report an item</p>
        </div>

        <button className="report-item" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : <><FaSearch /> Report an Item</>}
        </button>

        {showForm && (
          <form onSubmit={submitHandler}>
            <input
              className="inputt"
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={newlnf.itemName}
              onChange={changeHandler}
              required
            />
            <textarea
              className="inputt"
              name="itemDescription"
              placeholder="Item Description"
              value={newlnf.itemDescription}
              onChange={changeHandler}
              required
            ></textarea>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="itemStatus"
                  value="Lost"
                  checked={newlnf.itemStatus === "Lost"}
                  onChange={changeHandler}
                />
                Lost
              </label>
              <label>
                <input
                  type="radio"
                  name="itemStatus"
                  value="Found"
                  checked={newlnf.itemStatus === "Found"}
                  onChange={changeHandler}
                />
                Found
              </label>
            </div>

            <input type="file"  name="choosefile" accept="image/*" onChange={imageHandler} />
            {newlnf.choosefile && (
              <img
                src={newlnf.choosefile}
                alt="Preview"
                className="upload-image"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
            <button type="submit" className="submit-lnf">Submit</button>
          </form>
        )}

        <div className="search-container">
          <FaSearch size={22} className="search-icon" />
          <input
            type="text"
            className="search-box"
            placeholder="Search for lost items..."
            value={searchquery}
            onChange={(e) => setsearchquery(e.target.value)}
          />
        </div>

        <div className="tab-buttons">
          <button
            className={statusFilter === "All" ? "tab active" : "tab"}
            onClick={() => setStatusFilter("All")}
          >
            All Items
          </button>
          <button
            className={statusFilter === "Lost" ? "tab active" : "tab"}
            onClick={() => setStatusFilter("Lost")}
          >
            Lost Items
          </button>
          <button
            className={statusFilter === "Found" ? "tab active" : "tab"}
            onClick={() => setStatusFilter("Found")}
          >
            Found Items
          </button>
        </div>

        <div className="lnf-cards">
          {filteredlostnfound.map((item, index) => (
            <div className="lnf-card" key={index}>
              <div className="lnf-img">
                <img src={item.choosefile} alt={item.itemName} />
              </div>
              <div className="lnf-details">
                <h3>{item.itemName}</h3>
                <p>{item.itemDescription}</p>
                <p className={`lnf-status ${item.itemStatus.toLowerCase()}`}>
                  {item.itemStatus}
                </p>
              </div>
              <button className="contact">Contact</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LostnFound;
