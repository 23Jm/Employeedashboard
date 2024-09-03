import axios from "axios";
import React, { useEffect, useState } from "react";
import { Autosave } from "react-autosave";
import { debounce } from "lodash";
export const Search = (props) => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState([]);
  const [filtereddata, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showData, setShowData] = useState(false);
  const [formData, setFormData] = useState({
    assignee: props.teamId[0].assignee,
  });
  useEffect(() => {
    console.log("values", props.teamId[0].assignee);
    setInputValue(props.teamId[0].assignee);
    setIsClient(true);
    fetchData();
  }, []);
  const fetchData = async (id) => {
    try {
      const arr = [];
      const result = await axios.get(
        `http://192.168.29.240:8000/api/v1/getAssignee/${id}`
      );
      const assignees = result.data.names[0].assignees.map(
        (user) => user.userName
      );
      setFilteredData(
        result.data.names[0].assignees.map((user) => user.userName)
      );
      console.log("assignees", props.teamId[0].assignee);
      console.log("ft", filtereddata);
    } catch (error) {
      console.error(error);
    }
  };
  const token = localStorage.getItem("token");
  const saveData = async () => {
    const taskId = props.teamId[0].taskId;
    try {
      await axios.put(
        `http://192.168.29.240:8000/api/v1/tasks/updateTasks/${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hello Manoj");
      console.log(formData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }; // Debounce time set to 300ms
  const handleFilter = (value) => {
    const res = filtereddata?.filter((f) =>
      f.toLowerCase().includes(value.toLowerCase())
    );
    setData(res);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.trim() === "") {
      setShowData(false);
    } else {
      setShowData(true);
      handleFilter(value);
    }
  };
  const handleClick = (value) => {
    setInputValue(value);
    setFormData({ assignee: value });
    setShowData(false);
  };
  return (
    <div className="search-top w-16">
      <div className="search">
        <input
          type="text"
          placeholder="Enter an assignee"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => fetchData(props.teamId[0].teamId1)}
          className="w-full"
        />
        <Autosave data={formData} onSave={saveData} />
      </div>
      {showData && (
        <div className="search-result">
          <ul>
            {data?.map((item, index) => (
              <li key={index} onClick={() => handleClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
