import React, { useState } from 'react';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  Title, Tooltip, Legend, ArcElement, PointElement, LineElement 
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const Dashboard = () => {
  // --- Core States ---
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({ saved: 27.2, points: 1350, oxygen: 145, trees: 4 });
  const [chartDataState, setChartDataState] = useState([22, 19, 3, 5, 2, 13, 10]);

  // --- Functions ---
  const handleLogActivity = (e) => {
    e.preventDefault();
    const impact = parseFloat(e.target.impact.value) || 1.5;
    
    // Update dashboard logic
    setStats(prev => ({
      ...prev,
      saved: (parseFloat(prev.saved) + impact).toFixed(1),
      points: prev.points + 50,
      oxygen: prev.oxygen + 2
    }));
    
    // Update Graph (Adding impact to Sunday/Today)
    const newGraph = [...chartDataState];
    newGraph[6] += impact;
    setChartDataState(newGraph);
    
    setShowModal(false);
    alert(`Success! You saved ${impact}kg of CO2.`);
  };

  // --- Styles ---
  const bentoCard = { backgroundColor: '#ffffff', borderRadius: '24px', padding: '24px', border: '1px solid #eee', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' };
  const navItemStyle = (active) => ({
    padding: '14px 20px', borderRadius: '14px', cursor: 'pointer', marginBottom: '8px',
    backgroundColor: active ? '#1a2e1a' : 'transparent',
    color: active ? 'white' : '#666', transition: '0.3s', display: 'flex', alignItems: 'center', gap: '12px'
  });

  return (
    <div style={{ display: 'flex', backgroundColor: '#f8faf8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '280px', backgroundColor: '#fff', borderRight: '1px solid #eee', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#2d5a27', marginBottom: '40px', letterSpacing: '-1px' }}>🌱 EcoTrack</h2>
        <div onClick={() => setActiveTab('Dashboard')} style={navItemStyle(activeTab === 'Dashboard')}><span>📊</span> Dashboard</div>
        <div onClick={() => setActiveTab('Analytics')} style={navItemStyle(activeTab === 'Analytics')}><span>📈</span> Analytics</div>
        <div onClick={() => setActiveTab('Community')} style={navItemStyle(activeTab === 'Community')}><span>🏆</span> Community</div>
        <div onClick={() => setActiveTab('My Forest')} style={navItemStyle(activeTab === 'My Forest')}><span>🌳</span> My Forest</div>
        
        <div style={{ marginTop: 'auto', padding: '20px', background: '#f0f4f0', borderRadius: '20px' }}>
          <small style={{ color: '#2d5a27', fontWeight: 'bold' }}>RANK: GUARDIAN</small>
          <div style={{ height: '8px', background: '#ddd', borderRadius: '10px', margin: '10px 0' }}>
            <div style={{ width: '75%', height: '100%', background: '#2d5a27', borderRadius: '10px' }}></div>
          </div>
          <small>750 XP to Level 5</small>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0 }}>Good Morning, Akanksha!</h1>
            <p style={{ color: '#888', marginTop: '5px' }}>Your green impact is 12% higher this week.</p>
          </div>
          <button onClick={() => setShowModal(true)} style={{ backgroundColor: '#1a2e1a', color: 'white', padding: '14px 28px', borderRadius: '16px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>+ Log Activity</button>
        </div>

        {/* --- TAB: DASHBOARD --- */}
        {activeTab === 'Dashboard' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
            <div style={{ ...bentoCard, gridColumn: 'span 2', background: '#1a2e1a', color: 'white' }}>
              <p style={{ opacity: 0.7 }}>Total Carbon Offset</p>
              <h1 style={{ fontSize: '48px', margin: '15px 0' }}>{stats.saved} <small style={{fontSize:'20px'}}>kg</small></h1>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ background: '#2d5a27', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>↑ 4.2% Today</span>
                <span style={{ background: '#2d5a27', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>Top 5% User</span>
              </div>
            </div>
            <div style={bentoCard}>
              <p style={{ color: '#888' }}>Eco Points</p>
              <h2 style={{ fontSize: '36px' }}>{stats.points}</h2>
              <span style={{ color: '#fbc02d', fontWeight: 'bold' }}>⭐ Gold Member</span>
            </div>
            <div style={bentoCard}>
              <p style={{ color: '#888' }}>Achievements</p>
              <div style={{ fontSize: '32px', marginTop: '10px' }}>🔥 💧 🌳 ♻️</div>
              <p style={{ fontSize: '12px', color: '#2d5a27', marginTop: '10px', cursor: 'pointer' }}>View all →</p>
            </div>
            <div style={{ ...bentoCard, gridColumn: 'span 3', height: '400px' }}>
              <h3>Impact History</h3>
              <div style={{ height: '300px' }}>
                <Bar data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [{ label: 'CO2 Saved', data: chartDataState, backgroundColor: '#1a2e1a', borderRadius: 10 }]
                }} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div style={{ ...bentoCard, textAlign: 'center' }}>
              <h3>Goal Progress</h3>
              <div style={{ height: '150px' }}>
                <Doughnut data={{
                  datasets: [{ data: [65, 35], backgroundColor: ['#2d5a27', '#eee'], borderWidth: 0, circumference: 180, rotation: 270 }]
                }} />
              </div>
              <p>65% of Monthly Goal</p>
              <button style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: 'none' }}>Set New Goal</button>
            </div>
          </div>
        )}

        {/* --- TAB: ANALYTICS --- */}
        {activeTab === 'Analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            <div style={{ ...bentoCard, gridColumn: 'span 2' }}>
              <h3>🤖 Smart Insight</h3>
              <p style={{ fontSize: '18px', color: '#2d5a27' }}>"Akanksha, switching to a plant-based diet on Wednesdays could save you an extra 15kg/month."</p>
              <button style={{ background: '#1a2e1a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px' }}>Apply Plan</button>
            </div>
            <div style={bentoCard}>
              <h3>Export Report</h3>
              <p>Download your monthly sustainability audit.</p>
              <button style={{ width: '100%', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>Download PDF</button>
            </div>
            <div style={bentoCard}>
              <h3>⚡ Energy Spikes</h3>
              <p>High usage detected between 6PM - 9PM.</p>
              <small style={{ color: 'red' }}>Action: Check Appliances</small>
            </div>
            <div style={bentoCard}>
              <h3>🌍 Global Benchmarking</h3>
              <p>You are performing better than 88% of Noida residents.</p>
            </div>
            <div style={bentoCard}>
              <h3>📉 Trend Forecast</h3>
              <p>Estimated savings for May: 45kg</p>
            </div>
          </div>
        )}

        {/* --- TAB: MY FOREST --- */}
        {activeTab === 'My Forest' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
            <div style={{ ...bentoCard, gridColumn: 'span 3', textAlign: 'center', background: 'linear-gradient(to bottom, #e8f5e9, #fff)', height: '350px' }}>
               <div style={{ fontSize: '80px' }}>{'🌳'.repeat(stats.trees)}</div>
               <h2>Forest Level: Green Sanctuary</h2>
               <p>Your trees have produced <b>{stats.oxygen}L</b> of Oxygen this month.</p>
               <button onClick={() => setStats(s => ({...s, trees: s.trees+1, points: s.points-500}))} style={{ padding: '12px 24px', background: '#2d5a27', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Plant New Tree (500 pts)</button>
            </div>
            <div style={bentoCard}><h4>Soil Fertility</h4><p>94% - Optimized</p></div>
            <div style={bentoCard}><h4>Wildlife Count</h4><p>4 Species attracted</p></div>
            <div style={bentoCard}><h4>Carbon Sequestration</h4><p>1.4kg/day</p></div>
          </div>
        )}

        {/* --- TAB: COMMUNITY --- */}
        {activeTab === 'Community' && (
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '25px' }}>
              <div style={bentoCard}>
                <h3>Live Rankings</h3>
                <div style={{ marginTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}><span>🥇 Rohan K.</span> <span>4.2k</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#2d5a27', fontWeight: 'bold' }}><span>🥈 You</span> <span>1.3k</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>🥉 Sara M.</span> <span>1.1k</span></div>
                </div>
              </div>
              <div style={bentoCard}>
                <h3>Global Challenges</h3>
                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '15px', marginBottom: '15px' }}>
                  <h4>No-Plastic Week</h4>
                  <p>Join 4.5k others in Noida. 2 days left!</p>
                  <button style={{ background: '#2d5a27', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px' }}>Join Challenge</button>
                </div>
                <div style={{ padding: '15px', border: '1px solid #eee', borderRadius: '15px' }}>
                  <h4>Cycle to Work</h4>
                  <p>Every 5km = 100 Bonus Points.</p>
                  <button style={{ border: '1px solid #2d5a27', padding: '8px 16px', borderRadius: '8px' }}>Remind Me</button>
                </div>
              </div>
           </div>
        )}
      </div>

      {/* ACTIVITY MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <form onSubmit={handleLogActivity} style={{ ...bentoCard, width: '450px', padding: '40px' }}>
            <h2 style={{ marginTop: 0 }}>Log Green Impact</h2>
            <label style={{ display: 'block', marginBottom: '10px' }}>Activity Type</label>
            <select style={{ width: '100%', padding: '12px', borderRadius: '10px', marginBottom: '20px' }}>
              <option>Public Transport (Bus/Metro)</option>
              <option>Recycling Waste</option>
              <option>Composting</option>
              <option>Energy Saving</option>
            </select>
            <label style={{ display: 'block', marginBottom: '10px' }}>Estimated Impact (kg CO2 saved)</label>
            <input name="impact" type="number" step="0.1" placeholder="e.g. 1.2" style={{ width: '94%', padding: '12px', borderRadius: '10px', marginBottom: '30px' }} required />
            <div style={{ display: 'flex', gap: '15px' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '12px', backgroundColor: '#2d5a27', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>Log Impact</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;