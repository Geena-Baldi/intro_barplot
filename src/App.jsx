import Barplot from "./Barplot";
import heart from "./assets/heart-x.svg";
import "./App.css";

const data = [
  { country: "United States", students: 68 },
  { country: "France", students: 21 },
  { country: "United Kingdom", students: 21 },
  { country: "Germany", students: 20 },
  { country: "Switzerland", students: 13 },
  { country: "Spain", students: 10 },
  { country: "Netherlands", students: 9 },
  { country: "India", students: 9 },
  { country: "Singapore", students: 8 },
  { country: "Ireland", students: 8 },
  { country: "Sweden", students: 7 },
  { country: "Australia", students: 7 },
  { country: "Canada", students: 6 },
  { country: "Finland", students: 5 },
  { country: "Mexico", students: 4 },
  { country: "Brazil", students: 4 },
  { country: "Saudi Arabia", students: 3 },
  { country: "Romania", students: 3 },
  { country: "Philippines", students: 3 },
  { country: "New Zealand", students: 3 },
];

function App() {
  const countOfCountries = data.length;

  return (
    <div className="app">
      <div>
        <h2>Countries With At Least 3 Students</h2>
        <h2>
          {" "}
          In D3
          <img
            src={heart}
            alt="heart"
            style={{
              height: "24px",
              width: "24px",
              verticalAlign: "middle",
              margin: "0 6px",
            }}
          />
          React Cohort 1
        </h2>
      </div>
      <div className="kpi-container">
        <div className="kpi-card">
          <div className="kpi-value">232</div>
          <div className="kpi-label">Students</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-value">20</div>
          <div className="kpi-label">Countries</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-value">USA</div>
          <div className="kpi-label">Largest Share</div>
        </div>
      </div>

      <div className="chart-container">
        <Barplot data={data} />
      </div>
    </div>
  );
}

export default App;
