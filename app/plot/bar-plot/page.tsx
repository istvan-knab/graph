"use client";

import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState, useRef } from 'react';

const SeabornBar = ({ data, xLabel, yLabel, yMin, yMax, style, xLabelSize, yLabelSize, xLabelPosition, yLabelPosition }: { data: any[], xLabel: string, yLabel: string, yMin: number, yMax: number, style: string, xLabelSize: number, yLabelSize: number, xLabelPosition: { x: number, y: number }, yLabelPosition: { x: number, y: number } }) => {
  const CustomBar = (props: any) => {
    const { payload, fill, x, y, width, height } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={payload.valueColor}
          rx={12}
          ry={12}
          stroke="#fff"
          strokeWidth={1}
        />
        <text
          x={x + width / 2}
          y={y - 10}
          textAnchor="middle"
          fontSize={28}
          fill="#333"
          fontWeight="500"
        >
          {payload.value}
        </text>
      </g>
    );
  };

  const CustomYLabel = () => {
    if (!yLabel) return null;
    return (
      <text
        x={20 + yLabelPosition.x}
        y={200 + yLabelPosition.y}
        textAnchor="middle"
        fontSize={yLabelSize}
        fill="#333"
        transform={`rotate(-90, ${20 + yLabelPosition.x}, ${200 + yLabelPosition.y})`}
      >
        {yLabel}
      </text>
    );
  };

  const CustomYLabelOnChart = () => {
    if (!yLabel) return null;
    return (
      <text
        x={40 + yLabelPosition.x}
        y={150 + yLabelPosition.y}
        textAnchor="middle"
        fontSize={yLabelSize}
        fill="#333"
        transform={`rotate(-90, ${40 + yLabelPosition.x}, ${150 + yLabelPosition.y})`}
        style={{ fontWeight: 'bold' }}
      >
        {yLabel}
      </text>
    );
  };

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="country" 
            tick={false}
            axisLine={{ stroke: '#333', strokeWidth: 4 }}
            tickLine={false}
            label={xLabel ? { value: xLabel, position: 'insideBottom', offset: -10 + xLabelPosition.y, style: { textAnchor: 'middle', fontSize: `${xLabelSize}px`, fill: '#333', fontWeight: 'bold', transform: `translate(${xLabelPosition.x}px, 0px)` } } : undefined}
          />
          <YAxis 
            tick={{ fontSize: 24, fill: '#333' }}
            axisLine={{ stroke: '#333', strokeWidth: 4 }}
            tickLine={{ stroke: '#333', strokeWidth: 4 }}
            domain={[yMin, yMax]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="value" 
            shape={<CustomBar />}
          />
          <CustomYLabelOnChart />
        </BarChart>
      </ResponsiveContainer>
      
        {/* Custom Y Label */}
        <CustomYLabel />
      
      {/* Seaborn-style Legend - Top Right */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div 
                className="w-6 h-6 rounded-sm"
                style={{ backgroundColor: item.valueColor }}
              />
                <span className="text-lg text-gray-700 font-medium">
                  {item.country}
                </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface DataCard {
  id: number;
  label: string;
  value: string;
  color: string;
}

export default function BarPlot() {
  const [cards, setCards] = useState<DataCard[]>([]);
  const [nextId, setNextId] = useState(1);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [yMin, setYMin] = useState(0);
  const [yMax, setYMax] = useState(100);
  const [style, setStyle] = useState('Default');
  const [xLabelSize, setXLabelSize] = useState(12);
  const [yLabelSize, setYLabelSize] = useState(12);
  const [xLabelPosition, setXLabelPosition] = useState({ x: 0, y: 0 });
  const [yLabelPosition, setYLabelPosition] = useState({ x: 0, y: 0 });
  const [fileName, setFileName] = useState('bar-chart');
  const chartRef = useRef<HTMLDivElement>(null);

  const addNewCard = () => {
    const newCard: DataCard = {
      id: nextId,
      label: '',
      value: '',
      color: '#3b82f6'
    };
    setCards([...cards, newCard]);
    setNextId(nextId + 1);
  };

  const updateCard = (id: number, field: 'label' | 'value' | 'color', newValue: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: newValue } : card
    ));
  };

  const removeCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const resetToDefault = () => {
    setXLabelPosition({ x: 0, y: 0 });
    setYLabelPosition({ x: 0, y: 0 });
    setXLabelSize(12);
    setYLabelSize(12);
    setXLabel('');
    setYLabel('');
    setYMin(0);
    setYMax(100);
    setStyle('Default');
  };

  const saveAsPNG = async () => {
    if (!chartRef.current) return;
    
    try {
      // Use html2canvas to capture the chart
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving PNG:', error);
      alert('Error saving PNG. Please try again.');
    }
  };

  const saveAsEPS = async () => {
    if (!chartRef.current) return;
    
    try {
      // For EPS, we'll use html2canvas to get the image data and convert it
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      // Convert canvas to blob and create EPS-like file
      canvas.toBlob((blob) => {
        if (blob) {
          const link = document.createElement('a');
          link.download = `${fileName}.eps`;
          link.href = URL.createObjectURL(blob);
          link.click();
          URL.revokeObjectURL(link.href);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error saving EPS:', error);
      alert('Error saving EPS. Please try again.');
    }
  };

  const saveAsPDF = async () => {
    if (!chartRef.current) return;
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const jsPDF = (await import('jspdf')).default;
      
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      // Get canvas dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Create PDF with A4 size and calculate scaling
      const pdf = new jsPDF({
        orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      // Calculate scaling to fit image in A4
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgAspectRatio = imgWidth / imgHeight;
      const pageAspectRatio = pageWidth / pageHeight;
      
      let finalWidth, finalHeight;
      if (imgAspectRatio > pageAspectRatio) {
        finalWidth = pageWidth;
        finalHeight = pageWidth / imgAspectRatio;
      } else {
        finalHeight = pageHeight;
        finalWidth = pageHeight * imgAspectRatio;
      }
      
      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/png');
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      
      // Save the PDF
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error saving PDF:', error);
      alert('Error saving PDF. Please try again.');
    }
  };

  // Transform cards data for chart - only include cards with both label and value
  const chartData = cards
    .filter(card => card.label.trim() !== '' && card.value.trim() !== '')
    .map(card => ({
      country: card.label,
      value: parseFloat(card.value) || 0,
      valueColor: card.color,
      [card.label]: parseFloat(card.value) || 0
    }));

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#86B2AB' }}>
      {/* Header Section */}
      <header className="pt-8 pb-6">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">
            <span className="text-white">Bar Plot</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            Compare categories easily with clear bar charts
          </p>
          <Link 
            href="/features"
            className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Back to Features
          </Link>
        </div>
      </header>

      {/* Chart and Controls Section */}
      <section className="px-4 pb-20">
        <div className="flex gap-4">
          {/* Chart */}
          <div 
            ref={chartRef}
            className="bg-white rounded-lg"
            style={{
              width: 'calc(75vw - 3.75cm)',
              height: 'calc((75vw - 3.75cm) * 9/16 + 4cm)',
              maxWidth: 'calc(75vw - 3.75cm)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <SeabornBar data={chartData} xLabel={xLabel} yLabel={yLabel} yMin={yMin} yMax={yMax} style={style} xLabelSize={xLabelSize} yLabelSize={yLabelSize} xLabelPosition={xLabelPosition} yLabelPosition={yLabelPosition} />
          </div>

          {/* Right Side Controls */}
          <div className="flex flex-col gap-4" style={{ width: '200px' }}>
            {/* Add Value Button */}
            <button
              onClick={addNewCard}
              className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-md"
            >
              Add Value
            </button>

            {/* Data Cards */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-lg border-2 border-gray-200 p-3 shadow-md"
                >
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Label
                      </label>
                      <input
                        type="text"
                        value={card.label}
                        onChange={(e) => updateCard(card.id, 'label', e.target.value)}
                        className="w-full px-2 py-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter label..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Value
                      </label>
                      <input
                        type="text"
                        value={card.value}
                        onChange={(e) => updateCard(card.id, 'value', e.target.value)}
                        className="w-full px-2 py-1 text-sm text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter value..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={card.color}
                          onChange={(e) => updateCard(card.id, 'color', e.target.value)}
                          className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
                        />
                        <span className="text-xs text-gray-600">{card.color}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeCard(card.id)}
                      className="w-full px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Column - Control Panel */}
          <div className="flex flex-col gap-4" style={{ width: '200px' }}>
            <div className="bg-white rounded-lg border-2 border-gray-200 p-3 shadow-md">
              <div className="space-y-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    X Label
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={xLabel}
                      onChange={(e) => setXLabel(e.target.value)}
                      className="flex-1 px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="X axis..."
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => setXLabelSize(Math.min(xLabelSize + 2, 24))}
                        className="px-1 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-t border border-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setXLabelSize(Math.max(xLabelSize - 2, 8))}
                        className="px-1 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-b border border-gray-300 border-t-0"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Y Label
                  </label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={yLabel}
                      onChange={(e) => setYLabel(e.target.value)}
                      className="flex-1 px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Y axis..."
                    />
                    <div className="flex flex-col">
                      <button
                        onClick={() => setYLabelSize(Math.min(yLabelSize + 2, 24))}
                        className="px-1 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-t border border-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => setYLabelSize(Math.max(yLabelSize - 2, 8))}
                        className="px-1 py-0.5 text-xs bg-gray-200 hover:bg-gray-300 rounded-b border border-gray-300 border-t-0"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Y Min
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={yMin}
                    onChange={(e) => setYMin(parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Y Max
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={yMax}
                    onChange={(e) => setYMax(parseFloat(e.target.value) || 100)}
                    className="w-full px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Style
                  </label>
                  <select 
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Default">Default</option>
                    <option value="Minimal">Minimal</option>
                    <option value="Dark">Dark</option>
                  </select>
                </div>
                
                {/* Joystick Controls */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        X Label Position
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setXLabelPosition({ ...xLabelPosition, x: xLabelPosition.x - 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setXLabelPosition({ ...xLabelPosition, x: xLabelPosition.x + 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          →
                        </button>
                        <button
                          onClick={() => setXLabelPosition({ ...xLabelPosition, y: xLabelPosition.y - 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => setXLabelPosition({ ...xLabelPosition, y: xLabelPosition.y + 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Y Label Position
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setYLabelPosition({ ...yLabelPosition, x: yLabelPosition.x - 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ←
                        </button>
                        <button
                          onClick={() => setYLabelPosition({ ...yLabelPosition, x: yLabelPosition.x + 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          →
                        </button>
                        <button
                          onClick={() => setYLabelPosition({ ...yLabelPosition, y: yLabelPosition.y - 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => setYLabelPosition({ ...yLabelPosition, y: yLabelPosition.y + 5 })}
                          className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border border-gray-300"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={resetToDefault}
                      className="w-full px-3 py-2 bg-gray-500 text-white text-xs font-medium rounded-md hover:bg-gray-600 transition-colors shadow-sm"
                    >
                      Default
                    </button>
                  </div>
                </div>
                
                {/* Save Buttons */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="space-y-2">
                    <button
                      onClick={saveAsPNG}
                      className="w-full px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-md hover:bg-green-600 transition-colors shadow-sm"
                    >
                      Save PNG
                    </button>
                    <button
                      onClick={saveAsEPS}
                      className="w-full px-3 py-2 bg-purple-500 text-white text-xs font-medium rounded-md hover:bg-purple-600 transition-colors shadow-sm"
                    >
                      Save EPS
                    </button>
                    <button
                      onClick={saveAsPDF}
                      className="w-full px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-md hover:bg-red-600 transition-colors shadow-sm"
                    >
                      Save PDF
                    </button>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        File Name
                      </label>
                      <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full px-2 py-1 text-xs text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="bar-chart"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
