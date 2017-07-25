module.exports = {
  async up({ sequelize }) {
    const query = `
      CREATE TABLE users (
        id serial
        PRIMARY KEY,
        email character varying(254)
        UNIQUE
        NOT NULL,
        password character(60),
        name character varying(64),
        confirmed boolean
        DEFAULT false
        NOT NULL,
        active boolean
        DEFAULT false
        NOT NULL,
        created_at timestamp
        DEFAULT now()
        NOT NULL,
        deleted_at timestamp
      );
    `;

    await sequelize.query(query);
  },
  async down({ sequelize }) {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const query = 'DROP TABLE users;';

    await sequelize.query(query);
  }
};
