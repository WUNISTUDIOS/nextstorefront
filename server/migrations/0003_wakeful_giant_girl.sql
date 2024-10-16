ALTER TABLE "user" ADD COLUMN "twoFactorEnabled" boolean;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "twoFactorSecret" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "twoFactorVerified" boolean;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role";