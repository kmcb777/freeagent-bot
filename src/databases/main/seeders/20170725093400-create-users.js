const table = 'users'

const insertValues = [
  {
    id: 1,
    email: 'test-user-1@derniercri.io',
    password: '$2a$12$unGqbYf9FooXRuc8VdbVoOI1Afcc4zYAHpeBIftYIDRRw6Uzic4K.'
  },
  {
    id: 2,
    email: 'test-user-2@derniercri.io',
    password: '$2a$12$opylWFdj8javmp42hfCKdOiauAdGd3gYdnQWRmCp12bBDhlKax9vS'
  },
  {
    id: 3,
    email: 'test-user-3@derniercri.io',
    password: '$2a$12$tOgM67gply3VKhal3ysO1.y5gDsLObjVa.xx9WRGwEdqrbgls.3/2'
  }
]

const deleteValues = insertValues.map(({ id }) => id)

module.exports = {
  async up(queryInterface) {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    await queryInterface.bulkDelete(table, { id: deleteValues })

    await queryInterface.bulkInsert(table, insertValues)
  },
  async down(queryInterface) {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    await queryInterface.bulkDelete(table, { id: deleteValues })
  }
}
