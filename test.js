const assert = require("assert");

describe("socket-broker", () => {
  it("should require", () => {
    const Broker = require("./index");

    assert.equal(Broker.Broker.name, "Broker");
    assert.equal(Broker.Session.name, "Session");
  });
});
