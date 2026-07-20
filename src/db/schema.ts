import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  eventType: varchar("event_type", { length: 80 }).notNull(),
  eventDate: varchar("event_date", { length: 40 }),
  location: varchar("location", { length: 160 }),
  budget: varchar("budget", { length: 80 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  couple: varchar("couple", { length: 160 }).notNull(),
  event: varchar("event", { length: 160 }).notNull(),
  location: varchar("location", { length: 160 }).notNull(),
  quote: text("quote").notNull(),
  rating: integer("rating").default(5).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
