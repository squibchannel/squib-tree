import DashboardHome from "@/components/DashboardHome";
import ProfileCard from "@/components/Cards/ProfileCard";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-8 ">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8  ">
        {/* <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"></div> */}
        <div className="flex flex-col gap-8"></div>
        {/* <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3"> */}
        <div className="flex flex-col gap-8">
          <ProfileCard />
          <DashboardHome />
        </div>
      </main>
    </div>
  );
}
