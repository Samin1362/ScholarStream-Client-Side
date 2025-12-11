import React, { useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../../components/Loader";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["analytics-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Fetch all scholarships
  const {
    data: scholarships = [],
    isLoading: scholarshipsLoading,
    isError: scholarshipsError,
  } = useQuery({
    queryKey: ["analytics-scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("scholarships");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Fetch all applications
  const {
    data: applications = [],
    isLoading: applicationsLoading,
    isError: applicationsError,
  } = useQuery({
    queryKey: ["analytics-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("applications");
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const totalScholarships = scholarships.length;

    // Calculate total fees collected (only from paid applications)
    const totalFeesCollected = applications
      .filter((app) => app.paymentStatus === "paid")
      .reduce((sum, app) => {
        const fee = parseFloat(app.applicationFee) || 0;
        return sum + fee;
      }, 0);

    return {
      totalUsers,
      totalScholarships,
      totalFeesCollected: totalFeesCollected.toFixed(2),
    };
  }, [users, scholarships, applications]);

  // Prepare chart data for applications per university
  const universityChartData = useMemo(() => {
    const universityCounts = {};
    applications.forEach((app) => {
      const university = app.universityName || "Unknown";
      universityCounts[university] = (universityCounts[university] || 0) + 1;
    });

    return Object.entries(universityCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 universities
  }, [applications]);

  // Prepare chart data for applications per scholarship category
  const categoryChartData = useMemo(() => {
    const categoryCounts = {};
    applications.forEach((app) => {
      const category = app.scholarshipCategory || "Unknown";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, value]) => ({
      name,
      value,
    }));
  }, [applications]);

  // Colors for pie chart
  const COLORS = [
    "#2563eb", // primary
    "#14b8a6", // secondary
    "#8b5cf6", // accent
    "#f59e0b", // warning
    "#ef4444", // error
    "#10b981", // success
    "#6366f1", // indigo
    "#ec4899", // pink
    "#f97316", // orange
    "#06b6d4", // cyan
  ];

  const isLoading = usersLoading || scholarshipsLoading || applicationsLoading;
  const hasError = usersError || scholarshipsError || applicationsError;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen bg-base-200 py-12 px-4 flex justify-center items-center">
        <div className="text-center">
          <p className="text-error text-lg">Error loading analytics data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Analytics</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold text-neutral mb-2">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-primary">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold text-neutral mb-2">
              Total Scholarships
            </h2>
            <p className="text-3xl font-bold text-secondary">
              {stats.totalScholarships}
            </p>
          </div>

          <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold text-neutral mb-2">
              Total Fees Collected
            </h2>
            <p className="text-3xl font-bold text-accent">
              ${stats.totalFeesCollected}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart - Applications per University */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold text-neutral mb-4">
              Applications per University
            </h2>
            {universityChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={universityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral text-center py-8">
                No application data available
              </p>
            )}
          </div>

          {/* Pie Chart - Applications per Scholarship Category */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg border border-base-300">
            <h2 className="text-xl font-semibold text-neutral mb-4">
              Applications per Scholarship Category
            </h2>
            {categoryChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-neutral text-center py-8">
                No application data available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
