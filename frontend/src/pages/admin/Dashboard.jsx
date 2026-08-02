import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
} from "lucide-react";
const stats = [
  {
    title: "Students",
    value: "0",
    icon: GraduationCap,
  },
  {
    title: "HODs",
    value: "0",
    icon: Users,
  },
  {
    title: "Subjects",
    value: "0",
    icon: BookOpen,
  },
  {
    title: "Departments",
    value: "0",
    icon: Building2,
  },
];
const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-slate-500">
          Welcome to the ResultX Admin Dashboard
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm border"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {item.value}
                  </h2>

                </div>

                <div className="rounded-xl bg-blue-100 p-4">

                  <Icon
                    size={30}
                    className="text-blue-600"
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Dashboard;