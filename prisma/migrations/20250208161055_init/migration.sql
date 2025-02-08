-- CreateTable
CREATE TABLE "buildings" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '64',
    "desc" VARCHAR(255) NOT NULL DEFAULT '128',
    "address" JSONB NOT NULL,
    "attributes" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floors" (
    "id" SERIAL NOT NULL,
    "building_id" INTEGER NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "desc" VARCHAR(128) NOT NULL,
    "elevation" BIGINT NOT NULL,
    "floor_map" VARCHAR(1024) NOT NULL,
    "attributes" JSONB NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "floors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "floors" ADD CONSTRAINT "floors_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
