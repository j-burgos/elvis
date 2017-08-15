var server = require('../server');
var ds = server.dataSources.db;

const createTestUsers = async (app) => {
  const users = [
    {
      email: 'admin@elvis.com',
      password: process.env.SUPERUSER_PASSWORD,
      role: 'admin'
    },
    {
      email: 'john@elvis.com',
      password: process.env.CUSTOMER_PASSWORD,
      role: 'customer'
    },
    {
      email: 'jane@elvis.com',
      password: process.env.CUSTOMER_PASSWORD,
      role: 'customer'
    }
  ]

  const User = app.models.user
  const Role = app.models.Role
  const RoleMapping = app.models.RoleMapping

  users.map(async (user) => {
    try {
      console.log(`Creating user ${user.email} with role ${user.role}...`)

      const [dbUser, dbUserCreated] =
        await User.findOrCreate({where: {email: user.email}}, user)

      const role = {name: user.role}
      const [dbRole, dbRoleCreated] =
        await Role.findOrCreate({where: {name: user.role}}, role)

      await dbRole.principals.create({
        principalType: RoleMapping.USER,
        principalId: dbUser.id
      })
    } catch (err) {
      console.log('Error creating user', user)
      console.error(err)
    }
  })
}

const createTestProducts = async (app) => {
  const products = [
    {
      name: "Coca Cola Lata 300ml",
      price: 0.55,
      stock: 20
    },
    {
      name: "Coca Cola Zero Lata 300ml",
      price: 0.75,
      stock: 15
    },
    {
      name: "Snickers",
      price: 0.80,
      stock: 10
    },
    {
      name: "Lays Bolsa",
      price: 0.45,
      stock: 20
    }
  ]

  const User = app.models.user
  const Product = app.models.Product

  products.map(async (product) => {
    try {
      const message =
        `Creating ${product.name} with price $${product.price} and ${product.stock} stock...`
      console.log(message)
      await Product.findOrCreate({where: {name: product.name}}, product)
    } catch (err) {
      console.log('Error creating product', product)
      console.error(err)
    }
  })
}

const createTestData = async (app) => {
  try {
    console.log('Creating test users...')
    await createTestUsers(app)
    console.log()

    console.log('Creating test products...')
    await createTestProducts(app)
    console.log()
  } catch (err) {
    console.error('asdasd' + err)
  }
}

createTestData(server)
.then(() => console.log('Completed'))
.catch(err => console.error(err))
