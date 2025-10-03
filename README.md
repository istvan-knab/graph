# 📊 Graph Project

A comprehensive data visualization and analysis project featuring interactive Streamlit applications.

## 🚀 Project Overview

This repository contains a collection of data visualization tools and interactive web applications built with Streamlit. The project demonstrates modern data science workflows, interactive dashboards, and user-friendly interfaces for data analysis.

## 🎯 What's Inside

- **Interactive Web Applications** - Built with Streamlit for seamless user experience
- **Data Visualization Tools** - Multiple chart types and customizable visualizations
- **Modern UI/UX** - Clean, responsive design with intuitive controls
- **Extensible Architecture** - Easy to modify and extend for new features

## Features

- 📊 Interactive data visualization with matplotlib and seaborn
- 🎛️ Sidebar controls for customization
- 📈 Multiple chart types (line, bar, scatter)
- 📋 Data table display
- 📁 File upload functionality
- 🎨 Color picker for chart customization
- 📝 Text input and interactive buttons

## Quick Start

### Prerequisites
- Python 3.8 or higher
- uv (Ultra-fast Python package installer and resolver)

### Installation & Running Commands

1. **Navigate to the app directory:**
   ```bash
   cd app
   ```

2. **Install dependencies and run the Streamlit application:**
   ```bash
   uv sync
   uv run streamlit run app.py
   ```
   
   Or run it in one command:
   ```bash
   uv run --with streamlit streamlit run app.py
   ```
   
   uv will automatically:
   - Create a virtual environment if needed
   - Install all dependencies from pyproject.toml
   - Run the Streamlit application

4. **Access the application:**
   - The app will automatically open in your default browser
   - If it doesn't open automatically, go to: `http://localhost:8501`
   - The terminal will show the local and network URLs

### Alternative Running Commands

- **Run with specific port:**
  ```bash
  uv run streamlit run app.py --server.port 8502
  ```

- **Run with custom host:**
  ```bash
  uv run streamlit run app.py --server.address 0.0.0.0
  ```

- **Run in headless mode (no browser auto-open):**
  ```bash
  uv run streamlit run app.py --server.headless true
  ```

- **One-time install and run (without sync):**
  ```bash
  uv run --with streamlit streamlit run app.py
  ```

### Stopping the Application
- Press `Ctrl+C` in the terminal to stop the Streamlit server

## Usage

- Use the sidebar controls to adjust the sample size, chart type, and color
- Enter text in the text input field
- Upload CSV, TXT, or JSON files to see them displayed
- Click the buttons to trigger different actions
- The data table shows the first 10 rows of generated data
- Statistics are displayed below the data table

## File Structure

```
app/
├── app.py              # Main Streamlit application
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Dependencies

- streamlit: Web application framework
- pandas: Data manipulation and analysis
- numpy: Numerical computing
- matplotlib: Plotting library
- seaborn: Statistical data visualization
