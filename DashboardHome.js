function DashboardHome() {
  try {
    const stats = [
      { label: 'Total Matches', value: '24', icon: 'heart', color: 'text-red-500' },
      { label: 'Sessions Booked', value: '12', icon: 'calendar-check', color: 'text-blue-500' },
      { label: 'PodiumX Points', value: '850', icon: 'trophy', color: 'text-yellow-500' },
      { label: 'Training Hours', value: '48h', icon: 'clock', color: 'text-green-500' }
    ];

    return (
      <div className="p-4 lg:p-8 pt-20 lg:pt-8" data-name="dashboard-home">
        <h1 className="text-4xl font-bold mb-2">Welcome back, Alex!</h1>
        <p className="text-[var(--text-secondary)] mb-8">Ready to elevate your training?</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="card-dark">
              <div className={`icon-${stat.icon} text-3xl ${stat.color} mb-3`}></div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-[var(--text-secondary)] text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-dark">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full btn-primary text-left flex items-center justify-between">
                <span>Start Discovering</span>
                <div className="icon-arrow-right text-xl"></div>
              </button>
              <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between">
                <span>View Messages</span>
                <div className="icon-arrow-right text-xl"></div>
              </button>
              <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-between">
                <span>Book Session</span>
                <div className="icon-arrow-right text-xl"></div>
              </button>
            </div>
          </div>

          <div className="card-dark">
            <h2 className="text-2xl font-bold mb-4">Upcoming Sessions</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                <div className="icon-dumbbell text-2xl text-[var(--primary-color)]"></div>
                <div className="flex-1">
                  <div className="font-semibold">CrossFit WOD</div>
                  <div className="text-sm text-[var(--text-secondary)]">Tomorrow, 6:00 AM</div>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-800 rounded-lg">
                <div className="icon-person-standing text-2xl text-[var(--primary-color)]"></div>
                <div className="flex-1">
                  <div className="font-semibold">Running Group</div>
                  <div className="text-sm text-[var(--text-secondary)]">Friday, 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DashboardHome component error:', error);
    return null;
  }
}