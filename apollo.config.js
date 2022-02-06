module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      url: "http://localhost:4000/graphql",
    },
  },
};
