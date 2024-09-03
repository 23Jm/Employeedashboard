import React, { useState } from "react";
import { MdNoteAdd, MdCancel } from "react-icons/md";
import { LuFileEdit } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import moment from "moment";
import { Autosave } from "react-autosave";
import axios from "axios";
export const Member = (props) => {
  const token = localStorage.getItem("token");
  const handleChange = async (e1, e) => {
    const id = e;
    const completed = e1.target.value;
    const data = { employeeStatus: completed };
    console.log("e1", data);
    try {
      const changeRes = await axios.put(
        `http://192.168.29.240:8000/api/v1/tasks/memberTaskUpdate/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };
  {
    console.log(props);
  }
  return (
    <>
      {props.user[0].member?.map((team, teamIndex) => (
        <div className="mt-5" key={team._id}>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <h1 className="text-2xl md:text-3xl  font-bold text-black font-serif capitalize">
              {team.teamName}
            </h1>
          </div>
          <form>
            <div className="overflow-x-auto">
              <table className="border rounded-xl border-spacing-x-4 w-full">
                <thead>
                  <tr className="text-sm sm:text-base md:text-lg lg:text-lg 2xl:text-xl">
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <MdNoteAdd className="inline-block" />
                      Date
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <MdNoteAdd className="inline-block" />
                      Intern Name
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <MdNoteAdd className="inline-block" />
                      Client
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <LuFileEdit className="inline-block mr-1" />
                      Assignee
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <GrDocumentUpdate className="inline-block mr-1" />
                      Due Date
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <MdCancel className="inline-block mr-1" />
                      Task
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <MdCancel className="inline-block mr-1" />
                      Details
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <GrDocumentUpdate className="inline-block mr-1" />
                      Status
                    </th>
                    <th className="text-white bg-[#70BF20] text-center border border-slate-300">
                      <GrDocumentUpdate className="inline-block mr-1" />
                      Employee Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {team.members &&
                    team.members.map((allTask, index) => (
                      <tr
                        key={allTask.id}
                        className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl"
                      >
                        <td className="border text-center border-slate-300 text-slate-900">
                          {moment(allTask.date).format("DD/MM/YYYY")}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-900">
                          {allTask.internName}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-900">
                          {allTask.client}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-600">
                          {allTask.assignee}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-600">
                          {moment(allTask.dueDate).format("DD/MM/YYYY")}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-600">
                          {allTask.task}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-600">
                          {allTask.details}
                        </td>
                        <td className="border text-center border-slate-300 text-slate-600">
                          {allTask.status}
                        </td>
                        {props.user[0].userId === allTask.user ? (
                          <td className="border text-center border-slate-300 bg-green-200">
                            <select
                              name="status"
                              id="select"
                              onChange={(e) => handleChange(e, allTask._id)}
                              className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl"
                            >
                              <option value="select">
                                {allTask.employeeStatus}
                              </option>
                              <option value="completed">Completed</option>
                              <option value="inprogress">In Progress</option>
                            </select>
                          </td>
                        ) : (
                          <td className="border text-center border-slate-300">
                            {allTask.employeeStatus}
                          </td>
                        )}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      ))}
    </>
  );
};
