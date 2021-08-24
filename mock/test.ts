export default [
  {
    url: "/mock/getUser",
    method: "GET",
    response: () => {
      return {
        code: 0,
        message: "ok",
        result: ["jiang", "junfeng"],
      };
    },
  }
]
