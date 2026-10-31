import React, { useState } from "react";
import * as d3 from "d3";

const Barplot = ({ data }) => {
  const width = 500;
  const height = 400;

  const margin = {
    top: 60,
    right: 20,
    bottom: 30,
    left: 100,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const [tooltip, setTooltip] = useState(null);

  const totalStudents = data.reduce((sum, d) => sum + d.students, 0);

  // Y scale: countries
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.2);

  // X scale: students
  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.students)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {data.map((d) => (
          <g key={d.country}>
            <rect
              x={0}
              y={yScale(d.country)}
              width={xScale(d.students)}
              height={yScale.bandwidth()}
              fill={tooltip?.country === d.country ? "#ADDBFF" : "#00508F"}
              style={{
                cursor: "pointer",
                transition: "fill 0.15s ease",
              }}
              onMouseMove={(e) => {
                const svg = e.currentTarget.ownerSVGElement;

                const point = svg.createSVGPoint();
                point.x = e.clientX;
                point.y = e.clientY;

                const svgPoint = point.matrixTransform(
                  svg.getScreenCTM().inverse(),
                );

                setTooltip({
                  x: xScale(d.students),
                  y: yScale(d.country),
                  country: d.country,
                  students: d.students,
                  percentage: ((d.students / totalStudents) * 100).toFixed(1),
                });
              }}
              onMouseLeave={() => setTooltip(null)}
            />

            {/* Country Label */}
            <text
              x={-10}
              y={yScale(d.country) + yScale.bandwidth() / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
            >
              {d.country}
            </text>
          </g>
        ))}

        {/* Tooltip */}
        {tooltip && (
          <g
            transform={`translate(
      ${tooltip.x > innerWidth - 150 ? tooltip.x - 165 : tooltip.x + 15},
      ${tooltip.y - 15}
    )`}
            pointerEvents="none"
          >
            <rect
              width="150"
              height="55"
              rx="6"
              fill="white"
              stroke="#d1d5db"
              strokeWidth="1"
              opacity="0.97"
            />

            <text x="10" y="18" fontSize="12" fontWeight="600">
              {tooltip.country}
            </text>

            <text x="10" y="34" fontSize="11">
              Students: {tooltip.students}
            </text>

            <text x="10" y="48" fontSize="11">
              Share: {tooltip.percentage}%
            </text>
          </g>
        )}
      </g>
    </svg>
  );
};

export default Barplot;
