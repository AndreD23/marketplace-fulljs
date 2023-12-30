db = db.getSiblingDB('admin');

db.auth('root', 'example')

db = db.getSiblingDB('marketplace');

db.createUser(
  {
    user: "market",
    pwd: "place",
    roles: [
      {
        role: "readWrite",
        db: "marketplace"
      }
    ]
  }
);

db.createCollection('states')

// Insert Brasilian States
db.states.insertMany([
  {
    "name": "Acre",
    "abbreviation": "AC"
  },
  {
    "name": "Alagoas",
    "abbreviation": "AL"
  },
  {
    "name": "Amapá",
    "abbreviation": "AP"
  },
  {
    "name": "Amazonas",
    "abbreviation": "AM"
  },
  {
    "name": "Bahia",
    "abbreviation": "BA"
  },
  {
    "name": "Ceará",
    "abbreviation": "CE"
  },
  {
    "name": "Distrito Federal",
    "abbreviation": "DF"
  },
  {
    "name": "Espírito Santo",
    "abbreviation": "ES"
  },
  {
    "name": "Goiás",
    "abbreviation": "GO"
  },
  {
    "name": "Maranhão",
    "abbreviation": "MA"
  },
  {
    "name": "Mato Grosso",
    "abbreviation": "MT"
  },
  {
    "name": "Mato Grosso do Sul",
    "abbreviation": "MS"
  },
  {
    "name": "Minas Gerais",
    "abbreviation": "MG"
  },
  {
    "name": "Pará",
    "abbreviation": "PA"
  },
  {
    "name": "Paraíba",
    "abbreviation": "PB"
  },
  {
    "name": "Paraná",
    "abbreviation": "PR"
  },
  {
    "name": "Pernambuco",
    "abbreviation": "PE"
  },
  {
    "name": "Piauí",
    "abbreviation": "PI"
  },
  {
    "name": "Rio de Janeiro",
    "abbreviation": "RJ"
  },
  {
    "name": "Rio Grande do Norte",
    "abbreviation": "RN"
  },
  {
    "name": "Rio Grande do Sul",
    "abbreviation": "RS"
  },
  {
    "name": "Rondônia",
    "abbreviation": "RO"
  },
  {
    "name": "Roraima",
    "abbreviation": "RR"
  },
  {
    "name": "Santa Catarina",
    "abbreviation": "SC"
  },
  {
    "name": "São Paulo",
    "abbreviation": "SP"
  },
  {
    "name": "Sergipe",
    "abbreviation": "SE"
  },
  {
    "name": "Tocantins",
    "abbreviation": "TO"
  }
])

// Get ID from SP state
const sp = db.states.findOne({abbreviation: "SP"})

db.createCollection('users');

db.users.insertMany([
  {
    "name": "André Dorneles",
    "email": "andre@imperiosoft.com.br",
    "state": sp._id,
    "passwordHash": "$2b$10$CMq6dKzWACOPQMfDK60lreFkm9h.roD1EMyMk6FcAD9MiyFUm6cZO",
    "role": "admin",
    "status": "active",
  },
  {
    "name": "Usuário Teste",
    "email": "user@example.com",
    "state": sp._id,
    "passwordHash": "$2b$10$CMq6dKzWACOPQMfDK60lreFkm9h.roD1EMyMk6FcAD9MiyFUm6cZO",
    "role": "admin",
    "status": "active",
  }
])
