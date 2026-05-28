function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Student Planner</h1>
                <button className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100">
                    Logout
                </button>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-6">

                {/* Welcome Message */}
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Welcome back, Vedant!
                </h2>

                {/* Add Task Button */}
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6">
                    + Add New Task
                </button>

                {/* Task List */}
                <div className="grid gap-4">

                    {/* Task Card 1 */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Complete React Assignment</h3>
                            <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                                Pending
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">Subject: Web Development</p>
                        <p className="text-gray-500 text-sm">Deadline: 30 May 2026</p>
                    </div>

                    {/* Task Card 2 */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Study for Maths Exam</h3>
                            <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                                Completed
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">Subject: Mathematics</p>
                        <p className="text-gray-500 text-sm">Deadline: 28 May 2026</p>
                    </div>

                    {/* Task Card 3 */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-gray-800">Submit Physics Lab Report</h3>
                            <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                                Urgent
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">Subject: Physics</p>
                        <p className="text-gray-500 text-sm">Deadline: 29 May 2026</p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Dashboard;