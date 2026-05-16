const COLORS = {
  rest: "#5c6c84",
  light: "#1a4d8c",
  intense: "#e17000",
};

function BayesianPieChart({ probabilities }) {
  const r = Number(probabilities?.rest);
  const l = Number(probabilities?.light);
  const i = Number(probabilities?.intense);

  const safeR = Number.isFinite(r) ? r : 0;
  const safeL = Number.isFinite(l) ? l : 0;
  const safeI = Number.isFinite(i) ? i : 0;
  const sum = safeR + safeL + safeI;

  if (sum <= 0) {
    return <p className="bayesian-pie-empty">No probability data to display.</p>;
  }

  const t0 = safeR / sum;
  const t1 = safeL / sum;
  const t2 = safeI / sum;

  const gradient = `conic-gradient(from -90deg, ${COLORS.rest} 0turn ${t0}turn, ${COLORS.light} ${t0}turn ${
    t0 + t1
  }turn, ${COLORS.intense} ${t0 + t1}turn 1turn)`;

  const rows = [
    {
      key: "rest",
      label: "Rest",
      explain: "recovery day or very light movement",
      value: safeR,
      share: t0,
      color: COLORS.rest,
    },
    {
      key: "light",
      label: "Light",
      explain: "moderate, easier session",
      value: safeL,
      share: t1,
      color: COLORS.light,
    },
    {
      key: "intense",
      label: "Intense",
      explain: "harder training session",
      value: safeI,
      share: t2,
      color: COLORS.intense,
    },
  ];

  const maxShare = Math.max(t0, t1, t2);
  const leaders = rows.filter((row) => row.share === maxShare);
  const leaderPct = (maxShare * 100).toFixed(1);
  const leaderNames =
    leaders.length > 1
      ? `${leaders.map((x) => x.label).join(" and ")} (tied)`
      : `${leaders[0].label} (${leaderPct}%)`;

  const ariaLabel = rows
    .map((row) => `${row.label} ${(row.share * 100).toFixed(1)} percent`)
    .join(", ");

  return (
    <div className="bayesian-pie-wrap">
      <div
        className="bayesian-pie-disk"
        style={{ background: gradient }}
        role="img"
        aria-label={`Bayesian workout probability chart: ${ariaLabel}. Full explanation follows.`}
      />
      <ul className="bayesian-pie-legend">
        {rows.map((row) => (
          <li key={row.key} className="bayesian-pie-legend-row">
            <span className="bayesian-pie-swatch" style={{ backgroundColor: row.color }} />
            <span className="bayesian-pie-legend-label">{row.label}</span>
            <span className="bayesian-pie-legend-pct">{(row.share * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>

      <div className="bayesian-pie-explain">
        <p>
          Each percentage is the model’s <strong>confidence</strong> in that workout style for today,
          based on your inputs and the network’s hidden states (e.g. fatigue, recovery). They are not
          calorie or macro numbers-they always add up to <strong>100%</strong> because they split one
          decision: how hard to train.
        </p>
        <ul className="bayesian-pie-glossary">
          {rows.map((row) => (
            <li key={`g-${row.key}`}>
              <strong>{row.label}:</strong> {row.explain}.
            </li>
          ))}
        </ul>
        <p className="bayesian-pie-takeaway">
          <strong>Takeaway:</strong>{" "}
          {leaders.length > 1 ? (
            <>
              <em>{leaderNames}</em> split the top share-consider how you feel before choosing effort
              level.
            </>
          ) : (
            <>
              The largest slice is <em>{leaders[0].label}</em> at <strong>{leaderPct}%</strong>, so the
              model currently favors that recommendation most.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default BayesianPieChart;
