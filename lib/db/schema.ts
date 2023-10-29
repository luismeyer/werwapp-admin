import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const songs = mysqlTable("songs", {
  id: int("id").primaryKey().autoincrement(),
  type: mysqlEnum("type", ["day", "night"]),
  artist: varchar("artist", { length: 50 }).notNull(),
  title: varchar("title", { length: 50 }).notNull(),
  songPage: varchar("songPage", { length: 255 }).notNull(),
  songUrl: varchar("songUrl", { length: 255 }).notNull(),
});
