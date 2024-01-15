ALTER TABLE "accounts" DROP CONSTRAINT "accounts_provider_providerAccountId";--> statement-breakpoint
ALTER TABLE "verificationToken" DROP CONSTRAINT "verificationToken_identifier_token";--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId");--> statement-breakpoint
ALTER TABLE "verificationToken" ADD CONSTRAINT "verificationToken_identifier_token_pk" PRIMARY KEY("identifier","token");