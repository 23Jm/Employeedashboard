import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import { CountChart } from "@/components/CountChart";
import EventCalendar from "@/components/EventCalendar";
import FinanceChart from "@/components/FinanceChart";
import UserCards from "@/components/UserCards";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* usercards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCards type="Total Employees" />
          <UserCards type="Total Applicants" />
          <UserCards type="Total Attendance" />
          <UserCards type="Total Projects" />
        </div>
        {/* middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* count chart */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          {/* attendance chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        {/* bottom charts */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
