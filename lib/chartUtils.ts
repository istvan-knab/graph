import { cn } from "@/lib/utils"

export const AvailableChartColors = [
  "blue",
  "emerald",
  "purple",
  "amber",
  "red",
  "pink",
  "indigo",
  "slate",
  "lime",
  "green",
  "orange",
  "sky",
  "rose",
  "cyan",
  "violet",
  "fuchsia",
  "teal",
  "yellow",
  "gray",
  "zinc",
  "neutral",
  "stone",
] as const

export type AvailableChartColorsKeys = (typeof AvailableChartColors)[number]

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: "bg" | "stroke" | "fill",
): string => {
  const colorMap = {
    bg: {
      blue: "bg-blue-500",
      emerald: "bg-emerald-500",
      purple: "bg-purple-500",
      amber: "bg-amber-500",
      red: "bg-red-500",
      pink: "bg-pink-500",
      indigo: "bg-indigo-500",
      slate: "bg-slate-500",
      lime: "bg-lime-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      sky: "bg-sky-500",
      rose: "bg-rose-500",
      cyan: "bg-cyan-500",
      violet: "bg-violet-500",
      fuchsia: "bg-fuchsia-500",
      teal: "bg-teal-500",
      yellow: "bg-yellow-500",
      gray: "bg-gray-500",
      zinc: "bg-zinc-500",
      neutral: "bg-neutral-500",
      stone: "bg-stone-500",
    },
    stroke: {
      blue: "stroke-blue-500",
      emerald: "stroke-emerald-500",
      purple: "stroke-purple-500",
      amber: "stroke-amber-500",
      red: "stroke-red-500",
      pink: "stroke-pink-500",
      indigo: "stroke-indigo-500",
      slate: "stroke-slate-500",
      lime: "stroke-lime-500",
      green: "stroke-green-500",
      orange: "stroke-orange-500",
      sky: "stroke-sky-500",
      rose: "stroke-rose-500",
      cyan: "stroke-cyan-500",
      violet: "stroke-violet-500",
      fuchsia: "stroke-fuchsia-500",
      teal: "stroke-teal-500",
      yellow: "stroke-yellow-500",
      gray: "stroke-gray-500",
      zinc: "stroke-zinc-500",
      neutral: "stroke-neutral-500",
      stone: "stroke-stone-500",
    },
    fill: {
      blue: "fill-blue-500",
      emerald: "fill-emerald-500",
      purple: "fill-purple-500",
      amber: "fill-amber-500",
      red: "fill-red-500",
      pink: "fill-pink-500",
      indigo: "fill-indigo-500",
      slate: "fill-slate-500",
      lime: "fill-lime-500",
      green: "fill-green-500",
      orange: "fill-orange-500",
      sky: "fill-sky-500",
      rose: "fill-rose-500",
      cyan: "fill-cyan-500",
      violet: "fill-violet-500",
      fuchsia: "fill-fuchsia-500",
      teal: "fill-teal-500",
      yellow: "fill-yellow-500",
      gray: "fill-gray-500",
      zinc: "fill-zinc-500",
      neutral: "fill-neutral-500",
      stone: "fill-stone-500",
    },
  }

  return colorMap[type][color] || ""
}

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "dataMin" : minValue ?? 0
  const maxDomain = maxValue ?? "dataMax"

  return [minDomain, maxDomain]
}
