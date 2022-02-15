module.exports = {
  client: {
    include: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nomadcoffee-backend",
      // url:"https://nomad-coffee-backend-challenge.herokuapp.com/graphql"
      url: "http://localhost:4000/graphql",
    },
  },
};
