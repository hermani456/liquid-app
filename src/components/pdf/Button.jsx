"use client";

const Button = () => {
  const handleClick = async () => {
    const response = await fetch("/api/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    alert(data);
  };
  return <button className="px-5 py-2 bg-red-500 text-white rounded-md" onClick={handleClick}>Convert PDF</button>;
};

export default Button;
