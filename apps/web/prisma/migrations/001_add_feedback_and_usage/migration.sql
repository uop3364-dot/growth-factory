-- CreateTable: feedback
CREATE TABLE IF NOT EXISTS "feedback" (
    "id" TEXT NOT NULL,
    "feedback_type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT,
    "page_url" TEXT,
    "tool_name" TEXT,
    "selected_language" TEXT,
    "selected_platform" TEXT,
    "selected_topic" TEXT,
    "selected_tone" TEXT,
    "user_agent" TEXT,
    "viewport" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "priority" TEXT NOT NULL DEFAULT 'normal',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable: llm_usage_logs
CREATE TABLE IF NOT EXISTS "llm_usage_logs" (
    "id" TEXT NOT NULL,
    "tool" TEXT NOT NULL,
    "month_key" TEXT NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 0,
    "cost_usd" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "llm_usage_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "llm_usage_logs_tool_month_key_key" ON "llm_usage_logs"("tool", "month_key");
