---
slug: using-intersection-observer-scroll-shadows
title: Using Intersection Observer to Create Scroll Shadows
authors: johnathan
tags: [react, intersection-observer]
---

### Using Intersection Observer to Create Scroll Shadows

#### Intersection Observer

The [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element.

#### A Component with Scroll Shadows

Here's a simple scrollable component.

```ts
export function Timeline() {
  return (
    <>
      <div className="relative">
        <div className="timeline-hidden-scrollbars relative flex gap-[6px] overflow-x-auto rounded-[3px] border border-solid border-timeline-border bg-timeline-background-100 p-1">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index}
              className="h-[30px] min-w-[30px] rounded-[2px] bg-yellow-300"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}
```

Link to video: [Simple component without scroll shadows](/video/using-intersection-observer-scroll-shadows/1.webm)

And with the Intersection Observer API we can create a shadow effect when the component is scrolled.

```ts
import { useScrollObservers } from "./hooks/useScrollObservers";

const ScrollShadowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="36"
    viewBox="0 0 35 36"
    className="absolute left-px z-10 h-full min-w-[30px]"
  >
    <path d="M0 36L35 36L35 0L0 0L0 36Z" fill="url(#g0)" />
    <defs>
      <linearGradient
        id="g0"
        x1="0"
        y1="13.9592"
        x2="35"
        y2="13.9592"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.109375" stopColor="#1F0C19" />
        <stop offset="0.494792" stopColor="#1F0C19" stopOpacity="0.9" />
        <stop offset="1" stopColor="#1F0C19" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

const ScrollShadowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="36"
    viewBox="0 0 35 36"
    className="absolute right-px top-0 z-10 h-full min-w-[30px] rotate-180"
  >
    <path d="M0 36L35 36L35 0L0 0L0 36Z" fill="url(#g1)" />
    <defs>
      <linearGradient
        id="g1"
        x1="0"
        y1="13.9592"
        x2="35"
        y2="13.9592"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.109375" stopColor="#1F0C19" />
        <stop offset="0.494792" stopColor="#1F0C19" stopOpacity="0.9" />
        <stop offset="1" stopColor="#1F0C19" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export function Timeline() {
  const {
    rootRef,
    leftScrollRef,
    rightScrollRef,
    isScrolledLeft,
    isScrolledRight,
  } = useScrollObservers();

  return (
    // intersection parent
    <div className={"relative"} ref={rootRef}>
      {isScrolledLeft && <ScrollShadowLeft />}

      <div className="timeline-hidden-scrollbars relative flex gap-[6px] overflow-x-auto rounded-[3px] border border-solid border-timeline-border bg-timeline-background-100 p-1">
        {/* intersection element */}
        <div className="-ml-1 h-[30px]" ref={leftScrollRef}></div>

        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="h-[30px] min-w-[30px] rounded-[2px] bg-yellow-300"
          ></div>
        ))}

        {/* intersection element */}
        <div className="-mr-1 h-[30px]" ref={rightScrollRef}></div>
      </div>

      {isScrolledRight && <ScrollShadowRight />}
    </div>
  );
}
```

And the useScrollObservers hook...

I'm using the [usehooks-ts](https://usehooks-ts.com/react-hook/use-intersection-observer) library for the useIntersectionObserver hook.

```ts
import { useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";

export const useScrollObservers = () => {
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const leftScrollEntry = useIntersectionObserver(leftScrollRef, {
    root: rootRef.current,
  });
  const rightScrollEntry = useIntersectionObserver(rightScrollRef, {
    root: rootRef.current,
  });

  const isScrolledLeft =
    leftScrollEntry && leftScrollEntry.intersectionRatio < 1;
  const isScrolledRight =
    rightScrollEntry && rightScrollEntry.intersectionRatio < 1;

  return {
    rootRef,
    leftScrollRef,
    rightScrollRef,
    isScrolledLeft,
    isScrolledRight,
  };
};
```

Link to video: [Component with scroll shadows](/video/using-intersection-observer-scroll-shadows/2.webm)
