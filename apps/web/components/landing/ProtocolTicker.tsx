import { motion } from "motion/react";

export function ProtocolTicker() {
  const tickerContent =
    "HYDRATION SUPPORT // CLEAN ENERGY SUBSTRATE // FULL COGNITIVE STACK // CALM RESPONSE // FLOW-STATE // ";

  return (
    <div className="relative" style={{ backgroundColor: "#0B0B0B" }}>
      {/* Founder Directive */}
      <div className="relative flex items-center justify-center py-12 md:py-20 lg:py-[100px]">
        {/* Left bracket */}
        <div
          className="hidden md:block absolute left-[15%] top-1/2 -translate-y-1/2"
          style={{
            fontSize: "80px",
            lineHeight: "1",
            fontWeight: "100",
            color: "#00FFFF",
          }}
        >
          [
        </div>

        {/* Main text */}
        <div className="max-w-4xl px-8 text-center">
          <p
            className="text-white"
            style={{
              fontFamily: "Source Sans Pro, sans-serif",
              fontSize: "32px",
              fontWeight: "300",
              lineHeight: "1.4",
            }}
          >
            We aren't in the business of exhaustion; we are in the business of
            Sustained Clarity.
          </p>
        </div>
      </div>
    </div>
  );
}
