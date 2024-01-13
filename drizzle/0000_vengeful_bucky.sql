CREATE TABLE IF NOT EXISTS "accounts" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar(255),
	"access_token" varchar(255),
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" varchar(255),
	"session_state" varchar(255),
	CONSTRAINT accounts_provider_providerAccountId PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "activities" (
	"id" integer PRIMARY KEY NOT NULL,
	"label" varchar(255),
	"description" text,
	"cover" varchar(255),
	"location" varchar(255),
	"price" real NOT NULL,
	"visible" integer DEFAULT 1 NOT NULL,
	"discount" real DEFAULT 0,
	"capacity" integer NOT NULL,
	"activity_duration" integer NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"modifiedAt" timestamp DEFAULT now(),
	"categoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" integer PRIMARY KEY NOT NULL,
	"label" varchar(255),
	"details" text,
	"cover" varchar(255),
	"visible" integer DEFAULT 1,
	"createdAt" timestamp DEFAULT now(),
	"modifiedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" integer PRIMARY KEY NOT NULL,
	"filename" varchar(255),
	"size" integer,
	"createdAt" timestamp DEFAULT now(),
	"modifiedAt" timestamp DEFAULT now(),
	"activityId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"emailVerified" timestamp (3),
	"image" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verificationToken" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT verificationToken_identifier_token PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "activities" ADD CONSTRAINT "activities_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images" ADD CONSTRAINT "images_activityId_categories_id_fk" FOREIGN KEY ("activityId") REFERENCES "categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
