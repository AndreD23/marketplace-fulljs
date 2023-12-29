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

db.createCollection('users');
