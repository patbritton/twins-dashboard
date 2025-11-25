import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, Scatter } from 'recharts';
import { Download } from 'lucide-react';
import { TrendingUp, TrendingDown, Users, Trophy, Home, Filter, Calendar, Award, TrendingDown as Decline } from 'lucide-react';

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
  const totalHR = data.reduce((sum, d) => sum + d.HR, 0);
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

  const twinsColors = {
    navy: '#002B5C',
    lightNavy: '#1e4d7b',
    red: '#BA0C2F',
    gold: '#D4AF6A'
  };

  const theme = {
    bg: darkMode ? '#0a1628' : '#FAFBFC',
    cardBg: darkMode ? '#14223d' : '#FFFFFF',
    text: darkMode ? '#F0F4F8' : '#1a2332',
    textMuted: darkMode ? '#94A3B8' : '#5a6b7d',
    border: darkMode ? '#1e3a5f' : '#DFE4EA',
    primary: darkMode ? '#5B92E5' : twinsColors.navy,
    accent: twinsColors.red,
    highlight: twinsColors.gold,
    success: '#4CAF50',
    chartBlue: darkMode ? '#5B92E5' : twinsColors.navy,
    chartRed: twinsColors.red,
    chartGold: twinsColors.gold,
    chartLight: darkMode ? '#7BA5E8' : twinsColors.lightNavy
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: darkMode ? '#1a2d4d' : '#FFFFFF',
          padding: '14px 16px',
          border: `2px solid ${theme.primary}`,
          borderRadius: '10px',
          boxShadow: darkMode ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 43, 92, 0.15)'
        }}>
          <p style={{ color: theme.text, fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>
              {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
    <div style={{
      backgroundColor: theme.cardBg,
      padding: '24px',
      borderRadius: '12px',
      border: `1px solid ${theme.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = darkMode ? '0 8px 20px rgba(91, 146, 229, 0.3)' : '0 4px 16px rgba(0, 43, 92, 0.15)';
      e.currentTarget.style.borderColor = theme.primary;
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)';
      e.currentTarget.style.borderColor = theme.border;
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div style={{ color: theme.textMuted, fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</div>
        <Icon size={20} color={theme.primary} />
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: theme.text, marginBottom: '4px' }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ color: theme.textMuted, fontSize: '12px', marginBottom: '8px' }}>
          {subtitle}
        </div>
      )}
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend === 'up' ? <TrendingUp size={16} color={theme.success} /> : <TrendingDown size={16} color={theme.accent} />}
          <span style={{ color: trend === 'up' ? theme.success : theme.accent, fontSize: '14px', fontWeight: '600' }}>
            {Math.abs(change)}% vs 2024
          </span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.bg,
      padding: '32px 24px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ 
                color: theme.primary, 
                fontSize: '38px', 
                fontWeight: '700', 
                margin: '0 0 8px 0',
                letterSpacing: '-0.5px'
              }}>
                Minnesota Twins Analytics Dashboard
              </h1>
              <p style={{ color: theme.textMuted, fontSize: '15px', margin: '0 0 8px 0', fontWeight: '500' }}>
                Interactive Performance Analysis • 2010-2025 • 15 Seasons
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                <span style={{ 
                  backgroundColor: darkMode ? 'rgba(91, 146, 229, 0.15)' : 'rgba(0, 43, 92, 0.08)', 
                  color: theme.primary, 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  fontWeight: '600'
                }}>React</span>
                <span style={{ 
                  backgroundColor: darkMode ? 'rgba(91, 146, 229, 0.15)' : 'rgba(0, 43, 92, 0.08)', 
                  color: theme.primary, 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  fontWeight: '600'
                }}>Recharts</span>
                <span style={{ 
                  backgroundColor: darkMode ? 'rgba(91, 146, 229, 0.15)' : 'rgba(0, 43, 92, 0.08)', 
                  color: theme.primary, 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  fontWeight: '600'
                }}>Data Visualization</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={exportToCSV}
                style={{
                  padding: '10px 20px',
                  backgroundColor: theme.primary,
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <Download size={16} />
                Export Data
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: theme.cardBg,
                  color: theme.text,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = theme.primary;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Filters */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '20px 24px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          marginBottom: '28px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color={theme.primary} />
            <span style={{ color: theme.text, fontWeight: '600', fontSize: '14px' }}>Filters:</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ color: theme.textMuted, fontSize: '13px', fontWeight: '600' }}>Year Range:</label>
            <select 
              value={yearRange[0]}
              onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {[2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <span style={{ color: theme.textMuted }}>to</span>
            <select 
              value={yearRange[1]}
              onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${theme.border}`,
                backgroundColor: theme.bg,
                color: theme.text,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {[2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021, 2022, 2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={showPlayoffsOnly}
              onChange={(e) => setShowPlayoffsOnly(e.target.checked)}
              style={{ cursor: 'pointer', width: '16px', height: '16px' }}
            />
            <span style={{ color: theme.text, fontSize: '13px', fontWeight: '600' }}>Playoff Seasons Only</span>
          </label>

          <div style={{ marginLeft: 'auto', color: theme.textMuted, fontSize: '13px', fontWeight: '600' }}>
            Showing {data.length} season{data.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Data Note */}
        <div style={{
          backgroundColor: darkMode ? 'rgba(91, 146, 229, 0.1)' : 'rgba(0, 43, 92, 0.04)',
          border: `1px solid ${darkMode ? 'rgba(91, 146, 229, 0.3)' : 'rgba(0, 43, 92, 0.12)'}`,
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '20px' }}>ℹ️</span>
          <p style={{ color: theme.text, fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            <strong>Data Source:</strong> Official Minnesota Twins franchise records • 2020 season excluded (shortened 60-game COVID season)
          </p>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
          {/* Win-Loss Record */}
          <div style={{
            backgroundColor: theme.cardBg,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
          }}>
            <h3 style={{ color: theme.text, fontSize: '17px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              Win-Loss Record Over Time
            </h3>
            <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
              <strong style={{ color: theme.text }}>Performance fluctuates significantly.</strong> Successful seasons like 2019 and 2023 show high win totals, while struggling years show clear declines. The team's competitiveness varies considerably across this 15-year span.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="Wins" 
                  stroke={theme.chartBlue} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: theme.chartBlue, strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1000}
                  animationBegin={0}
                />
                <Line 
                  type="monotone" 
                  dataKey="Losses" 
                  stroke={theme.chartRed} 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: theme.chartRed, strokeWidth: 0 }} 
                  activeDot={{ r: 6 }} 
                  animationDuration={1000}
                  animationBegin={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Win Percentage Trend */}
          <div style={{
            backgroundColor: theme.cardBg,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
          }}>
            <h3 style={{ color: theme.text, fontSize: '17px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              Win Percentage Trend
            </h3>
            <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
              <strong style={{ color: theme.text }}>Winning percentage shows cyclical patterns.</strong> Peak performance in 2019 (62.3%) and strong 2023 season (53.7%) contrast sharply with struggles in 2016 (36.4%) and recent 2025 decline (43.2%).
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorWinPct" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.chartBlue} stopOpacity={0.6}/>
                    <stop offset="95%" stopColor={theme.chartBlue} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={theme.textMuted} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} style={{ fontSize: '13px' }} domain={[0.3, 0.7]} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="Win_Percentage" 
                  stroke={theme.chartBlue} 
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
          <div style={{
            backgroundColor: theme.cardBg,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
          }}>
            <h3 style={{ color: theme.text, fontSize: '17px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              Average Attendance per Game
            </h3>
            <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
              <strong style={{ color: theme.text }}>Attendance correlates with team success.</strong> Fan turnout peaks during strong seasons (2010: 39.8K, 2019: 28.4K) and drops during losing years. The 2021 dip reflects post-COVID recovery period.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.filter(d => d.Avg_Attendance)}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Avg_Attendance" 
                  fill={theme.chartGold} 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1000}
                  animationBegin={100}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Home Runs */}
          <div style={{
            backgroundColor: theme.cardBg,
            padding: '24px',
            borderRadius: '12px',
            border: `1px solid ${theme.border}`,
            boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)'
          }}>
            <h3 style={{ color: theme.text, fontSize: '17px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              Home Run Production by Season
            </h3>
            <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
              <strong style={{ color: theme.text }}>Power hitting shows mixed correlation with success.</strong> Record 2019 season (307 HR) led to playoffs, but 2016's high output (200 HR) didn't translate to wins. Offensive production alone doesn't guarantee playoff berths.
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />
                <XAxis dataKey="Year" stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <YAxis stroke={theme.textMuted} style={{ fontSize: '13px' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="HR" radius={[6, 6, 0, 0]} animationDuration={1000} animationBegin={200}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.Playoffs === 'Yes' ? theme.chartBlue : theme.chartLight} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p style={{ color: theme.textMuted, fontSize: '12px', marginTop: '12px', textAlign: 'center', fontWeight: '500' }}>
              <span style={{ color: theme.chartBlue, fontWeight: 'bold' }}>■</span> Playoff Years | 
              <span style={{ color: theme.chartLight, fontWeight: 'bold' }}> ■</span> Non-Playoff Years
            </p>
          </div>
        </div>

        {/* Correlation Analysis - Full Width */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '24px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: theme.text, fontSize: '17px', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.3px' }}>
            Correlation Analysis: Win Percentage vs Average Attendance
          </h3>
          <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '16px', lineHeight: '1.5' }}>
            <strong style={{ color: theme.text }}>Strong positive correlation between performance and attendance.</strong> This scatter plot reveals that higher win percentages consistently attract larger crowds. Playoff seasons (shown in darker blue) cluster in the upper right, demonstrating that winning drives fan engagement at Target Field.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.border} opacity={0.5} />
              <XAxis 
                type="number" 
                dataKey="Win_Percentage" 
                name="Win Percentage" 
                stroke={theme.textMuted}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                label={{ value: 'Win Percentage', position: 'bottom', offset: 40, fill: theme.text, fontSize: 14, fontWeight: 600 }}
                domain={[0.3, 0.7]}
                style={{ fontSize: '13px' }}
              />
              <YAxis 
                type="number" 
                dataKey="Avg_Attendance" 
                name="Avg Attendance" 
                stroke={theme.textMuted}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                label={{ value: 'Average Attendance per Game', angle: -90, position: 'left', offset: 40, fill: theme.text, fontSize: 14, fontWeight: 600 }}
                style={{ fontSize: '13px' }}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{
                        backgroundColor: darkMode ? '#1a2d4d' : '#FFFFFF',
                        padding: '14px 16px',
                        border: `2px solid ${theme.primary}`,
                        borderRadius: '10px',
                        boxShadow: darkMode ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 4px 12px rgba(0, 43, 92, 0.15)'
                      }}>
                        <p style={{ color: theme.text, fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>
                          {data.Year} {data.Playoffs === 'Yes' ? '🏆' : ''}
                        </p>
                        <p style={{ color: theme.chartBlue, margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>
                          Win %: {(data.Win_Percentage * 100).toFixed(1)}%
                        </p>
                        <p style={{ color: theme.chartGold, margin: '4px 0', fontSize: '14px', fontWeight: '500' }}>
                          Attendance: {data.Avg_Attendance?.toLocaleString()}
                        </p>
                        <p style={{ color: theme.textMuted, margin: '4px 0', fontSize: '12px' }}>
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
                fill={theme.chartBlue}
                animationDuration={1500}
                animationBegin={0}
              >
                {data.filter(d => d.Avg_Attendance).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.Playoffs === 'Yes' ? theme.chartBlue : theme.chartLight}
                    opacity={entry.Playoffs === 'Yes' ? 1 : 0.6}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: darkMode ? 'rgba(91, 146, 229, 0.1)' : 'rgba(0, 43, 92, 0.04)',
            borderRadius: '8px',
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: theme.chartBlue }}></div>
              <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>Playoff Seasons</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: theme.chartLight, opacity: 0.6 }}></div>
              <span style={{ color: theme.text, fontSize: '13px', fontWeight: '500' }}>Non-Playoff Seasons</span>
            </div>
          </div>
        </div>

        {/* Key Insights Section */}
        <div style={{
          backgroundColor: theme.cardBg,
          padding: '28px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 43, 92, 0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ color: theme.text, fontSize: '18px', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color={theme.primary} />
            Key Insights
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <div style={{ color: theme.primary, fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>2019</div>
              <div style={{ color: theme.text, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Best Season</div>
              <div style={{ color: theme.textMuted, fontSize: '13px' }}>101 wins, 62.3% win rate, 307 home runs</div>
            </div>
            <div>
              <div style={{ color: theme.accent, fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>2016</div>
              <div style={{ color: theme.text, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Challenging Season</div>
              <div style={{ color: theme.textMuted, fontSize: '13px' }}>59 wins, 36.4% win rate, missed playoffs</div>
            </div>
            <div>
              <div style={{ color: theme.highlight, fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>33.3%</div>
              <div style={{ color: theme.text, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Playoff Rate</div>
              <div style={{ color: theme.textMuted, fontSize: '13px' }}>5 playoff appearances in 15 seasons</div>
            </div>
            <div>
              <div style={{ color: theme.primary, fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>Strong</div>
              <div style={{ color: theme.text, fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Win-Attendance Correlation</div>
              <div style={{ color: theme.textMuted, fontSize: '13px' }}>Higher win % directly drives increased fan turnout</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          textAlign: 'center',
          color: theme.textMuted,
          fontSize: '13px',
          borderTop: `1px solid ${theme.border}`
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>Built with React & Recharts • Data Visualization Portfolio Project</p>
          <p style={{ margin: 0 }}>Demonstrates: Data transformation, interactive filtering, responsive design, and modern UI/UX principles</p>
        </div>
      </div>
    </div>
  );
};

export default TwinsDashboard;