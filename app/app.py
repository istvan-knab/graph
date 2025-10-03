import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Set page config
st.set_page_config(
    page_title="Basic Streamlit App",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Main title
st.title("📊 Basic Streamlit Application")
st.markdown("Welcome to your basic Streamlit app! This demonstrates some common Streamlit features.")

# Sidebar
st.sidebar.header("Controls")
st.sidebar.markdown("Use the controls below to interact with the app.")

# Sidebar controls
sample_size = st.sidebar.slider("Sample Size", min_value=10, max_value=1000, value=100)
chart_type = st.sidebar.selectbox("Chart Type", ["Line Chart", "Bar Chart", "Scatter Plot"])
color_theme = st.sidebar.color_picker("Pick a color", "#1f77b4")

# Main content area
col1, col2 = st.columns(2)

with col1:
    st.header("📈 Data Visualization")
    
    # Generate sample data
    np.random.seed(42)
    data = pd.DataFrame({
        'x': np.arange(sample_size),
        'y': np.random.randn(sample_size).cumsum(),
        'category': np.random.choice(['A', 'B', 'C'], sample_size)
    })
    
    # Create chart based on selection
    fig, ax = plt.subplots(figsize=(10, 6))
    
    if chart_type == "Line Chart":
        ax.plot(data['x'], data['y'], color=color_theme, linewidth=2)
        ax.set_title("Sample Line Chart")
    elif chart_type == "Bar Chart":
        category_counts = data['category'].value_counts()
        ax.bar(category_counts.index, category_counts.values, color=color_theme)
        ax.set_title("Sample Bar Chart")
    else:  # Scatter Plot
        ax.scatter(data['x'], data['y'], c=color_theme, alpha=0.6)
        ax.set_title("Sample Scatter Plot")
    
    ax.set_xlabel("X-axis")
    ax.set_ylabel("Y-axis")
    plt.tight_layout()
    st.pyplot(fig)

with col2:
    st.header("📊 Data Table")
    
    # Display sample data
    st.dataframe(data.head(10), use_container_width=True)
    
    # Data statistics
    st.subheader("Data Statistics")
    st.write(f"**Total rows:** {len(data)}")
    st.write(f"**Mean Y value:** {data['y'].mean():.2f}")
    st.write(f"**Standard deviation:** {data['y'].std():.2f}")

# Additional features
st.header("🎛️ Interactive Features")

# Text input
user_input = st.text_input("Enter some text:", placeholder="Type something here...")
if user_input:
    st.success(f"You entered: {user_input}")

# File uploader
uploaded_file = st.file_uploader("Choose a file", type=['csv', 'txt', 'json'])
if uploaded_file is not None:
    st.info(f"File uploaded: {uploaded_file.name}")
    if uploaded_file.name.endswith('.csv'):
        df = pd.read_csv(uploaded_file)
        st.dataframe(df.head())

# Buttons
col3, col4, col5 = st.columns(3)

with col3:
    if st.button("🎲 Generate New Data"):
        st.rerun()

with col4:
    if st.button("📊 Show Info"):
        st.info("This is a basic Streamlit application demonstrating various widgets and features!")

with col5:
    if st.button("⚠️ Show Warning"):
        st.warning("This is a warning message!")

# Footer
st.markdown("---")
st.markdown("Built with ❤️ using Streamlit")
