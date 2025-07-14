CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(100),
	"action" varchar(100) NOT NULL,
	"resource" varchar(100) NOT NULL,
	"resource_id" varchar(100),
	"details" text,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "banner_configs" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"project_id" varchar(100) NOT NULL,
	"config" jsonb NOT NULL,
	"version" integer DEFAULT 1,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "consents" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"project_id" varchar(100) NOT NULL,
	"session_id" varchar(255) NOT NULL,
	"ip_hash" varchar(64),
	"user_agent" text,
	"domain" varchar(255),
	"necessary" boolean DEFAULT true,
	"analytics" boolean DEFAULT false,
	"marketing" boolean DEFAULT false,
	"preferences" boolean DEFAULT false,
	"consent_timestamp" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "cookie_categories" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"project_id" varchar(100) NOT NULL,
	"name" varchar(50) NOT NULL,
	"display_name" varchar(200) NOT NULL,
	"description" text,
	"is_required" boolean DEFAULT false,
	"is_enabled" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"display_name" varchar(200) NOT NULL,
	"max_projects" integer DEFAULT 1 NOT NULL,
	"price" integer DEFAULT 0 NOT NULL,
	"features" jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	"domain" varchar(255) NOT NULL,
	"language" varchar(5) DEFAULT 'it',
	"is_active" boolean DEFAULT true,
	"banner_position" varchar(20) DEFAULT 'bottom',
	"banner_title" varchar(200) DEFAULT 'Utilizziamo i cookie',
	"banner_description" text DEFAULT 'Questo sito utilizza cookie per migliorare la tua esperienza di navigazione.',
	"banner_accept_text" varchar(100) DEFAULT 'Accetta tutti',
	"banner_reject_text" varchar(100) DEFAULT 'Rifiuta',
	"banner_customize_text" varchar(100) DEFAULT 'Personalizza',
	"banner_bg_color" varchar(7) DEFAULT '#ffffff',
	"banner_text_color" varchar(7) DEFAULT '#333333',
	"banner_accept_bg_color" varchar(7) DEFAULT '#4f46e5',
	"banner_accept_text_color" varchar(7) DEFAULT '#ffffff',
	"banner_reject_bg_color" varchar(7) DEFAULT '#6b7280',
	"banner_reject_text_color" varchar(7) DEFAULT '#ffffff',
	"floating_icon_enabled" boolean DEFAULT true,
	"floating_icon_position" varchar(20) DEFAULT 'bottom-right',
	"floating_icon_text" varchar(10) DEFAULT '🍪',
	"floating_icon_bg_color" varchar(7) DEFAULT '#4f46e5',
	"floating_icon_text_color" varchar(7) DEFAULT '#ffffff',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(100) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" varchar(45),
	"user_agent" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "tracking_scripts" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"project_id" varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	"category" varchar(50) NOT NULL,
	"script_code" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(100) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"company" varchar(200),
	"role" varchar(20) DEFAULT 'client' NOT NULL,
	"plan_id" varchar(50),
	"is_active" boolean DEFAULT true,
	"email_verified" boolean DEFAULT false,
	"last_login" timestamp,
	"projects_used" integer DEFAULT 0,
	"api_calls_this_month" integer DEFAULT 0,
	"last_api_reset" timestamp,
	"created_by" varchar(100),
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "banner_configs" ADD CONSTRAINT "banner_configs_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consents" ADD CONSTRAINT "consents_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cookie_categories" ADD CONSTRAINT "cookie_categories_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tracking_scripts" ADD CONSTRAINT "tracking_scripts_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;