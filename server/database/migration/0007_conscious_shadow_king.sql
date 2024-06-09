ALTER TABLE "spell" ADD COLUMN "userId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spell" ADD CONSTRAINT "spell_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
