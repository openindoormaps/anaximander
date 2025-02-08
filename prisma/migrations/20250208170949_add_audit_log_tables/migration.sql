-- CreateTable
CREATE TABLE "audit_log" (
    "id" SERIAL NOT NULL,
    "type_id" INTEGER NOT NULL,
    "meta_data" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(24) NOT NULL,
    "desc" VARCHAR(128) NOT NULL,
    "priority" INTEGER NOT NULL,
    "attributes" JSONB NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "audit_log_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
