import { useEffect, useState } from "react";
import api from "../api/axios.js";
import Sweep from "../components/Sweep.jsx";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.get("/jobs").then((r) => setJobs(r.data || [])).finally(() => setLoading(false)); }, []);

  return (
    <>//
      <section
  style={{
    position: "relative",
    backgroundImage: `
      
     linear-gradient(
    90deg,
    rgba(5, 18, 40, 0.82),
    rgba(5, 18, 40, 0.70)
  ),
      url("/careers-bg.png")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    overflow: "hidden",
  }}
>
  <div
    className="container"
    style={{
      padding: "130px 32px 110px",
      position: "relative",
      zIndex: 2,
    }}
  >
    <div
      className="eyebrow"
      style={{ color: "var(--blue-light)" }}
    >
      Careers
    </div>

    <h1
      style={{
        color: "#fff",
        fontSize: "clamp(32px,4vw,46px)",
        marginTop: 16,
        maxWidth: 700,
      }}
    >
      Join the AEREX team.
    </h1>

    <p
      style={{
        color: "#d1d9e6",
        marginTop: 16,
        maxWidth: 560,
        lineHeight: 1.7,
      }}
    >
      We're always interested in hearing from engineers, technicians and
      sales professionals with HVAC, refrigeration or safety product
      experience.
    </p>
  </div>

  {/* Bottom decorative lines */}
  <div
    style={{
      position: "relative",
      zIndex: 2,
    }}
  >
    <Sweep variant="dark" />
  </div>
</section>

      <section className="section">
        <div className="container">
          {loading ? <p style={{ color: "var(--ink-soft)" }}>Loading openings...</p> :
            jobs.length === 0 ? (
              <div className="card" style={{ padding: 40, textAlign: "center" }}>
                <h3 style={{ fontSize: 18 }}>No open positions right now</h3>
                <p style={{ color: "var(--ink-soft)", marginTop: 10 }}>We welcome speculative applications from experienced professionals.</p>
                <a href="mailto:mohammed@aerexgroup.com?subject=Speculative Application" className="btn btn-primary" style={{ marginTop: 20, display: "inline-flex" }}>Send Your CV</a>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {jobs.map((job) => (
                  <div key={job._id} className="card" style={{ padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <h3 style={{ fontSize: 18 }}>{job.title}</h3>
                      <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6 }}>{job.department && `${job.department} · `}{job.location} · {job.type}</p>
                      {job.description && <p style={{ fontSize: 14, color: "var(--ink-soft)", marginTop: 12, maxWidth: 560, lineHeight: 1.7 }}>{job.description}</p>}
                      {job.requirements?.length > 0 && (
                        <ul style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {job.requirements.map((r, i) => (
                            <li key={i} style={{ fontSize: 12, background: "var(--silver-light)", padding: "4px 10px", borderRadius: 20, color: "var(--navy)" }}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <a href={`mailto:mohammed@aerexgroup.com?subject=${encodeURIComponent("Application: " + job.title)}`} className="btn btn-outline">Apply Now</a>
                  </div>
                ))}
              </div>
            )}
        </div>
      </section>
    </>
  );
}
