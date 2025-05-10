import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './LostnFound.css';
import { FaSearch } from "react-icons/fa";
import { motion } from 'framer-motion';

const LostnFound = () => {
  const [lnfcards, setlnfcards] = useState([
    {
      itemName: "Black Wallet",
      itemDescription: "Found near the cafeteria. Contains ID and a few cards.",
      status: "Found",
      image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/w_2560%2Cc_limit/iphonex-TA.jpg"
    },
    {
      itemName: "Silver Water Bottle",
      itemDescription: "Left in the computer lab, has a dent on the side.",
      status: "Found",
      image: "https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/w_2560%2Cc_limit/iphonex-TA.jpg"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [searchquery, setsearchquery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [newlnf, setNewlnf] = useState({
    itemName: "",
    itemDescription: "",
    status: "Lost",
    image: ""
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewlnf(prev => ({ ...prev, [name]: value }));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewlnf(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const filteredlostnfound = lnfcards.filter((lnfcard) => {
    const query = searchquery.toLowerCase();
    const matchesQuery =
      lnfcard.itemName?.toLowerCase().includes(query) ||
      lnfcard.itemDescription?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || statusFilter === "" || lnfcard.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setlnfcards([...lnfcards, newlnf]);
    setNewlnf({ itemName: "", itemDescription: "", status: "Lost", image: "" });
    setShowForm(false);
  };

  return (
    <div className='component-container'>
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

        <button className='report-item' onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : <><FaSearch /> Report an Item</>}
        </button>

        {showForm && (
          <form onSubmit={submitHandler}>
            <input
              className='inputt'
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={newlnf.itemName}
              onChange={changeHandler}
              required
            />
            <textarea
              className='inputt'
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
                  name="status"
                  value="Lost"
                  checked={newlnf.status === "Lost"}
                  onChange={changeHandler}
                />
                Lost
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Found"
                  checked={newlnf.status === "Found"}
                  onChange={changeHandler}
                />
                Found
              </label>
            </div>

            <input type="file" accept="image/*" onChange={imageHandler} />
            {newlnf.image && (
              <img
                src={newlnf.image}
                alt="Preview"
                className='upload-image'
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
            <button type="submit" className="submit-lnf">Submit</button>
          </form>
        )}

        <div className="search-container">
          <FaSearch size={22} className='search-icon' />
          <input
            type="text"
            className='search-box'
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
              <div className='lnf-img'>
                <img src={item.image} alt={item.itemName} />
              </div>
              <div className="lnf-details">
                <h3>{item.itemName}</h3>
                <p>{item.itemDescription}</p>
                <p className={`lnf-status ${item.status.toLowerCase()}`}>{item.status}</p>
                </div>
              <button className='contact'>Contact</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LostnFound;
