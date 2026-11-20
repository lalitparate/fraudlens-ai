import { useEffect, useState } from 'react'
import {
  Activity, ArrowDownRight, ArrowUpRight, BrainCircuit, ChartNoAxesCombined,
  CircleAlert, Clock3, Database, FileText, Gauge, Layers3, Radio,
  ShieldCheck, Sparkles, WalletCards, Menu, X, Github, ExternalLink
} from 'lucide-react'
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { getSummary, analyseTransaction } from './services/api'
import { demoTransactions, trendData } from './data/demo'

const navItems = [
  { label: 'Overview', icon: Gauge },
  { label: 'Transactions', icon: WalletCards },
  { label: 'Explainable AI', icon: BrainCircuit },
  { label: 'Spark Performance', icon: Layers3 },
  { label: 'Streaming', icon: Radio },
  { label: 'Research', icon: FileText },
]

function MetricCard({ label, value, note, icon: Icon, trend }) {
  return <article className="metric-card">
    <div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={18}/></span></div>
    <div className="metric-value">{value}</div>
    <div className="metric-note">{trend && <span className="trend"><ArrowUpRight size={13}/>{trend}</span>}{note}</div>
  </article>
}

function App() {
  const [summary, setSummary] = useState(null)
  const [apiState, setApiState] = useState('Connecting')
  const [active, setActive] = useState('Overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [amount, setAmount] = useState('85000')
  const [type, setType] = useState('TRANSFER')
  const [prediction, setPrediction] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    getSummary()
      .then(data => { setSummary(data); setApiState('Connected') })
      .catch(() => setApiState('Offline — showing demo data'))
  }, [])

  async function runAnalysis(e) {
    e.preventDefault()
    setBusy(true)
    setPrediction(null)
    try {
      const result = await analyseTransaction({
        transaction_type: type,
        amount: Number(amount),
        old_balance_org: 100000,
        new_balance_org: 0,
        old_balance_dest: 10000,
        new_balance_dest: 95000,
      })
      setPrediction(result)
    } catch {
      setPrediction({ risk: 'UNAVAILABLE', risk_score: null, mode: 'API OFFLINE', explanation: 'Start the FastAPI backend to run the demo analysis.' })
    } finally { setBusy(false) }
  }

  const nav = <nav className="nav-list">
    {navItems.map(item => {
      const Icon = item.icon
      return <button key={item.label} className={`nav-item ${active === item.label ? 'active' : ''}`} onClick={() => { setActive(item.label); setMobileOpen(false) }}>
        <Icon size={17}/><span>{item.label}</span>{item.label === 'Streaming' && <span className="nav-soon">SIM</span>}
      </button>
    })}
  </nav>

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><ShieldCheck size={22}/></div><div><strong>FraudLens<span>AI</span></strong><small>RESEARCH PLATFORM</small></div><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="workspace-label">WORKSPACE</div>
      {nav}
      <div className="sidebar-bottom">
        <div className="system-card"><div className="system-head"><span className="pulse-dot"></span> SYSTEM STATUS</div><strong>{apiState}</strong><small>Research prototype · v0.1.0</small></div>
        <a className="github-link" href="https://github.com/" target="_blank" rel="noreferrer"><Github size={16}/> GitHub repository <ExternalLink size={13}/></a>
      </div>
    </aside>

    {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
    <main className="main-content">
      <header className="topbar">
        <div className="topbar-left"><button className="menu-button" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{active}</b></div></div>
        <div className="topbar-right"><span className="env-badge"><span className="pulse-dot"></span> DEMO ENVIRONMENT</span><div className="avatar">FL</div></div>
      </header>

      {active === 'Overview' ? <div className="page-wrap">
        <section className="welcome-row">
          <div><div className="eyebrow"><Sparkles size={14}/> DISTRIBUTED FRAUD INTELLIGENCE</div><h1>Fraud analytics, <span>made explainable.</span></h1><p className="subtitle">A research prototype combining distributed transaction processing, machine learning and evidence-grounded explanations.</p></div>
          <div className="date-chip"><Activity size={15}/> Research workspace</div>
        </section>

        <div className="notice"><CircleAlert size={16}/><div><b>Research demo mode</b><span>All dashboard figures and sample transactions are illustrative placeholders, not measured dissertation results.</span></div></div>

        <section className="metrics-grid">
          <MetricCard label="Transactions processed" value={summary ? summary.transactions_scanned.toLocaleString() : '125,000'} note="Illustrative sample" icon={Database}/>
          <MetricCard label="Flagged for review" value={summary ? summary.flagged_transactions.toLocaleString() : '1,842'} note="Illustrative sample" icon={CircleAlert}/>
          <MetricCard label="Review rate" value={`${summary?.review_rate_percent ?? '1.47'}%`} note="Not an evaluated result" icon={ChartNoAxesCombined}/>
          <MetricCard label="Demo precision" value={`${((summary?.model_precision ?? 0.985) * 100).toFixed(1)}%`} note="Placeholder only" icon={ShieldCheck}/>
        </section>

        <section className="content-grid">
          <article className="panel chart-panel">
            <div className="panel-heading"><div><h2>Transaction review activity</h2><p>Illustrative weekly activity · sample values</p></div><span className="period-select">Last 7 days</span></div>
            <div className="chart-legend"><span><i className="legend-blue"></i> Reviewed</span><span><i className="legend-purple"></i> Flagged</span></div>
            <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData} margin={{ top: 12, right: 8, left: -18, bottom: 0 }}><defs><linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5798ff" stopOpacity={0.25}/><stop offset="100%" stopColor="#5798ff" stopOpacity={0}/></linearGradient><linearGradient id="purpleFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" stopOpacity={0.18}/><stop offset="100%" stopColor="#a78bfa" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#202b3d" strokeDasharray="3 5" vertical={false}/><XAxis dataKey="day" tick={{ fill: '#8190a6', fontSize: 12 }} axisLine={false} tickLine={false}/><YAxis tick={{ fill: '#8190a6', fontSize: 11 }} axisLine={false} tickLine={false}/><Tooltip contentStyle={{ background: '#111a29', border: '1px solid #26354b', borderRadius: 10, color: '#e7edf7' }}/><Area type="monotone" dataKey="reviewed" stroke="#5798ff" strokeWidth={2.4} fill="url(#blueFill)"/><Area type="monotone" dataKey="flagged" stroke="#a78bfa" strokeWidth={2.2} fill="url(#purpleFill)"/></AreaChart></ResponsiveContainer></div>
          </article>

          <article className="panel pipeline-panel">
            <div className="panel-heading"><div><h2>Research pipeline</h2><p>Planned system components</p></div><span className="tiny-tag">ROADMAP</span></div>
            <div className="pipeline-list">
              <div className="pipeline-item"><span className="pipeline-icon blue"><Database size={17}/></span><div><b>Data ingestion</b><small>PaySim · PySpark preparation</small></div><span className="stage planned">Planned</span></div>
              <div className="pipeline-item"><span className="pipeline-icon purple"><BrainCircuit size={17}/></span><div><b>Fraud classification</b><small>Random Forest · GBT</small></div><span className="stage planned">Planned</span></div>
              <div className="pipeline-item"><span className="pipeline-icon cyan"><Layers3 size={17}/></span><div><b>Streaming simulation</b><small>Structured Streaming replay</small></div><span className="stage planned">Planned</span></div>
              <div className="pipeline-item"><span className="pipeline-icon amber"><Sparkles size={17}/></span><div><b>LLM explanations</b><small>Local pretrained model</small></div><span className="stage planned">Planned</span></div>
            </div>
          </article>
        </section>

        <section className="content-grid lower-grid">
          <article className="panel table-panel">
            <div className="panel-heading"><div><h2>Recent transactions</h2><p>Sample records for interface demonstration</p></div><button className="text-button" onClick={() => setActive('Transactions')}>View all <ArrowUpRight size={14}/></button></div>
            <TransactionTable items={demoTransactions}/>
          </article>
          <article className="panel quick-panel">
            <div className="panel-heading"><div><h2>Quick transaction check</h2><p>Try the illustrative API rule</p></div><span className="tiny-tag">DEMO</span></div>
            <form onSubmit={runAnalysis} className="analysis-form">
              <label>Transaction type<select value={type} onChange={e => setType(e.target.value)}><option>TRANSFER</option><option>PAYMENT</option><option>CASH_OUT</option><option>CASH_IN</option><option>DEBIT</option></select></label>
              <label>Amount (₹)<input type="number" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required/></label>
              <button className="primary-button" disabled={busy}>{busy ? 'Analysing…' : 'Analyse transaction'} <ArrowUpRight size={15}/></button>
            </form>
            {prediction && <div className="prediction-result"><div className="prediction-top"><b>Demo analysis result</b><span className={`risk-pill ${prediction.risk.toLowerCase()}`}>{prediction.risk}</span></div><strong>{prediction.risk_score == null ? '—' : `${Math.round(prediction.risk_score * 100)}%`}</strong><p>{prediction.explanation}</p><small>{prediction.mode}</small></div>}
          </article>
        </section>

        <footer className="footer"><span>FraudLens AI · M.Tech research prototype</span><span>Built around Apache Spark, ML and explainable AI</span></footer>
      </div> : <PlaceholderPage active={active} setActive={setActive}/>}
    </main>
  </div>
}

function TransactionTable({ items }) {
  return <div className="table-scroll"><table><thead><tr><th>TRANSACTION ID</th><th>TYPE</th><th>AMOUNT</th><th>RISK</th><th>SCORE</th></tr></thead><tbody>{items.map(tx => <tr key={tx.id}><td className="id-cell">{tx.id}</td><td>{tx.type}</td><td>₹{tx.amount.toLocaleString('en-IN')}</td><td><span className={`risk-pill ${tx.risk.toLowerCase()}`}>{tx.risk}</span></td><td>{tx.score}</td></tr>)}</tbody></table></div>
}

function PlaceholderPage({ active, setActive }) {
  const descriptions = {
    'Transactions': ['Transaction explorer', 'Browse transaction records, filter by risk and inspect model outputs.'],
    'Explainable AI': ['Evidence-grounded explanations', 'SHAP feature contributions and LLM-generated summaries will appear here after model integration.'],
    'Spark Performance': ['Distributed processing experiments', 'Compare execution time, throughput, partitioning, caching and shuffle metrics.'],
    'Streaming': ['Structured Streaming simulation', 'Replay timestamped transaction files and monitor micro-batch processing behaviour.'],
    'Research': ['Research methodology and findings', 'Review the PaySim dataset, experimental design, evaluation metrics and dissertation findings.'],
  }
  const [title, desc] = descriptions[active] || descriptions.Research
  return <div className="page-wrap placeholder-wrap"><div className="eyebrow"><Activity size={14}/> FRAUDLENS AI / {active.toUpperCase()}</div><h1>{title}</h1><p className="subtitle">{desc}</p><div className="panel coming-panel"><div className="coming-icon"><Clock3 size={25}/></div><h2>Implementation milestone pending</h2><p>This section is part of the approved research prototype roadmap. It will be enabled as the corresponding PySpark, ML, streaming and explanation components are implemented and evaluated.</p><button className="secondary-button" onClick={() => setActive('Overview')}>Back to overview</button></div></div>
}

export default App
