((input) => {
  const data = {};

  Object.entries(input).forEach(
    ([key, val]) => (data[key.toLowerCase()] = val)
  );
  console.log(data);
})([
  { Title: "a7a", Year: "2003" },
  {
    Title: "a7a",
    Year: "2003",
    ratings: [
      {
        Source: "test",
        Value: "test",
      },
      {
        Source: "test",
        Value: "test",
      },
      {
        Source: "test",
        Value: "test",
      },
    ],
  },
]);
