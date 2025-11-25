# Minnesota Twins Analytics Dashboard

<<<<<<< HEAD
Interactive dashboard analyzing 15 years of Minnesota Twins performance data (2010-2025) from https://www.baseball-reference.com/teams/MIN/.
=======
Interactive dashboard analyzing 15 years of Minnesota Twins performance data (2010-2025).
>>>>>>> 2e7d08b70d23f017dcab41c208e00455fec061a0

**🔗 [View Live Dashboard](https://patbritton.github.io/twins-dashboard/)**

---

## About the Data

### Data Source
All statistics sourced from [Baseball-Reference.com](https://www.baseball-reference.com/teams/MIN/), the official database for MLB historical statistics.

### Time Period
**2010-2025** (15 seasons)

**Note:** 2020 season is excluded due to the COVID-19 shortened season (60 games instead of the standard 162 games).

### Dataset

| Field | Description |
|-------|-------------|
| **Year** | Season year (2010-2025, excluding 2020) |
| **Wins** | Total regular season wins |
| **Losses** | Total regular season losses |
| **Win Percentage** | Wins ÷ (Wins + Losses) |
| **Playoffs** | Whether the team made the playoffs (Yes/No) |
| **Total Attendance** | Total season attendance at Target Field |
| **Avg Attendance** | Average attendance per game (Total ÷ 81 home games) |
| **Home Runs** | Total team home runs for the season |

### Key Findings
- Strong positive correlation between win percentage and attendance
- Best season: 2019 (101 wins, 62.3% win rate, 307 home runs)
- Playoff appearances: 5 out of 15 seasons (33.3% rate)
- Attendance decline: 15.8% drop from 2010 peak to 2025

---

## Features

- Interactive year range and playoff filters
- 5 chart types: line, area, bar, and scatter plot visualizations
- Dark/light mode toggle
- CSV data export
- Responsive design for mobile and desktop

---

## Built With

- React 18
- Recharts (data visualization)
- Lucide React (icons)
- Deployed on GitHub Pages

---

## Local Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Build for production
npm run build
```

---

## Author

**Patrick Britton**
- GitHub: [@patbritton](https://github.com/patbritton)

---

## License

<<<<<<< HEAD
MIT License - feel free to use this project as a reference or starting point for your own dashboards.
=======
MIT License - feel free to use this project as a reference or starting point for your own dashboards.
>>>>>>> 2e7d08b70d23f017dcab41c208e00455fec061a0
