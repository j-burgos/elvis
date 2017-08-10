require('dotenv').config()

var server = require('./server');
var ds = server.dataSources.db;

ds.automigrate(() => {
  createTestUsers(server)
    .then(() => console.log('done'))
    .catch(err => console.error(err))
})

async function createTestUsers(app) {
  const User = app.models.user
  const Role = app.models.Role
  const RoleMapping = app.models.RoleMapping

  try {
    const admin = await User.create({
      email: 'admin@elvis.com',
      password: process.env.SUPERUSER_PASSWORD
    })

    const customer = await User.create({
      email: 'customer@elvis.com',
      password: process.env.CUSTOMER_PASSWORD
    })

    const adminRole = await Role.create({name: 'admin'})
    const customerRole = await Role.create({name: 'customer'})

    await adminRole.principals.create({
      principalType: RoleMapping.USER,
      principalId: admin.id
    })

    await customerRole.principals.create({
      principalType: RoleMapping.USER,
      principalId: customer.id
    })

    console.log('done creating users')
  } catch (err) {
    console.error(err)
  }
}

