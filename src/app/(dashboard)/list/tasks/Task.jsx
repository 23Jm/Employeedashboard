import React, { useEffect, useState } from "react";
import { MdNoteAdd, MdCancel } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import axios from "axios";
import Image from "next/image";
// import hlogo from "../../public/LinkedIn cover - 3.png";
import { IoPersonAddSharp } from "react-icons/io5";
import { Autosave } from "react-autosave";
import "./Task.css";
import { Search } from "./Search";
import { Member } from "./Member";
import moment from "moment";
import { FiAlignRight } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [isClient, setIsClient] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [memshow, setMemshow] = useState(true);
  const [showadd, setShowAdd] = useState(false);
  const [getdata, setGetdata] = useState();
  const [member, setMember] = useState();
  const [taskId, settaskId] = useState();
  const [user, setUser] = useState();
  const [newTeam, setNewTeam] = useState();
  const [newMember, setnewMember] = useState();
  const [deletebutton, setDeletebutton] = useState(false);
  const [delete1, setDelete1] = useState();
  const [addTeamVisible, setAddTeamVisible] = useState(true);
  const [memberid, setMemberid] = useState();
  const [delId, setDelid] = useState();
  const [formData, setFormData] = useState({
    internName: "",
    dueDate: "",
    task: "",
    status: "",
    description: "",
    date: " ",
    client: "",
    details: "",
  });
  const token = localStorage.getItem("token");
  // Debounced save function
  const saveData = async () => {
    try {
      await axios.put(
        `http://192.168.29.240:8000/api/v1/tasks/updateTasks/${taskId}`, // Update with your save endpoint
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  const handleChange = (e, index, teamIndex, id) => {
    settaskId(id);
    const { name, value } = e.target;
    setTeams((prevTeams) =>
      prevTeams.map((team, tIndex) => {
        if (tIndex === teamIndex) {
          return {
            ...team,
            Details: team.Details.map((detail, dIndex) => {
              if (dIndex === index) {
                const updatedDetail = { ...detail, [name]: value };
                setFormData(updatedDetail);
                return updatedDetail;
              }
              return detail;
            }),
          };
        }
        return team;
      })
    );
  };
  useEffect(() => {
    setIsClient(true);
    fetchData();
    deleteTeam();
  }, [newTeam, newMember, delete1]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.29.240:8000/api/v1/getTeam",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams(response.data.results);
      setGetdata(response.data.task);
      setMember(response.data.results2);
      setUser(response.data.userId);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  const handleSubmit = async () => {
    const id = localStorage.getItem("teamId2");
    try {
      await axios.post(
        `http://192.168.29.240:8000/api/v1/tasks/addTask/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Task added successfully");
      setVisible(false);
      setFormData({
        internName: "",
        assignee: "",
        dueDate: "",
        task: "",
        status: "",
        description: "",
        date: " ",
        client: "",
        details: " ",
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const handleteam = async () => {
    const teamname = document.getElementById("teamname").value;

    const data = new FormData();
    data.append("teamName", teamname);
    try {
      const res = await axios.post(
        `http://192.168.29.240:8000/api/v1/addTeam`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTeam(res.data);
      setShow(false);
      setAddTeamVisible(true);
      console.log("Team added successfully");
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };
  const handleMember = (e, index) => {
    setMemberid(index);
    setMemshow(!memshow);
    setShowAdd(true);
    localStorage.setItem("teamId", e);
  };
  const addTeam = () => {
    // setInputs([...inputs,""]);
    setShow(true);
    setAddTeamVisible(!addTeamVisible);
  };
  // const handleInputChange = (event) => {
  //   const newInputs = [...inputs];
  //   newInputs[index] = event.target.value;
  //   setInputs(newInputs);
  //   setTeamName(event.target.value);
  // };
  const handleAdd = (index) => {
    setVisible(!visible);
    setVisibleIndex(index);
  };
  const addMember = async () => {
    setMemshow(true);
    setShowAdd(false);
    const mailid = document.getElementById("mailId").value;
    const id = localStorage.getItem("teamId");
    const data = new FormData();
    data.append("members", mailid);
    try {
      const res = await axios.post(
        `http://192.168.29.240:8000/api/v1/addMembers/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setnewMember(res.data);
      console.log("Member added successfully");
    } catch (error) {
      console.log(error.response.data.message);
      toast.warning(error.response.data.message);
      console.error("Error adding member:", error);
    }
  };
  const handleTask = (e) => {
    localStorage.setItem("teamId2", e);
    setVisible(!visible);
    setVisibleIndex(e);
  };

  const handleDelete = (index) => {
    setDelid(index);

    setDeletebutton(!deletebutton);
  };

  const deleteTeam = async (id) => {
    try {
      const resDel = await axios.delete(
        `http://192.168.29.240:8000/api/v1/deleteTeam/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDelete1(resDel);
    } catch (error) {}
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-screen w-full text-black">
        {/* <div className="container-fluid mx-auto flex justify-end items-end border-b border-gray-400">
          <Image src={hlogo} className="h-48" alt="hello" />
        </div> */}
        <div className="container-lg px-4">
          <div>
            {addTeamVisible ? (
              <>
                <button
                  className="mr-5 bg-gray-500 hover:bg-gray-400 font-medium text-white md:text-sm text-[12px] md:p-2 p-1 rounded inline-block"
                  onClick={addTeam}
                >
                  Add Team +
                </button>
              </>
            ) : (
              <></>
            )}

            <div>
              {show && (
                <div className="input-div mt-5">
                  <input
                    className="p-3 outline-none border-b border-gray-300 mb-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                    placeholder="Create a Team"
                    id="teamname"
                    required
                  />

                  <button
                    className="bg-[#70bf29] p-2 rounded mr-5 mt-2 text-white hover:bg-[#70bf0]"
                    onClick={handleteam}
                  >
                    Add team to post
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {teams &&
              teams.map((team, teamIndex) => (
                <div className="mt-3" key={team._id}>
                  <div className="flex flex-col justify-between  sm:flex-row gap-3 mb-4">
                    <h1 className="text-2xl md:text-3xl  font-bold text-black font-serif capitalize">
                      {team.teamName}
                    </h1>

                    <div className="flex justify-items-end gap-3  ">
                      {memshow && (
                        <button
                          className="text-[#70bf] bg-gray-200 text-xl gap-2  font-bold rounded-lg p-2"
                          onClick={() => handleMember(team._id, teamIndex)}
                        >
                          <IoPersonAddSharp
                            size={20}
                            className="inline-flex mb-2 mr-1"
                          />
                          Add
                        </button>
                      )}
                      <button className="hover:bg-gray-200 rounded-full">
                        <FiMoreVertical
                          className=""
                          size={25}
                          onMouseDown={() => handleDelete(teamIndex)}
                        />
                      </button>
                    </div>
                  </div>
                  <div
                    className="{`transition-transform duration-300 transform ${
    isPanelVisible && teamIndex === delId ? 'translate-x-0' : 'translate-x-full'
  }`}
"
                  >
                    <div className="flex justify-end my-2  ">
                      {deletebutton && teamIndex === delId && (
                        <button
                          className="bg-gray-200 hover:bg-gray-400 p-2 "
                          onClick={() => deleteTeam(team._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  {showadd && teamIndex === memberid && (
                    <div className="input-div  my-4">
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          className="p-3 outline-none border-b border-gray-300 w-full sm:w-2/3 lg:w-1/2"
                          placeholder="Add a Member"
                          type="email"
                          id="mailId"
                        />

                        <button
                          className="bg-[#70bf29] p-2 rounded text-white"
                          onClick={addMember}
                        >
                          Add Member to post
                        </button>
                      </div>
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full border rounded-xl">
                        <thead>
                          <tr className="text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl">
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <MdNoteAdd className="inline-block" />
                              Date
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <MdNoteAdd className="inline-block" />
                              Intern Name
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <MdNoteAdd className="inline-block" />
                              Client
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <LuFileEdit className="inline-block mr-1" />
                              Assignee
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <GrDocumentUpdate className="inline-block mr-1" />
                              Due Date
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <MdCancel className="inline-block mr-1" />
                              Task
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <MdCancel className="inline-block mr-1" />
                              Details
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <GrDocumentUpdate className="inline-block mr-1" />
                              Status
                            </th>
                            <th className="text-white bg-[#70bf20] text-center border border-slate-300">
                              <GrDocumentUpdate className="inline-block mr-1" />
                              Employee Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.Details &&
                            team.Details.map((allTask, index) => (
                              <tr
                                key={allTask.id}
                                className="text-xs sm:text-sm md:text-base lg:text-lg"
                              >
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="date"
                                    name="date"
                                    value={
                                      allTask.date
                                        ? moment(allTask.date).format(
                                            "YYYY-MM-DD"
                                          )
                                        : null
                                    }
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="text"
                                    name="internName"
                                    placeholder="Enter an intern name"
                                    value={allTask.internName}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="text"
                                    name="client"
                                    placeholder="Enter a client"
                                    value={allTask.client}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2 text-slate-600">
                                  <Search
                                    teamId={[
                                      {
                                        teamId1: team._id,
                                        taskId: allTask._id,
                                        assignee: allTask.assignee,
                                      },
                                    ]}
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="date"
                                    name="dueDate"
                                    value={moment(allTask.dueDate).format(
                                      "YYYY-MM-DD"
                                    )}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="text"
                                    name="task"
                                    placeholder="Enter a task"
                                    value={allTask.task}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <input
                                    type="text"
                                    name="details"
                                    placeholder="Enter a detail"
                                    value={allTask.details}
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                    className="w-full"
                                  />
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  <select
                                    name="status"
                                    value={allTask.status}
                                    className="border border-gray-300 rounded p-2 w-38"
                                    onChange={(e) =>
                                      handleChange(
                                        e,
                                        index,
                                        teamIndex,
                                        allTask._id
                                      )
                                    }
                                  >
                                    <option value="Completed">Completed</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                  </select>
                                </td>
                                <td className="border text-center border-slate-300 p-2">
                                  {allTask.employeeStatus}
                                </td>
                                <Autosave data={formData} onSave={saveData} />
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              ))}
          </div>

          {member && <Member user={[{ member: member, userId: user }]} />}
        </div>
      </div>
    </>
  );
};
export default Task;
