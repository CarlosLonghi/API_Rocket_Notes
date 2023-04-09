const UserCreateService = require('./UserCreateService')

it("user should be create", async () => {
  const user = {
    name: "User Test",
    email: "user@test.com",
    password: "1234"
  }

  const userCreateService = new UserCreateService()
  const userCreated = await userCreateService.execute(user)

  expect(userCreated).toHaveProperty('id')
})