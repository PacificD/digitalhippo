"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const navRef = useRef<HTMLDivElement | null>(null);
  const handleOpen = (index: number) =>
    setActiveIndex((activeIndex) => (activeIndex === index ? -1 : index));

  useOnClickOutside(navRef, () => setActiveIndex(-1));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(-1);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => (
        <NavItem
          key={category.value}
          category={category}
          isOpen={i === activeIndex}
          isOtherOpened={activeIndex !== -1}
          handleOpen={() => handleOpen(i)}
        />
      ))}
    </div>
  );
};

export default NavItems;
