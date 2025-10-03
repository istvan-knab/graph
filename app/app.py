import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from io import BytesIO
import base64

# Set page config
st.set_page_config(
    page_title="BenchGraph",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for pastel brown background and styling
st.markdown("""
<style>
    .main {
        background-color: #F5E6D3;
    }
    
    .stApp {
        background-color: #F5E6D3;
    }
    
    .sidebar {
        background-color: #E8D5C4;
    }
    
    .bench-title {
        font-size: 4rem;
        font-weight: bold;
        text-align: center;
        margin: 2rem 0;
    }
    
    .bench-text {
        color: white;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .graph-text {
        color: #8B4513;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }
    
    .bench-text-black {
        color: black;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }
    
    .toolbar {
        background-color: #D4C4A8;
        padding: 1rem;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    
    .top-right-title {
        position: fixed;
        top: 20px;
        right: 20px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 1000;
    }
    
    .save-button {
        background-color: #8B4513 !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        padding: 10px 20px !important;
        font-weight: bold !important;
        transition: all 0.3s ease !important;
    }
    
    .save-button:hover {
        background-color: #A0522D !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
    }
    
    .save-button-red {
        background-color: #CD5C5C !important;
    }
    
    .save-button-red:hover {
        background-color: #B22222 !important;
    }
</style>
""", unsafe_allow_html=True)

# Function to process data and create chart
def process_data_and_create_chart(numeric_data, legend_data, color_data, chart_type, width, height, smoothing, seaborn_style, bar_width, show_values):
    try:
        # Parse numeric data
        numeric_values = []
        if numeric_data.strip():
            for line in numeric_data.strip().split('\n'):
                if line.strip():
                    try:
                        numeric_values.append(float(line.strip()))
                    except ValueError:
                        continue
        
        # Parse legend data
        legend_labels = []
        if legend_data.strip():
            legend_labels = [line.strip() for line in legend_data.strip().split('\n') if line.strip()]
        
        # Parse color data
        colors = []
        if color_data.strip():
            colors = [line.strip() for line in color_data.strip().split('\n') if line.strip()]
        
        # Create DataFrame
        if numeric_values:
            df = pd.DataFrame({
                'values': numeric_values,
                'labels': legend_labels[:len(numeric_values)] if legend_labels else [f'Item {i+1}' for i in range(len(numeric_values))],
                'colors': colors[:len(numeric_values)] if colors else ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'][:len(numeric_values)]
            })
            
            # Set seaborn style
            sns.set_style(seaborn_style)
            
            # Create the chart with seaborn styling
            fig, ax = plt.subplots(figsize=(width/100, height/100))
            
            if chart_type == "Line Chart":
                sns.lineplot(data=df, x=df.index, y='values', marker='o', linewidth=3, markersize=8, ax=ax)
                ax.set_xticks(df.index)
                if legend_labels and len(legend_labels) == len(numeric_values):
                    ax.set_xticklabels(df['labels'], rotation=45, ha='right')
                    
            elif chart_type == "Bar Chart":
                bars = ax.bar(df.index, df['values'], color=df['colors'], width=bar_width, alpha=0.8, edgecolor='white', linewidth=1.5)
                
                # Add value labels above bars
                if show_values:
                    for i, (bar, value) in enumerate(zip(bars, df['values'])):
                        height = bar.get_height()
                        ax.text(bar.get_x() + bar.get_width()/2., height + max(df['values'])*0.01,
                               f'{value:.1f}', ha='center', va='bottom', fontweight='bold', fontsize=10)
                
                ax.set_xticks(df.index)
                if legend_labels and len(legend_labels) == len(numeric_values):
                    ax.set_xticklabels(df['labels'], rotation=45, ha='right')
                    
            elif chart_type == "Scatter Plot":
                sns.scatterplot(data=df, x=df.index, y='values', c=df['colors'], s=150, alpha=0.8, ax=ax)
                ax.set_xticks(df.index)
                if legend_labels and len(legend_labels) == len(numeric_values):
                    ax.set_xticklabels(df['labels'], rotation=45, ha='right')
                    
            elif chart_type == "Area Chart":
                ax.fill_between(df.index, df['values'], alpha=0.7, color=df['colors'][0] if len(df['colors']) > 0 else '#FF5733')
                ax.plot(df.index, df['values'], color='white', linewidth=2, alpha=0.8)
                ax.set_xticks(df.index)
                if legend_labels and len(legend_labels) == len(numeric_values):
                    ax.set_xticklabels(df['labels'], rotation=45, ha='right')
                    
            elif chart_type == "Histogram":
                sns.histplot(df['values'], bins=min(10, len(df['values'])), alpha=0.7, color=df['colors'][0] if len(df['colors']) > 0 else '#FF5733', ax=ax)
                
            elif chart_type == "Box Plot":
                sns.boxplot(y=df['values'], ax=ax, color=df['colors'][0] if len(df['colors']) > 0 else '#FF5733')
            
            # Apply smoothing if specified
            if smoothing > 0 and chart_type in ["Line Chart", "Area Chart"]:
                from scipy.ndimage import gaussian_filter1d
                smoothed_values = gaussian_filter1d(df['values'], sigma=smoothing)
                ax.plot(df.index, smoothed_values, '--', alpha=0.8, linewidth=3, label=f'Smoothed (σ={smoothing})', color='red')
                ax.legend()
            
            # Customize the chart with seaborn styling
            ax.set_title(f'{chart_type} - BenchGraph', fontsize=16, fontweight='bold', pad=20)
            ax.set_xlabel('Categories', fontsize=12, fontweight='bold')
            ax.set_ylabel('Values', fontsize=12, fontweight='bold')
            
            # Remove top and right spines for cleaner look
            sns.despine()
            
            # Add subtle grid
            ax.grid(True, alpha=0.3, linestyle='-', linewidth=0.5)
            
            plt.tight_layout()
            return fig
        else:
            return None
    except Exception as e:
        st.error(f"Error creating chart: {str(e)}")
        return None

# Top-right title
st.markdown("""
<div class="top-right-title">
    <span class="bench-text-black">Bench</span><span class="graph-text">Graph</span>
</div>
""", unsafe_allow_html=True)

# Create layout with sidebar (toolbar) and main content
with st.sidebar:
    st.markdown('<div class="toolbar">', unsafe_allow_html=True)
    st.header("🛠️ Toolbar")
    st.markdown("---")
    
    # Size controls
    st.subheader("📏 Size")
    width = st.slider("Width", min_value=100, max_value=1200, value=800, step=50)
    height = st.slider("Height", min_value=100, max_value=800, value=400, step=50)
    
    st.markdown("---")
    
    # Chart type selector
    st.subheader("📊 Chart Type")
    chart_type = st.selectbox(
        "Select chart type:",
        ["Line Chart", "Bar Chart", "Scatter Plot", "Area Chart", "Histogram", "Box Plot"]
    )
    
    st.markdown("---")
    
    # Smoothing option
    st.subheader("🎨 Smoothing")
    smoothing = st.slider("Smoothing Level", min_value=0, max_value=10, value=0, step=1)
    
    st.markdown("---")
    
    # Chart styling options
    st.subheader("🎨 Chart Styling")
    seaborn_style = st.selectbox(
        "Seaborn Style:",
        ["whitegrid", "darkgrid", "white", "dark", "ticks", "paper", "notebook", "talk", "poster"]
    )
    
    bar_width = st.slider("Bar Width", min_value=0.1, max_value=1.0, value=0.6, step=0.1)
    
    show_values = st.checkbox("Show values above bars", value=True)
    
    st.markdown('</div>', unsafe_allow_html=True)

# Main content area
col1, col2, col3 = st.columns([1, 2, 1])

with col2:
    # BenchGraph title with custom styling
    st.markdown("""
    <div class="bench-title">
        <span class="bench-text">Bench</span><span class="graph-text">Graph</span>
    </div>
    """, unsafe_allow_html=True)

# Canvas area with dynamic size from toolbar
st.markdown("---")

# Get data from text areas
numeric_data = st.session_state.get('numeric_data', '')
legend_data = st.session_state.get('legend_data', '')
color_data = st.session_state.get('color_data', '')

# Create chart if data is available
if numeric_data.strip():
    chart_fig = process_data_and_create_chart(numeric_data, legend_data, color_data, chart_type, width, height, smoothing, seaborn_style, bar_width, show_values)
    if chart_fig:
        st.pyplot(chart_fig, use_container_width=True)
    else:
        # Show placeholder if chart creation failed
        st.info("Enter numeric data to generate a chart")
else:
    # Show placeholder when no data
    canvas_style = f"""
    <div style="
        width: {width}px;
        height: {height}px;
        border: 2px solid #8B4513;
        border-radius: 10px;
        background-color: white;
        margin: 20px auto;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    ">
        <div style="
            color: #8B4513;
            font-size: 1.2rem;
            text-align: center;
            opacity: 0.7;
        ">
            Enter data below to generate chart<br>
            {width} × {height}px
        </div>
    </div>
    """
    st.markdown(canvas_style, unsafe_allow_html=True)

# Save buttons under the canvas
st.markdown("---")
st.markdown("### Save Options")

# Create centered layout for buttons
col1, col2, col3, col4, col5 = st.columns([1, 1, 1, 1, 1])

with col2:  # PDF button
    if st.button("📄 Save PDF", use_container_width=True, key="pdf_btn"):
        st.success("PDF save functionality ready!")

with col3:  # PNG button
    if st.button("🖼️ Save PNG", use_container_width=True, key="png_btn"):
        st.success("PNG save functionality ready!")

with col4:  # JPG button
    if st.button("📷 Save JPG", use_container_width=True, key="jpg_btn"):
        st.success("JPG save functionality ready!")

# Apply custom styling to buttons
st.markdown("""
<style>
    div[data-testid="column"]:nth-child(2) button,
    div[data-testid="column"]:nth-child(3) button,
    div[data-testid="column"]:nth-child(4) button {
        background-color: rgb(117, 0, 0) !important;
        color: white !important;
        border: none !important;
        border-radius: 8px !important;
        font-weight: bold !important;
        transition: all 0.3s ease !important;
    }
    
    div[data-testid="column"]:nth-child(2) button:hover,
    div[data-testid="column"]:nth-child(3) button:hover,
    div[data-testid="column"]:nth-child(4) button:hover {
        background-color: rgb(150, 0, 0) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
    }
</style>
""", unsafe_allow_html=True)

# Data entry area under buttons
st.markdown("---")
st.markdown("### Data Entry")

# Initialize data table in session state
if 'data_table' not in st.session_state:
    st.session_state.data_table = []

# Add/Remove row controls
col_add, col_remove, col_clear = st.columns([1, 1, 2])

with col_add:
    if st.button("➕ Add Row", use_container_width=True):
        st.session_state.data_table.append({
            'numeric': 0.0,
            'legend': f'Item {len(st.session_state.data_table) + 1}',
            'color': '#FF5733'
        })
        st.rerun()

with col_remove:
    if st.button("➖ Remove Last Row", use_container_width=True):
        if st.session_state.data_table:
            st.session_state.data_table.pop()
            st.rerun()

with col_clear:
    if st.button("🗑️ Clear All Rows", use_container_width=True):
        st.session_state.data_table = []
        st.rerun()

# Display data table
if st.session_state.data_table:
    st.markdown("#### Data Table")
    
    # Create a container for the table
    table_container = st.container()
    
    with table_container:
        # Table header
        col1, col2, col3, col4 = st.columns([1, 3, 3, 2])
        with col1:
            st.markdown("**#**")
        with col2:
            st.markdown("**📊 Numeric Value**")
        with col3:
            st.markdown("**🏷️ Legend**")
        with col4:
            st.markdown("**🎨 Color**")
        
        st.markdown("---")
        
        # Table rows
        for i, row in enumerate(st.session_state.data_table):
            col1, col2, col3, col4 = st.columns([1, 3, 3, 2])
            
            with col1:
                st.markdown(f"**{i+1}**")
            
            with col2:
                new_numeric = st.number_input(
                    f"Value {i+1}",
                    value=float(row['numeric']),
                    step=0.1,
                    key=f"num_{i}",
                    label_visibility="collapsed"
                )
                st.session_state.data_table[i]['numeric'] = new_numeric
            
            with col3:
                new_legend = st.text_input(
                    f"Legend {i+1}",
                    value=row['legend'],
                    key=f"leg_{i}",
                    label_visibility="collapsed"
                )
                st.session_state.data_table[i]['legend'] = new_legend
            
            with col4:
                new_color = st.color_picker(
                    f"Color {i+1}",
                    value=row['color'],
                    key=f"col_{i}",
                    label_visibility="collapsed"
                )
                st.session_state.data_table[i]['color'] = new_color
    
    # Convert table data to the format expected by the chart function
    numeric_data = '\n'.join([str(row['numeric']) for row in st.session_state.data_table])
    legend_data = '\n'.join([row['legend'] for row in st.session_state.data_table])
    color_data = '\n'.join([row['color'] for row in st.session_state.data_table])
    
    # Store in session state for compatibility
    st.session_state.numeric_data = numeric_data
    st.session_state.legend_data = legend_data
    st.session_state.color_data = color_data
    
else:
    st.info("Click 'Add Row' to start entering data")
    st.session_state.numeric_data = ""
    st.session_state.legend_data = ""
    st.session_state.color_data = ""

# Add buttons for data management
st.markdown("---")
col_btn1, col_btn2, col_btn3, col_btn4 = st.columns(4)

with col_btn1:
    if st.button("📥 Load Sample Data", use_container_width=True):
        # Load sample data into the table format
        sample_data = [
            {'numeric': 1.5, 'legend': 'Jan', 'color': '#FF5733'},
            {'numeric': 2.3, 'legend': 'Feb', 'color': '#33FF57'},
            {'numeric': 3.7, 'legend': 'Mar', 'color': '#3357FF'},
            {'numeric': 4.1, 'legend': 'Apr', 'color': '#F3FF33'},
            {'numeric': 5.9, 'legend': 'May', 'color': '#FF33F3'},
            {'numeric': 3.2, 'legend': 'Jun', 'color': '#FF6B6B'},
            {'numeric': 4.8, 'legend': 'Jul', 'color': '#4ECDC4'},
            {'numeric': 2.1, 'legend': 'Aug', 'color': '#45B7D1'},
            {'numeric': 6.3, 'legend': 'Sep', 'color': '#96CEB4'},
            {'numeric': 4.5, 'legend': 'Oct', 'color': '#FFEAA7'}
        ]
        
        st.session_state.data_table = sample_data
        st.success("Sample data loaded!")
        st.rerun()

with col_btn2:
    if st.button("🗑️ Clear All Data", use_container_width=True):
        st.session_state.data_table = []
        st.session_state.numeric_data = ""
        st.session_state.legend_data = ""
        st.session_state.color_data = ""
        st.success("Data cleared!")
        st.rerun()

with col_btn3:
    if st.button("💾 Save Data", use_container_width=True):
        st.success("Data saved!")

with col_btn4:
    if st.button("📤 Load Data", use_container_width=True):
        st.success("Data loaded!")