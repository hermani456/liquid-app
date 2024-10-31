"use client"
import { useEffect, useState } from "react";

// const page = async () => {
//   const { rows } = await pool.query(`SELECT w.*
// FROM workers w
// JOIN companies c ON w.company_id = c.id
// WHERE c.user_id = 'user_2o65kRnA588ZcfpttszO9Iv2RvA' AND w.company_id = 1;`);
//   return (
//     <div className="max-w-screen-lg mx-auto">
//       <div className="grid grid-cols-3 place-items-center h-screen p-20">
//         {rows.map((item) => (
//           <div key={item.id} className="">
//             <h1>
//               {item.name} {item.last_name}
//             </h1>
//             <p><strong>RUT:</strong> {item.rut}</p>
//             <p><strong>Sex:</strong> {item.sex === "M" ? "Hombre" : "Mujer"}</p>
//             <p><strong>Address:</strong> {item.home_address}</p>
//             <p><strong>Phone:</strong> {item.phone}</p>
//             <p><strong>Position:</strong> {item.position}</p>
//             <p><strong>Department:</strong> {item.department}</p>
//             <p><strong>Base Salary:</strong> {item.base_salary}</p>
//             <p><strong>Email:</strong> {item.email}</p>
//             <p><strong>Created At:</strong> {new Date(item.created_at).toLocaleString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default page;
const page =  () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetch("/api/workers");
    const data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return <div>page</div>;
};

export default page;
