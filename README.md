
# Gym Leaderboard

<!-- GETTING STARTED -->
## Getting Started
### Install 
* [GitHub Desktop](https://desktop.github.com/) or, optionally, just [git](https://git-scm.com/downloads)
* [Python 3.10](https://www.python.org/downloads/) (latest stable release)
* [Node.js LTS](https://nodejs.org/en/download/)
* A text editor


### Setup
#### Linux/Mac (Bash)
In the `api/` directory, run:
```
python3 -m venv .venv
source .venv/bin/activate
```
#### Windows (CMD)
In the `api/` directory, run:
```
python -m venv .venv
.venv\Scripts\activate.bat
```
### Dependencies
Once the virtual environment is created and initalized, run
```
pip install fastapi sqlalchemy uvicorn
pip install "python-jose[cryptography]"
pip install "passlib[bcrypt]"
```
In the `ui/` directory, run:
```
npm install
npm i axios
```

## Development
After everything is installed, run in the `ui/` directory:
```
npm start
```
And, in another terminal in the `api/src/` directory (with the venv sourced), run:
```
uvicorn app:app --reload
```
Then, navigate to: http://127.0.0.1:3000 to view the web app.
http://127.0.0.1:8000/docs provides an overview of the API.
Both pages should automatically reload after any changes.
