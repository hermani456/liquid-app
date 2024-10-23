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
  return <button className="absolute inset-0" onClick={handleClick}>Button</button>;
};

export default Button;
