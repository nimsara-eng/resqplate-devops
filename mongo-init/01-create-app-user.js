// Runs once, only when MongoDB starts with an empty data volume.
// The official mongo image executes files in /docker-entrypoint-initdb.d
// as the root user, so the app user can be created here.
//
// Required env vars (from backend/.env.mongo):
//   MONGO_INITDB_DATABASE  - app database name (e.g. resqplate)
//   MONGO_APP_USERNAME     - app user name (e.g. resqplate_app)
//   MONGO_APP_PASSWORD     - app user password

const dbName = process.env.MONGO_INITDB_DATABASE;
const appUser = process.env.MONGO_APP_USERNAME;
const appPassword = process.env.MONGO_APP_PASSWORD;

if (!dbName || !appUser || !appPassword) {
  throw new Error(
    "MONGO_INITDB_DATABASE, MONGO_APP_USERNAME and MONGO_APP_PASSWORD must be set in .env.mongo"
  );
}

const appDb = db.getSiblingDB(dbName);

if (appDb.getUser(appUser)) {
  print(`User '${appUser}' already exists in '${dbName}', skipping.`);
} else {
  appDb.createUser({
    user: appUser,
    pwd: appPassword,
    roles: [{ role: "readWrite", db: dbName }],
  });
  print(`Created user '${appUser}' with readWrite on '${dbName}'.`);
}
