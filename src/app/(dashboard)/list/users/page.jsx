import TableSearch from "@/components/TableSearch";
import Image from "next/image";

const usersPage = () => {
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-4">
      {/* top */}
      <div>
        <h1>Al Users</h1>
        <div>
            <TableSearch/>
            <div>
                <button>
                    <Image alt=""/>
                </button>
            </div>
        </div>
      </div>
      {/* list */}
      <div></div>
      {/* bottom */}
      <div></div>
    </div>
  );
};

export default usersPage;
