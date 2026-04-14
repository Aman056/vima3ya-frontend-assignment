import { forwardRef } from "react";

const Section = forwardRef(({ id, title, children }, ref) => {
  return (
    <div 
      id={id} 
      ref={ref} 
      className="py-5 border-bottom" 
      style={{ minHeight: "60vh" }}
    >
      <h2 className="mb-4">{title}</h2>
      {children}
    </div>
  );
});

export default Section;