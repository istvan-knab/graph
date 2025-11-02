"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function GraphIQCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20" style={{ backgroundColor: '#86B2AB' }}>
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans mb-8">
        Discover the power of graphIQ.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const PlotContent = ({ plotType, description }: { plotType: string; description: string }) => {
  return (
    <>
      {[...new Array(2).fill(1)].map((_, index) => {
        return (
          <div
            key={"plot-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                {plotType} Visualization
              </span>{" "}
              {description}
            </p>
            <div className="mt-6 flex justify-center">
              <div className="w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{plotType}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    id: 1,
    category: "Data Visualization",
    title: "Line Plot",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    content: <PlotContent plotType="Line Plot" description="Visualize data trends and patterns over time with smooth, interactive line charts. Perfect for time series analysis and trend identification." />,
  },
  {
    id: 2,
    category: "Statistical Analysis",
    title: "Box Plot",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    content: <PlotContent plotType="Box Plot" description="Analyze statistical distributions, identify outliers, and compare data sets with comprehensive box and whisker plots." />,
  },
  {
    id: 3,
    category: "Data Comparison",
    title: "Bar Plot",
    src: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
    content: <PlotContent plotType="Bar Plot" description="Compare values across different categories with clear, readable bar charts. Ideal for categorical data analysis and comparisons." />,
  },
  {
    id: 4,
    category: "Proportional Data",
    title: "Pie Plot",
    src: "https://images.unsplash.com/photo-1579226905180-636b76d96082?q=80&w=2070&auto=format&fit=crop",
    content: <PlotContent plotType="Pie Plot" description="Display proportional relationships and percentages with beautiful, interactive pie charts. Great for showing parts of a whole." />,
  },
  {
    id: 5,
    category: "Correlation Analysis",
    title: "Scatter Plot",
    src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
    content: <PlotContent plotType="Scatter Plot" description="Discover relationships and correlations between two variables with interactive scatter plots. Perfect for correlation analysis." />,
  },
  {
    id: 6,
    category: "Pattern Recognition",
    title: "Heatmap",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
    content: <PlotContent plotType="Heatmap" description="Display data density and patterns using color-coded heatmaps. Excellent for matrix data and pattern recognition." />,
  },
];
