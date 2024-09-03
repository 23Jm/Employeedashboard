"use client"
import Task from "../tasks/Task"
export default function Tasks(){
    return (
        <main className="bg-gray-100 pb-4 h-full">
          <div className="p-4">
            <div className="p-4 bg-white h-full">
              <h2 className="mb-4">Team Day Sheet - July 2024</h2>
             <Task/>
            </div>
          </div>
        </main>
    );
}