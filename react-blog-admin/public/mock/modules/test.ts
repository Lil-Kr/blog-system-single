const testApi = {
  url: "/api/getUser",
  method: "get",
  response: () => {
    return {
      code: 200,
      message: "ok",
      data: ["tom", "jerry"]
    };
  }
}


export default []