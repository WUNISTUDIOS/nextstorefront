DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
