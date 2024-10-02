import { useState } from "react";

import Slider from "../components/Slider";
import APISlider from "../components/APISlider.jsx";

export default function Home() {
  useState(() => {
    window.scrollTo(0,0);
  },[])
  return (
    <>
      <Slider />
      <APISlider />
    </>
  );
}
