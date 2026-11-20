# FraudLens AI

**Distributed Financial Fraud Detection and Explainable AI Using Apache Spark and Large Language Models**

FraudLens AI is the public-facing research prototype for the BITS Pilani M.Tech dissertation. This starter release provides:
- React + Vite dark dashboard
- FastAPI backend with health, dashboard-summary and transaction-analysis endpoints
- Clearly labelled illustrative/demo transaction data
- A structure ready for the PaySim + PySpark + Spark MLlib + Structured Streaming + local LLM work

> Research integrity: figures and transaction results in this starter UI are illustrative demo data. They are not experimental results and must not be cited in the dissertation. Replace them only after running and documenting the actual experiments.

## Repository structure

```text
fraudlens-ai/
├── frontend/                 # React + Vite UI
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── backend/                  # FastAPI service
│   ├── app/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
├── spark/
│   ├── ingestion/
│   ├── preprocessing/
│   ├── training/
│   └── streaming/
├── llm/explanation/
├── models/
├── experiments/
├── research/
├── docker-compose.yml
└── .gitignore
```

## Prerequisites (Windows)

Install these tools:
1. Git for Windows
2. Node.js LTS (includes npm)
3. `uv` — Python version and project manager
4. Visual Studio Code

### Install uv

Open PowerShell and run:

```powershell
winget install --id astral-sh.uv -e
```

Close and reopen PowerShell (and VS Code terminals), then verify:

```powershell
uv --version
```

If `winget` is unavailable, use the official PowerShell installer:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Install the Python version required by this project:

```powershell
uv python install 3.12
```

You do not need to install Python separately, create a virtual environment with `python -m venv`, or activate `.venv` manually. `uv` manages the project interpreter and environment.

## 1. Run on Windows

Extract the ZIP file and open the `fraudlens-ai` folder in VS Code. Start the backend and frontend in two separate PowerShell terminals.

### 1.1 Start the FastAPI backend using uv

In the first terminal, from the repository root:

```powershell
cd backend

# Creates .venv and installs dependencies from pyproject.toml
uv sync

# Starts FastAPI inside the managed environment
uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open these URLs:
- API root: http://127.0.0.1:8000
- Swagger API documentation: http://127.0.0.1:8000/docs
- Health check: http://127.0.0.1:8000/api/health

Useful `uv` commands (run from the `backend` directory):

```powershell
# Check the Python interpreter used by this project
uv run python --version

# Add a runtime dependency and update pyproject.toml / uv.lock
uv add httpx

# Add a development dependency
uv add --dev pytest

# Re-sync the environment after dependency changes
uv sync
```

`uv sync` creates the local `backend\.venv` automatically. The first run may take longer because uv may download the managed Python interpreter and packages. Later runs reuse the environment. Do not run `pip install` separately; use `uv add` to manage dependencies.

### 1.2 Start the React frontend

Open a second PowerShell terminal at the repository root:

```powershell
cd frontend

# Create the local frontend environment file
Copy-Item .env.example .env

# Install JavaScript dependencies
npm install

# Start the Vite development server
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

### Windows troubleshooting

- If PowerShell says `uv` is not recognized, close and reopen PowerShell/VS Code. If it persists, check that uv's install directory is on your Windows `PATH`.
- If script execution policies prevent a PowerShell script from running, use `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` for the current terminal session.
- If port 8000 or 5173 is already occupied, stop the process using it or select another port.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health |
| GET | `/api/dashboard/summary` | Demo dashboard summary |
| GET | `/api/transactions` | Demo transaction list |
| POST | `/api/predict` | Demo risk analysis (not a trained model) |

## Next implementation stages

1. Download PaySim and preserve an untouched raw copy.
2. Implement reproducible PySpark ingestion, validation and feature engineering.
3. Establish baseline and compare Spark MLlib Random Forest and GBT.
4. Select threshold using validation data; reserve test set for final evaluation.
5. Run controlled Spark partitioning/caching experiments and record runtime, throughput and shuffle metrics.
6. Add file-based transaction replay with Spark Structured Streaming and checkpointing.
7. Add a separate LLM explanation service, grounded only in transaction/model evidence; keep it outside the prediction critical path.
8. Replace demo API service with persisted model inference and measured experiment results.

The scope intentionally does not require Kafka, cloud/GPU cluster deployment, LLM training from scratch or autonomous financial actions.
