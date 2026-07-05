import { Sequelize } from "sequelize";

import UserModel from "./models/users.js";
import EventModel from "./models/events.js";

// SQLite DB (lokal + Render fallback)
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./db.db",
  logging: false,
});

// Models
export const User = UserModel(sequelize);
export const Event = EventModel(sequelize);

// Relations
User.hasMany(Event, { foreignKey: "organizerId" });
Event.belongsTo(User, { foreignKey: "organizerId" });

/**
 * Initialize database
 * IMPORTANT: explicit init instead of auto-running on import
 */
export async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");

    await sequelize.sync({ force: false });
    console.log("Database synced and ready");
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}
