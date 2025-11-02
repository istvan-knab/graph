"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  category: string;
  title: string;
  src: string;
  content: React.ReactNode;
};

type CardProps = {
  card: Card;
  index: number;
};

export const Card = ({ card, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    const plotName = card.title.toLowerCase().replace(/\s+/g, '-');
    window.location.href = `/plot/${plotName}`;
  };

  return (
    <div
      className="group relative h-[400px] w-[350px] overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 flex-shrink-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative h-full w-full">
        <img
          src={card.src}
          alt={card.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="mb-2 text-sm font-medium text-neutral-200">
            {card.category}
          </div>
          <h3 className="text-xl font-bold">{card.title}</h3>
        </div>
      </div>
      
      <div
        className={cn(
          "absolute inset-0 bg-white dark:bg-neutral-900 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          {card.content}
        </div>
      </div>
    </div>
  );
};

type CarouselProps = {
  items: React.ReactNode[];
};

export const Carousel = ({ items }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380; // Card width (350px) + gap (30px)
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => scrollElement.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  // Create infinite scroll by duplicating items
  const infiniteItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        
        <button
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {infiniteItems}
      </div>
    </div>
  );
};
