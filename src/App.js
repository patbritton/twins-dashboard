import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter } from 'recharts';
import { Download, ExternalLink, TrendingUp, TrendingDown, Users, Trophy, Home, Filter, Award } from 'lucide-react';
import './TwinsDashboard.css'; // Make sure the path matches where you saved the CSS file

const TwinsDashboard = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [yearRange, setYearRange] = useState([2010, 2025]);
  const [showPlayoffsOnly, setShowPlayoffsOnly] = useState(false);

  const allData = [
    { Year: 2010, Wins: 94, Losses: 68, Win_Percentage: 0.58, Playoffs: 'Yes', Total_Attendance: 3223640, Avg_Attendance: 39798, HR: 142 },
    { Year: 2011, Wins: 63, Losses: 99, Win_Percentage: 0.389, Playoffs: 'No', Total_Attendance: 3168116, Avg_Attendance: 39113, HR: 103 },
    { Year: 2012, Wins: 66, Losses: 96, Win_Percentage: 0.407, Playoffs: 'No', Total_Attendance: 2776354, Avg_Attendance: 34276, HR: 131 },
    { Year: 2013, Wins: 66, Losses: 96, Win_Percentage: 0.407, Playoffs: 'No', Total_Attendance: 2477644, Avg_Attendance: 30588, HR: 151 },
    { Year: 2014, Wins: 70, Losses: 92, Win_Percentage: 0.432, Playoffs: 'No', Total_Attendance: 2250606, Avg_Attendance: 27785, HR: 128 },
    { Year: 2015, Wins: 83, Losses: 79, Win_Percentage: 0.512, Playoffs: 'No', Total_Attendance: 2220054, Avg_Attendance: 27408, HR: 156 },
    { Year: 2016, Wins: 59, Losses: 103, Win_Percentage: 0.364, Playoffs: 'No', Total_Attendance: 1963912, Avg_Attendance: 24246, HR: 200 },
    { Year: 2017, Wins: 85, Losses: 77, Win_Percentage: 0.525, Playoffs: 'Yes', Total_Attendance: 2051279, Avg_Attendance: 25324, HR: 206 },
    { Year: 2018, Wins: 78, Losses: 84, Win_Percentage: 0.481, Playoffs: 'No', Total_Attendance: 1959197, Avg_Attendance: 24188, HR: 166 },
    { Year: 2019, Wins: 101, Losses: 61, Win_Percentage: 0.623, Playoffs: 'Yes', Total_Attendance: 2303299, Avg_Attendance: 28436, HR: 307 },
    { Year: 2021, Wins: 73, Losses: 89, Win_Percentage: 0.451, Playoffs: 'No', Total_Attendance: 1310199, Avg_Attendance: 16175, HR: 228 },
    { Year: 2022, Wins: 78, Losses: 84, Win_Percentage: 0.481, Playoffs: 'No', Total_Attendance: 1801128, Avg_Attendance: 22236, HR: 178 },
    { Year: 2023, Wins: 87, Losses: 75, Win_Percentage: 0.537, Playoffs: 'Yes', Total_Attendance: 1974124, Avg_Attendance: 24372, HR: 233 },
    { Year: 2024, Wins: 82, Losses: 80, Win_Percentage: 0.506, Playoffs: 'No', Total_Attendance: 1951616, Avg_Attendance: 24094, HR: 183 },
    { Year: 2025, Wins: 70, Losses: 92, Win_Percentage: 0.432, Playoffs: 'No', Total_Attendance: 1768728, Avg_Attendance: 21836, HR: 191 }
  ];

  // Filter data based on selections
  const data = allData.filter(d => {
    const inRange = d.Year >= yearRange[0] && d.Year <= yearRange[1];
    const matchesPlayoff = !showPlayoffsOnly || d.Playoffs === 'Yes';
    return inRange && matchesPlayoff;
  });

  // Calculate metrics
  const latestYear = allData[allData.length - 1];
  const previousYear = allData[allData.length - 2];
  const playoffYears = data.filter(d => d.Playoffs === 'Yes').length;
  const avgWinPct = data.length > 0 ? (data.reduce((sum, d) => sum + d.Win_Percentage, 0) / data.length * 100).toFixed(1) : 0;
  const avgAttendance = data.length > 0 ? Math.round(data.reduce((sum, d) => sum + (d.Avg_Attendance || 0), 0) / data.filter(d => d.Avg_Attendance).length) : 0;

  const winPctChange = ((latestYear.Win_Percentage - previousYear.Win_Percentage) * 100).toFixed(1);
  const attendanceChange = ((latestYear.Avg_Attendance - previousYear.Avg_Attendance) / previousYear.Avg_Attendance * 100).toFixed(1);

  // CSV Export Function
  const exportToCSV = () => {
    const headers = ['Year', 'Wins', 'Losses', 'Win_Percentage', 'Playoffs', 'Total_Attendance', 'Avg_Attendance', 'Home_Runs'];
    const csvData = data.map(row => [
      row.Year,
      row.Wins,
      row.Losses,
      row.Win_Percentage,
      row.Playoffs,
      row.Total_Attendance || 'N/A',
      row.Avg_Attendance || 'N/A',
      row.HR
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `twins_data_${yearRange[0]}-${yearRange[1]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keep specific hex colors for Recharts as it requires JS values, 
  // but we map them to variables in CSS for consistency.
  const chartColors = {
    primary: darkMode ? '#5B92E5' : '#002B5C',
    red: '#BA0C2F',
    gold: '#D4AF6A',
    light: darkMode ? '#7BA5E8' : '#1e4d7b',
    border: darkMode ? '#1e3a5f' : '#DFE4EA',
    textMuted: darkMode ? '#94A3B8' : '#5a6b7d'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="tooltip-item" style={{ color: entry.color }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-title">{title}</div>
        <Icon size={20} className="text-primary-color" style={{ color: 'var(--primary-color)' }} />
      </div>
      <div className="metric-value">
        {value}
      </div>
      {subtitle && (
        <div className="metric-subtitle">
          {subtitle}
        </div>
      )}
      {change && (
        <div className="metric-trend">
          {trend === 'up' ? <TrendingUp size={16} className="trend-up" /> : <TrendingDown size={16} className="trend-down" />}
          <span className={`trend-text ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            {Math.abs(change)}% vs 2024
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div className={`twins-dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-container">
        {/* Header */}
        <div className="header-section">
          <div className="header-content">
            <div>
              <h1 className="main-title">
                Minnesota Twins Analytics Dashboard
              </h1>
              <p className="sub-title">
                Interactive Performance Analysis • 2010-2025 • 15 Seasons
              </p>
              <div className="tag-container">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Recharts</span>
                <span className="tech-tag">Data Visualization</span>
              </div>
            </div>
            <div className="button-group">
              <button onClick={exportToCSV} className="btn btn-primary">
                <Download size={16} />
                Export Data
              </button>
              <button
                onClick={() =>
                  window.open(
                    'https://mnscu-my.sharepoint.com/:x:/r/personal/xq9341ij_go_minnstate_edu/Documents/FALL%2025/BDAT%201040/FINAL%20PROJECT/Master.xlsx?d=wef32017161794704821c6c3cf43375a6&csf=1&web=1&e=3EgeKu',
                    '_blank'
                  )
                }
                className="btn btn-primary"
              >
                <ExternalLink size={16} />
                View Original Excel
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn btn-secondary"
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Filters */}
        <div className="filter-card">
          <div className="filter-group">
            <Filter size={18} style={{ color: 'var(--primary-color)' }} />
            <span className="filter-label">Filters:</span>
          </div>
          
          <div className="filter-group" style={{ gap: '12px' }}>
            <label className="filter-sub-label">Year Range:</label>
            <select 
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
              className="filter-select"
            >
              {[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span className="text-muted" style={{ color: 'var(--text-secondary)' }}>to</span>
            <select 
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
              className="filter-select"
            >
              {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showPlayoffsOnly}
              onChange={(e) => setShowPlayoffsOnly(e.target.checked)}
              className="checkbox-input"
            />
            <span className="filter-label">Playoff Seasons Only</span>
          </label>

          <div className="filter-count">
            Showing {data.length} season{data.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Data Note */}
        <div className="info-box">
          <span style={{ fontSize: '20px' }}>ℹ️</span>
          <p className="info-text">
            <strong>Data Source:</strong> <a href="https://www.baseball-reference.com/teams/MIN/">Baseball-Reference.com</a> • 2020 season excluded (shortened 60-game COVID season)
          </p>
        </div>

        {/* Key Metrics */}
        <div className="metrics-grid">
          <MetricCard
            title="2025 Win Percentage"
            value={`${(latestYear.Win_Percentage * 100).toFixed(1)}%`}
            subtitle="70-92 record"
            change={winPctChange}
            trend={winPctChange > 0 ? 'up' : 'down'}
            icon={Trophy}
          />
          <MetricCard
            title="Avg Attendance 2025"
            value={latestYear.Avg_Attendance.toLocaleString()}
            subtitle="per game"
            change={attendanceChange}
            trend={attendanceChange > 0 ? 'up' : 'down'}
            icon={Users}
          />
          <MetricCard
            title="Home Runs 2025"
            value={latestYear.HR}
            subtitle="team total"
            icon={Home}
          />
          <MetricCard
            title="Playoff Appearances"
            value={`${playoffYears}/${data.length}`}
            subtitle={`${((playoffYears / data.length) * 100).toFixed(0)}% success rate`}
            icon={Award}
          />
          <MetricCard
            title="Avg Win Rate"
            value={`${avgWinPct}%`}
            subtitle="selected period"
            icon={TrendingUp}
          />
          <MetricCard
            title="Avg Attendance"
            value={avgAttendance.toLocaleString()}
            subtitle="per game avg"
            icon={Users}
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Win-Loss Record */}
          <div className="chart-card">
            <h3 className="chart-title">
              Win-Loss Record Over Time
            </h3>
            <p className="chart-subtitle">
              <strong>Performance fluctuates significantly.</strong> Successful seasons like 2019 and 2023 show high win totals, while struggling years show clear declines. The team's competitiveness varies considerably across this 15-year span.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Wins" 
                  stroke={chartColors.primary} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: chartColors.primary, strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1000}
                  animationBegin={0}
                />
                <Line 
                  type="monotone" 
                  dataKey="Losses" 
                  stroke={chartColors.red} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: chartColors.red, strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1000}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Win Percentage Trend */}
          <div className="chart-card">
            <h3 className="chart-title">
              Win Percentage Trend
            </h3>
            <p className="chart-subtitle">
              <strong>Winning percentage shows cyclical patterns.</strong> Peak performance in 2019 (62.3%) and strong 2023 season (53.7%) contrast sharply with struggles in 2016 (36.4%) and recent 2025 decline (43.2%).
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWinPct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={chartColors.textMuted} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} style={{ fontSize: '13px' }} domain={[0.3, 0.7]} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="Win_Percentage" 
                  stroke={chartColors.primary} 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorWinPct)" 
                  animationDuration={1200}
                  animationBegin={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Attendance Analysis */}
          <div className="chart-card">
            <h3 className="chart-title">
              Average Attendance per Game
            </h3>
            <p className="chart-subtitle">
              <strong>Attendance correlates with team success.</strong> Fan turnout peaks during strong seasons (2010: 39.8K, 2019: 28.4K) and drops during losing years. The 2021 dip reflects post-COVID recovery period.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.filter(d => d.Avg_Attendance)}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Avg_Attendance" 
                  fill={chartColors.gold} 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1000}
                  animationBegin={100}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Home Runs */}
          <div className="chart-card">
            <h3 className="chart-title">
              Home Run Production by Season
            </h3>
            <p className="chart-subtitle">
              <strong>Power hitting shows mixed correlation with success.</strong> Record 2019 season (307 HR) led to playoffs, but 2016's high output (200 HR) didn't translate to wins. Offensive production alone doesn't guarantee playoff berths.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={chartColors.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="HR" radius={[6, 6, 0, 0]} animationDuration={1000} animationBegin={200}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.Playoffs === 'Yes' ? chartColors.primary : chartColors.light} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{ color: chartColors.textMuted, fontSize: '12px', marginTop: '12px', textAlign: 'center', fontWeight: '500' }}>
              <span style={{ color: chartColors.primary, fontWeight: 'bold' }}>■</span> Playoff Years | 
              <span style={{ color: chartColors.light, fontWeight: 'bold' }}> ■</span> Non-Playoff Years
            </p>
          </div>
        </div>

        {/* Correlation Analysis - Full Width */}
        <div className="chart-card full-width-card">
          <h3 className="chart-title">
            Correlation Analysis: Win Percentage vs Average Attendance
          </h3>
          <p className="chart-subtitle">
            <strong>Strong positive correlation between performance and attendance.</strong> This scatter plot reveals that higher win percentages consistently attract larger crowds. Playoff seasons (shown in darker blue) cluster in the upper right, demonstrating that winning drives fan engagement at Target Field.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
              <XAxis 
                type="number" 
                dataKey="Win_Percentage" 
                name="Win Percentage" 
                stroke={chartColors.textMuted}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                label={{ value: 'Win Percentage', position: 'bottom', offset: 40, fill: chartColors.textMuted, fontSize: 14, fontWeight: 600 }}
                domain={[0.3, 0.7]}
                style={{ fontSize: '13px' }}
              />
              <YAxis 
                type="number" 
                dataKey="Avg_Attendance" 
                name="Avg Attendance" 
                stroke={chartColors.textMuted}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                label={{ value: 'Average Attendance per Game', angle: -90, position: 'left', offset: 40, fill: chartColors.textMuted, fontSize: 14, fontWeight: 600 }}
                style={{ fontSize: '13px' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="custom-tooltip">
                        <p className="tooltip-label">
                          {data.Year} {data.Playoffs === 'Yes' ? '🏆' : ''}
                        </p>
                        <p style={{ color: chartColors.primary, margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>
                          Win %: {(data.Win_Percentage * 100).toFixed(1)}%
                        </p>
                        <p style={{ color: chartColors.gold, margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>
                          Attendance: {data.Avg_Attendance?.toLocaleString()}
                        </p>
                        <p style={{ color: chartColors.textMuted, margin: '4px 0', fontSize: '12px' }}>
                          {data.Wins}-{data.Losses} record
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter 
                name="Seasons" 
                data={data.filter(d => d.Avg_Attendance)} 
                fill={chartColors.primary}
                animationDuration={1500}
                animationBegin={0}
              >
                {data.filter(d => d.Avg_Attendance).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.Playoffs === 'Yes' ? chartColors.primary : chartColors.light}
                    opacity={entry.Playoffs === 'Yes' ? 1 : 0.6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div className="legend-container">
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: chartColors.primary }}></div>
              <span className="legend-text">Playoff Seasons</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ backgroundColor: chartColors.light, opacity: 0.6 }}></div>
              <span className="legend-text">Non-Playoff Seasons</span>
            </div>
          </div>
        </div>

        {/* Key Insights Section */}
        <div className="chart-card full-width-card">
          <h3 className="insights-header">
            <Award size={20} style={{ color: 'var(--primary-color)' }} />
            Key Insights
          </h3>
          <div className="insights-grid">
            <div>
              <div className="insight-value" style={{ color: 'var(--primary-color)' }}>2019</div>
              <div className="insight-label">Best Season</div>
              <div className="insight-desc">101 wins, 62.3% win rate, 307 home runs</div>
            </div>
            <div>
              <div className="insight-value" style={{ color: 'var(--accent-color)' }}>2016</div>
              <div className="insight-label">Challenging Season</div>
              <div className="insight-desc">59 wins, 36.4% win rate, missed playoffs</div>
            </div>
            <div>
              <div className="insight-value" style={{ color: 'var(--highlight-color)' }}>33.3%</div>
              <div className="insight-label">Playoff Rate</div>
              <div className="insight-desc">5 playoff appearances in 15 seasons</div>
            </div>
            <div>
              <div className="insight-value" style={{ color: 'var(--primary-color)' }}>Strong</div>
              <div className="insight-label">Win-Attendance Correlation</div>
              <div className="insight-desc">Higher win % directly drives increased fan turnout</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="dashboard-footer">
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Built with React & Recharts • Patrick Britton - Anoka Tech - Data Visualization Final Project.</p>
          <p style={{ margin: 0 }}>Demonstrates: Data transformation, interactive filtering, responsive design, and modern UI/UX principles</p>
        </div>
      </div>
    </div>
  );
};

export default TwinsDashboard;