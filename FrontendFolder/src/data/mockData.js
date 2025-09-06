export const mockData = {
  currencies: [
    { code: "USD", label: "USD - Dollars ($)" },
    { code: "EUR", label: "EUR - Euros (€)" },
    { code: "INR", label: "INR - Rupees (₹)" },
  ],
  clients: [
    {
      id: "c1",
      name: "Collabera - Collabera Inc",
      reqs: [
        {
          id: "OWNAL_234",
          title: "Application Development",
          stage: "Selected",
          talents: [
            { id: "t1", name: "Monika Goyal Test" },
            { id: "t2", name: "Shaili Khatri" },
            { id: "t3", name: "Ankit Sharma" },
          ],
        },
        {
          id: "CLK_12880",
          title: "Business Administrator",
          stage: "Selected",
          talents: [
            { id: "t4", name: "Rakesh Gupta" },
            { id: "t5", name: "Nisha Rao" },
          ],
        },
      ],
    },
    {
      id: "c2",
      name: "Acme Corp",
      reqs: [
        {
          id: "ACM_9910",
          title: "Full‑Stack Engineer",
          stage: "Selected",
          talents: [
            { id: "t6", name: "Priya Patel" },
            { id: "t7", name: "Daniel Wu" },
          ],
        },
      ],
    },
  ],
};