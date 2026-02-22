'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatsCard from '@/components/admin/ui/StatsCard';
import { Box, Users, ShoppingBag, MessageSquare, Loader2, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { fetchAdminStats, fetchAdminChartData, fetchRecentActivity } from '@/lib/adminApi';

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingChart, setLoadingChart] = useState(true);
    const [timeRange, setTimeRange] = useState('weekly');

    // Load Stats and Activities
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    fetchAdminStats(),
                    fetchRecentActivity()
                ]);
                setStats(statsData);
                setActivities(activityData);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setLoadingStats(false);
            }
        };
        loadInitialData();
    }, []);

    // Load Chart data whenever timeRange changes
    useEffect(() => {
        const loadChart = async () => {
            setLoadingChart(true);
            try {
                const data = await fetchAdminChartData(timeRange);
                setChartData(data);
            } catch (error) {
                console.error("Failed to load chart data", error);
                setChartData([]);
            } finally {
                setLoadingChart(false);
            }
        };
        loadChart();
    }, [timeRange]);

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                <p className="text-gray-500 text-sm">Welcome back, Admin. Here is what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard
                    title="Total Applications"
                    value={stats?.applications?.total}
                    change={stats?.applications?.change}
                    trend={stats?.applications?.trend}
                    icon={Users}
                    color="text-blue-600 bg-blue-100 dark:bg-blue-900"
                    link="/admin/applications"
                    loading={loadingStats}
                />
                <StatsCard
                    title="Active Products"
                    value={stats?.products?.total}
                    change={stats?.products?.change}
                    trend={stats?.products?.trend}
                    icon={Box}
                    color="text-purple-600 bg-purple-100 dark:bg-purple-900"
                    link="/admin/products"
                    loading={loadingStats}
                />
                <StatsCard
                    title="Training Enrollments"
                    value={stats?.training?.total}
                    change={stats?.training?.change}
                    trend={stats?.training?.trend}
                    icon={ShoppingBag}
                    color="text-green-600 bg-green-100 dark:bg-green-900"
                    link="/admin/training"
                    loading={loadingStats}
                />
                <StatsCard
                    title="New Inquiries"
                    value={stats?.inquiries?.total}
                    change={stats?.inquiries?.change}
                    trend={stats?.inquiries?.trend}
                    icon={MessageSquare}
                    color="text-orange-600 bg-orange-100 dark:bg-orange-900"
                    link="/admin/inquiries"
                    loading={loadingStats}
                />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm min-h-[450px] flex flex-col">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Traffic vs Applications</h3>
                            <p className="text-sm text-gray-500">Compare website visits with conversion.</p>
                        </div>

                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                            {['daily', 'weekly', 'monthly'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all ${timeRange === range
                                        ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
                                        }`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-grow relative">
                        {loadingChart ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm z-10 rounded-lg">
                                <Loader2 className="animate-spin text-primary-500" size={32} />
                            </div>
                        ) : chartData.length === 0 ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                <Calendar size={48} className="mb-2 opacity-20" />
                                <p>No data available for this period.</p>
                            </div>
                        ) : (
                            <div className="h-[320px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} vertical={false} />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            dy={10}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            orientation="left"
                                            stroke="#6b7280"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            stroke="#8b5cf6"
                                            fontSize={12}
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(value) => `${value}`}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                            itemStyle={{ color: '#fff', fontSize: '12px' }}
                                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="visits"
                                            name="Website Visits"
                                            fill="#3b82f6"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={50}
                                        />
                                        <Bar
                                            yAxisId="right"
                                            dataKey="applications"
                                            name="Total Applications"
                                            fill="#8b5cf6"
                                            radius={[4, 4, 0, 0]}
                                            maxBarSize={50}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-[450px] lg:h-auto">
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Activity</h3>
                        <Link href="/admin/applications" className="text-xs text-primary-600 hover:text-primary-700 font-medium">View All</Link>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide pr-2">
                        {loadingStats ? (
                            Array(5).fill(0).map((_, i) => (
                                <div key={i} className="flex gap-4 animate-pulse">
                                    <div className="w-2 h-2 mt-2 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                                    </div>
                                </div>
                            ))
                        ) : activities.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 text-sm">
                                <p>No recent activity found.</p>
                            </div>
                        ) : (
                            activities.map((item, index) => (
                                <Link href={item.link || '/admin/applications'} key={item.id} className="flex gap-4 group cursor-pointer">
                                    <div className="relative">
                                        <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ring-4 transition-colors
                                            ${item.type === 'Application' ? 'bg-purple-500 ring-purple-100 dark:ring-purple-900/30' :
                                                item.type === 'Enrollment' ? 'bg-green-500 ring-green-100 dark:ring-green-900/30' :
                                                    'bg-orange-500 ring-orange-100 dark:ring-orange-900/30'}
                                        `} />
                                        {index !== activities.length - 1 && <div className="absolute top-4 left-0.5 w-0.5 h-full bg-gray-100 dark:bg-gray-800 -ml-px" />}
                                    </div>
                                    <div className="pb-2 flex-grow">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm text-gray-900 dark:text-white font-medium group-hover:text-primary-600 transition-colors">
                                                {item.type === 'Application' ? 'New Application' :
                                                    item.type === 'Enrollment' ? 'New Enrollment' : 'New Inquiry'}
                                            </p>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{item.time}</span>
                                        </div>
                                        <div className="mt-1">
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                                {item.user}
                                            </p>
                                            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
                                                {item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
