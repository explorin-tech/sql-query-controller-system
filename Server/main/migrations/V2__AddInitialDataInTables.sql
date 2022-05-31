CREATE TABLE "UserType"(
	"UT_ID" SERIAL PRIMARY KEY,
	"UT_Name" VARCHAR(2) NOT NULL
);

CREATE TABLE "User"(
	"U_ID" BIGSERIAL PRIMARY KEY,
	"U_FirstName" VARCHAR(30) NOT NULL,
	"U_LastName" VARCHAR(30) NOT NULL,
	"U_Email" VARCHAR(50) NOT NULL,
	"U_Password" VARCHAR(100),
	"U_UT_ID" SERIAL REFERENCES "UserType" ("UT_ID") ON DELETE CASCADE,
	"U_AddedOn"	TIMESTAMPTZ NOT NULL,
	"U_AddedBy" BIGSERIAL,
	"U_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"U_UpdatedBy" BIGSERIAL,
	"U_IsActive" BOOLEAN DEFAULT FALSE,
	"U_IsActDrtUser" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "MasterApplication"(
	"MA_ID" SERIAL PRIMARY KEY,
	"MA_Name" VARCHAR(200) NOT NULL UNIQUE,
	"MA_Owner1" BIGSERIAL REFERENCES "User" ("U_ID"),
	"MA_Owner2" BIGSERIAL REFERENCES "User" ("U_ID"),
	"MA_AddedOn" TIMESTAMPTZ NOT NULL,
	"MA_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"MA_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"MA_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "DataBaseType" (
	"DBT_ID" SERIAL PRIMARY KEY,
	"DBT_Name" VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE "DataBaseApplicationMapping"(
	"DBAM_ID" BIGSERIAL PRIMARY KEY,
	"DBAM_MA_ID" SERIAL REFERENCES "MasterApplication" ("MA_ID") ON DELETE CASCADE,
	"DBAM_DBName" VARCHAR(200) NOT NULL,
	"DBAM_DBT_ID" SERIAL REFERENCES "DataBaseType" ("DBT_ID") ON DELETE CASCADE,
	"DBAM_DBConnectionString" VARCHAR(500),
	"DBAM_DBPortNumber" INT,
	"DBAM_DBHostName" VARCHAR(500),
	"DBAM_DBUserName" VARCHAR(100),
	"DBAM_DBPassword" VARCHAR(500),
	"DBAM_AddedOn" TIMESTAMPTZ NOT NULL,
	"DBAM_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"DBAM_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"DBAM_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);


CREATE TABLE "ApplicationScreen"(
	"AS_ID" BIGSERIAL PRIMARY KEY,
	"AS_Name" VARCHAR(200) UNIQUE,
	"AS_AddedOn" TIMESTAMPTZ NOT NULL,
	"AS_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"AS_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"AS_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "ApplicationScreenRightsMapping"(
	"ASR_ID" BIGSERIAL PRIMARY KEY,
	"ASR_U_ID" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"ASR_AS_ID" BIGSERIAL REFERENCES "ApplicationScreen"("AS_ID") ON DELETE CASCADE,
	"ASR_RightToView" BOOLEAN DEFAULT FALSE,
	"ASR_RightToAdd" BOOLEAN DEFAULT FALSE,
	"ASR_RightToEdit" BOOLEAN DEFAULT FALSE,
	"ASR_RightToDelete" BOOLEAN DEFAULT FALSE,
	"ASR_AddedOn" TIMESTAMPTZ NOT NULL,
	"ASR_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"ASR_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"ASR_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "UserPermission"(
	"UP_ID" BIGSERIAL PRIMARY KEY,
	"UP_U_ID" BIGSERIAL REFERENCES "User"("U_ID")  ON DELETE CASCADE,
	"UP_DBAM_ID" BIGSERIAL REFERENCES "DataBaseApplicationMapping"("DBAM_ID") ON DELETE CASCADE,
	"UP_RightToRead" BOOLEAN DEFAULT FALSE,
	"UP_RightToCreate" BOOLEAN DEFAULT FALSE,
	"UP_RightToUpdate" BOOLEAN DEFAULT FALSE,
	"UP_RightToDelete" BOOLEAN DEFAULT FALSE,
	"UP_AddedOn" TIMESTAMPTZ NOT NULL,
	"UP_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"UP_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"UP_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "QueryStatus"(
	"QS_ID" SERIAL PRIMARY KEY,
	"QS_Name" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "Query"(
	"Q_ID" BIGSERIAL PRIMARY KEY,
	"Q_SysDefName" VARCHAR(200) NOT NULL,
	"Q_UserDefName" VARCHAR(200) NOT NULL,
	"Q_RawQuery" VARCHAR(1000) NOT NULL,
	"Q_QueryDesc" VARCHAR(500) NOT NULL,
	"Q_QS_ID" SERIAL REFERENCES "QueryStatus"("QS_ID"),
	"Q_DBAM_ID" BIGSERIAL REFERENCES "DataBaseApplicationMapping"("DBAM_ID") ON DELETE CASCADE,
	"Q_ExecutedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_LastExecutedOn" TIMESTAMPTZ,
	"Q_CreatedOn" TIMESTAMPTZ,
	"Q_CreatedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_UpdatedOn" TIMESTAMPTZ,
	"Q_UpdatedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_ApprovedOn" TIMESTAMPTZ,
	"Q_ApprovedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_AvgExeTime" INT,
	"Q_NoOfTimesExe" INT,
	"Q_AvgDataRowsAffected" INT,
	"Q_Comments" VARCHAR(1000),
	"Q_IsDrafed" BOOLEAN DEFAULT FALSE,
	"Q_IsDeleted" BOOLEAN DEFAULT FALSE,
	"Q_BackupTableName" VARCHAR(1000)
);

SELECT * FROM "D"

INSERT INTO "UserType"("UT_Name") VALUES('AD') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('RA') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('DV') ON CONFLICT DO NOTHING;

SELECT * FROM "UserType";

INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Jai', 'Soni', 'jai_s@me.iitr.ac.in', 'jai2201@2004', 1, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;
INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Himanshu', 'Gupta', 'himanshu_s@me.iitr.ac.in', 'jai2201@2004', 2, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;
INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Ram', 'Bansal', 'ram_s@me.iitr.ac.in', 'jai2201@2004', 3, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;

SELECT * FROM "User" ORDER BY "U_AddedOn" DESC;

INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('E-central Management', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('E-wealth Management', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('SQL-QCS', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;

SELECT * FROM "MasterApplication";

SELECT "MasterApplication"."MA_Name", "MasterApplication"."MA_Owner1", "MasterApplication"."MA_Owner2", "User"."U_FirstName", "User"."U_LastName"
FROM "MasterApplication"
LEFT JOIN "User"
ON "MasterApplication"."MA_Owner1" = "User"."U_ID";

INSERT INTO "DataBaseType" ("DBT_Name") VALUES('PRD') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('UAT') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('RND') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('DEV') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('OTH') ON CONFLICT DO NOTHING;

SELECT * FROM "DataBaseType";

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName","DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass' , NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_2', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_3', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'E-wealth Management', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'E-wealth Management', 'DB_2', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'SQL-QCS', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

SELECT * FROM "DataBaseApplicationMapping";

INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('User Window', NOW(), 1, NOW(), 1 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Master Application Window', NOW(), 1, NOW(), 1 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Database Mapping Window', NOW(), 1, NOW(), 1 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Query Window', NOW(), 1, NOW(), 1 ) ON CONFLICT DO NOTHING;

SELECT * FROM "ApplicationScreen" ORDER BY "AS_AddedOn" DESC;

SELECT * FROM "DataBaseApplicationMapping" ORDER BY "DataBaseApplicationMapping"."DBAM_AddedOn" DESC;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(1, 1, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(1, 2, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(1, 3, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(1, 4, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 1, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 2, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 3, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 4, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 1, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 2, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 3, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 4, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 3, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 4, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 5, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 6, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 7, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 3, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 4, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 5, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 6, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 7, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 3, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 4, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 5, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 6, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 7, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);

SELECT * FROM "DataBaseApplicationMapping"

SELECT "UserPermission"."UP_U_ID" , "DataBaseApplicationMapping"."DBAM_MA_ID", 
"DataBaseApplicationMapping"."DBAM_MA_Name", "DataBaseApplicationMapping"."DBAM_DBT_ID", 
"DataBaseApplicationMapping"."DBAM_DBT_Name", "DataBaseApplicationMapping"."DBAM_DBName", 
"UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", 
"UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete" 
FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON
"UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON
"UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = 1 AND "UserPermission"."UP_RightToRead" = TRUE;

SELECT "ApplicationScreenRightsMapping"."ASR_U_ID", "ApplicationScreen"."AS_Name",
"ApplicationScreenRightsMapping"."ASR_RightToView", "ApplicationScreenRightsMapping"."ASR_RightToAdd", 
"ApplicationScreenRightsMapping"."ASR_RightToEdit", "ApplicationScreenRightsMapping"."ASR_RightToDelete" 
FROM "ApplicationScreenRightsMapping" LEFT JOIN "ApplicationScreen" ON 
"ApplicationScreenRightsMapping"."ASR_AS_ID" = "ApplicationScreen"."AS_ID"  WHERE "ASR_U_ID" = 1;












CREATE TABLE "UserType"(
	"UT_ID" SERIAL PRIMARY KEY,
	"UT_Name" VARCHAR(2) NOT NULL
);

CREATE TABLE "User"(
	"U_ID" BIGSERIAL PRIMARY KEY,
	"U_FirstName" VARCHAR(30) NOT NULL,
	"U_LastName" VARCHAR(30) NOT NULL,
	"U_Email" VARCHAR(50) NOT NULL,
	"U_Password" VARCHAR(100),
	"U_UT_ID" SERIAL REFERENCES "UserType" ("UT_ID") ON DELETE CASCADE,
	"U_AddedOn"	TIMESTAMPTZ NOT NULL,
	"U_AddedBy" BIGSERIAL,
	"U_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"U_UpdatedBy" BIGSERIAL,
	"U_IsActive" BOOLEAN DEFAULT FALSE,
	"U_IsActDrtUser" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "MasterApplication"(
	"MA_ID" SERIAL PRIMARY KEY,
	"MA_Name" VARCHAR(200) NOT NULL UNIQUE,
	"MA_Owner1" BIGSERIAL REFERENCES "User" ("U_ID"),
	"MA_Owner2" BIGSERIAL REFERENCES "User" ("U_ID"),
	"MA_AddedOn" TIMESTAMPTZ NOT NULL,
	"MA_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"MA_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"MA_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "DataBaseType" (
	"DBT_ID" SERIAL PRIMARY KEY,
	"DBT_Name" VARCHAR(3) NOT NULL UNIQUE
);

CREATE TABLE "DataBaseApplicationMapping"(
	"DBAM_ID" BIGSERIAL PRIMARY KEY,
	"DBAM_MA_ID" SERIAL REFERENCES "MasterApplication" ("MA_ID") ON DELETE CASCADE,
	"DBAM_MA_Name" VARCHAR(200) REFERENCES "MasterApplication" ("MA_Name") ON DELETE CASCADE,
	"DBAM_DBName" VARCHAR(200) NOT NULL,
	"DBAM_DBT_ID" SERIAL REFERENCES "DataBaseType" ("DBT_ID") ON DELETE CASCADE,
	"DBAM_DBT_Name" VARCHAR(3) REFERENCES "DataBaseType" ("DBT_Name") ON DELETE CASCADE,
	"DBAM_DBConnectionString" VARCHAR(500),
	"DBAM_DBPortNumber" INT,
	"DBAM_DBHostName" VARCHAR(500),
	"DBAM_DBUserName" VARCHAR(100),
	"DBAM_DBPassword" VARCHAR(500),
	"DBAM_AddedOn" TIMESTAMPTZ NOT NULL,
	"DBAM_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"DBAM_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"DBAM_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);


CREATE TABLE "ApplicationScreen"(
	"AS_ID" BIGSERIAL PRIMARY KEY,
	"AS_Name" VARCHAR(200) UNIQUE,
	"AS_AddedOn" TIMESTAMPTZ NOT NULL,
	"AS_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"AS_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"AS_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "ApplicationScreenRightsMapping"(
	"ASR_ID" BIGSERIAL PRIMARY KEY,
	"ASR_U_ID" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"ASR_AS_ID" BIGSERIAL REFERENCES "ApplicationScreen"("AS_ID") ON DELETE CASCADE,
	"ASR_RightToView" BOOLEAN DEFAULT FALSE,
	"ASR_RightToAdd" BOOLEAN DEFAULT FALSE,
	"ASR_RightToEdit" BOOLEAN DEFAULT FALSE,
	"ASR_RightToDelete" BOOLEAN DEFAULT FALSE,
	"ASR_AddedOn" TIMESTAMPTZ NOT NULL,
	"ASR_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"ASR_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"ASR_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "UserPermission"(
	"UP_ID" BIGSERIAL PRIMARY KEY,
	"UP_U_ID" BIGSERIAL REFERENCES "User"("U_ID")  ON DELETE CASCADE,
	"UP_DBAM_ID" BIGSERIAL REFERENCES "DataBaseApplicationMapping"("DBAM_ID") ON DELETE CASCADE,
	"UP_RightToRead" BOOLEAN DEFAULT FALSE,
	"UP_RightToCreate" BOOLEAN DEFAULT FALSE,
	"UP_RightToUpdate" BOOLEAN DEFAULT FALSE,
	"UP_RightToDelete" BOOLEAN DEFAULT FALSE,
	"UP_AddedOn" TIMESTAMPTZ NOT NULL,
	"UP_AddedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL,
	"UP_UpdatedOn" TIMESTAMPTZ NOT NULL,
	"UP_UpdatedBy" BIGSERIAL REFERENCES "User" ("U_ID") NOT NULL
);

CREATE TABLE "QueryStatus"(
	"QS_ID" SERIAL PRIMARY KEY,
	"QS_Name" VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE "Query"(
	"Q_ID" BIGSERIAL PRIMARY KEY,
	"Q_SysDefName" VARCHAR(200) NOT NULL,
	"Q_UserDefName" VARCHAR(200) NOT NULL,
	"Q_RawQuery" VARCHAR(1000) NOT NULL,
	"Q_QueryDesc" VARCHAR(500) NOT NULL,
	"Q_QS_ID" SERIAL REFERENCES "QueryStatus"("QS_ID"),
	"Q_DBAM_ID" BIGSERIAL REFERENCES "DataBaseApplicationMapping"("DBAM_ID") ON DELETE CASCADE,
	"Q_ExecutedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_LastExecutedOn" TIMESTAMPTZ,
	"Q_CreatedOn" TIMESTAMPTZ,
	"Q_CreatedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_UpdatedOn" TIMESTAMPTZ,
	"Q_UpdatedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_ApprovedOn" TIMESTAMPTZ,
	"Q_ApprovedBy" BIGSERIAL REFERENCES "User"("U_ID") ON DELETE CASCADE,
	"Q_AvgExeTime" INT,
	"Q_NoOfTimesExe" INT,
	"Q_AvgDataRowsAffected" INT,
	"Q_Comments" VARCHAR(1000),
	"Q_IsDrafed" BOOLEAN DEFAULT FALSE,
	"Q_IsDeleted" BOOLEAN DEFAULT FALSE,
	"Q_BackupTableName" VARCHAR(1000)
);

INSERT INTO "UserType"("UT_Name") VALUES('AD') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('RA') ON CONFLICT DO NOTHING;
INSERT INTO "UserType"("UT_Name") VALUES('DV') ON CONFLICT DO NOTHING;

SELECT * FROM "UserType";

INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Jai', 'Soni', 'jai_s@me.iitr.ac.in', 'jai2201@2004', 1, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;
INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Himanshu', 'Gupta', 'himanshu_s@me.iitr.ac.in', 'jai2201@2004', 2, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;
INSERT INTO "User"("U_FirstName", "U_LastName", "U_Email", "U_Password", "U_UT_ID", "U_AddedOn", "U_AddedBy", "U_UpdatedOn", "U_UpdatedBy", "U_IsActive", "U_IsActDrtUser") VALUES('Ram', 'Bansal', 'ram_s@me.iitr.ac.in', 'jai2201@2004', 3, NOW(), 1, NOW() ,1, TRUE ,FALSE) ON CONFLICT DO NOTHING;

UPDATE "User"

SELECT * FROM "User" ORDER BY "U_AddedOn" DESC;

INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('E-central Management', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('E-wealth Management', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "MasterApplication"("MA_Name", "MA_Owner1", "MA_Owner2", "MA_AddedOn", "MA_AddedBy", "MA_UpdatedOn", "MA_UpdatedBy") VALUES('SQL-QCS', 2 , 1, NOW(), 1 , NOW(), 1) ON CONFLICT DO NOTHING;

SELECT * FROM "MasterApplication";

SELECT "MasterApplication"."MA_Name", "MasterApplication"."MA_Owner1", "MasterApplication"."MA_Owner2", "User"."U_FirstName", "User"."U_LastName"
FROM "MasterApplication"
LEFT JOIN "User"
ON "MasterApplication"."MA_Owner1" = "User"."U_ID";

INSERT INTO "DataBaseType" ("DBT_Name") VALUES('PRD') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('UAT') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('RND') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('DEV') ON CONFLICT DO NOTHING;
INSERT INTO "DataBaseType" ("DBT_Name") VALUES('OTH') ON CONFLICT DO NOTHING;

SELECT DISTINCT "DataBaseApplicationMapping"."DBAM_MA_ID" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON "UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = 1 AND "UserPermission"."UP_RightToRead" = TRUE;

SELECT * FROM "MasterApplication" WHERE "MasterApplication"."MA_ID" IN (SELECT DISTINCT "DataBaseApplicationMapping"."DBAM_MA_ID" FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON "UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = 1 AND "UserPermission"."UP_RightToRead" = TRUE
)


select * from "ApplicationScreen"

SELECT * FROM "DataBaseType";

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName","DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass' , NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_2', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(1, 'E-central Management', 'DB_3', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'E-wealth Management', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'E-wealth Management', 'DB_2', 2, 'UAT', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_MA_Name", "DBAM_DBName", "DBAM_DBT_ID", "DBAM_DBT_Name", "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName", "DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(2, 'SQL-QCS', 'DB_1', 1, 'PRD', 'connection string', 5432, 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', 'testuser', 'testpass', NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

SELECT * FROM "DataBaseApplicationMapping";

DELETE FROM "DataBaseApplicationMapping" WHERE "DataBaseApplicationMapping"."DBAM_ID" IN (9,10)

INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('User Window', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Master Application Window', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Database Mapping Window', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Query Window', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('Screen Rights', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreen"("AS_Name", "AS_AddedOn" , "AS_AddedBy", "AS_UpdatedOn", "AS_UpdatedBy") VALUES('User Permissions', NOW(), 12, NOW(), 12 ) ON CONFLICT DO NOTHING;

SELECT * FROM "User" LEFT JOIN "UserType" ON "UserType"."UT_ID" = "User"."U_UT_ID" ORDER BY "User"."U_AddedOn" DESC;

SELECT * FROM "ApplicationScreen" ORDER BY "AS_AddedOn" DESC;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 8, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 9, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 10, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 11, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 12, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(12, 13, TRUE, TRUE, TRUE, TRUE, NOW(), 12, NOW(), 12) ON CONFLICT DO NOTHING;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 1, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 2, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 3, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(2, 4, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 1, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 2, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 3, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;
INSERT INTO "ApplicationScreenRightsMapping"("ASR_U_ID", "ASR_AS_ID", "ASR_RightToView","ASR_RightToAdd" ,"ASR_RightToEdit" ,"ASR_RightToDelete" ,"ASR_AddedOn" ,"ASR_AddedBy" ,"ASR_UpdatedOn","ASR_UpdatedBy") VALUES(3, 4, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1) ON CONFLICT DO NOTHING;

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 3, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 4, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 5, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 6, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (1, 7, TRUE, TRUE, TRUE, TRUE, NOW(), 1, NOW(), 1);

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 3, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 4, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 5, TRUE, TRUE, TRUE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 6, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (2, 7, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);

INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 3, TRUE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 4, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 5, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 6, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);
INSERT INTO "UserPermission"("UP_U_ID" , "UP_DBAM_ID" , "UP_RightToRead", "UP_RightToCreate", "UP_RightToUpdate", "UP_RightToDelete", "UP_AddedOn", "UP_AddedBy", "UP_UpdatedOn", "UP_UpdatedBy") VALUES (3, 7, FALSE, FALSE, FALSE, FALSE, NOW(), 1, NOW(), 1);

SELECT * FROM "DataBaseApplicationMapping"


SELECT * FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON "DataBaseApplicationMapping"."DBAM_ID" = "UserPermission"."UP_DBAM_ID"  LEFT JOIN "MasterApplication" ON "DataBaseApplicationMapping"."DBAM_MA_ID" = "MasterApplication"."MA_ID" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "DBAM_DBT_ID" WHERE "UserPermission"."UP_U_ID" = 1 ORDER BY "UserPermission"."UP_AddedOn" DESC

UPDATE "UserPermission" SET "UP_RightToRead" = TRUE, "UP_RightToCreate" = TRUE, "UP_RightToUpdate" = TRUE, "UP_RightToDelete" = TRUE, "UP_UpdatedOn" = NOW() , "ASR_UpdatedBy" = 1 WHERE "UserPermission"."UP_U_ID"=1 AND "UserPermission"."UP_DBAM_ID"=2;




SELECT * FROM "User"

SELECT * FROM "ApplicationScreenRightsMapping" left join "ApplicationScreen" WHERE "ASR_U_ID" = $1

DELETE FROM

UPDATE "ApplicationScreenRightsMapping" SET 

UPDATE "ApplicationScreenRightsMapping" SET "ASR_RightToView" = TRUE, "ASR_RightToAdd" = FALSE, "ASR_RightToEdit" = FALSE, "ASR_RightToDelete" = FALSE, "ASR_UpdatedOn" = NOW() , "ASR_UpdatedBy" = 1 WHERE "ApplicationScreenRightsMapping"."ASR_U_ID"=1 AND "ApplicationScreenRightsMapping"."ASR_AS_ID"=1

UPDATE "ApplicationScreenRightsMapping" SET "ASR_RightToView" = TRUE, "ASR_RightToAdd" = TRUE, "ASR_RightToEdit" = TRUE, "ASR_RightToDelete" = TRUE, "ASR_UpdatedOn" = NOW() , "ASR_UpdatedBy" = 1 WHERE "ApplicationScreenRightsMapping"."ASR_U_ID"=1 AND "ApplicationScreenRightsMapping"."ASR_AS_ID"=2



UPDATE "ApplicationScreenRightsMapping" SET "ASR_RightToView" = $3, "ASR_RightToAdd" = $4, "ASR_RightToEdit" = $5, "ASR_RightToDelete" = $6, "ASR_UpdatedOn" = NOW() , "ASR_UpdatedBy" = $7 WHERE "ApplicationScreenRightsMapping"."ASR_U_ID"=$1 AND "ApplicationScreenRightsMapping"."ASR_AS_ID"=$2

DELETE FROM "ApplicationScreenRightsMapping" WHERE "ApplicationScreenRightsMapping"."ASR_U_ID" = 1

SELECT * FROM "User" LEFT JOIN "UserType" ON "User"."U_UT_ID" = "UserType"."UT_ID" WHERE "User"."U_ID" = 1;

SELECT * FROM "User"

DELETE FROM "User" WHERE "User"."U_ID" IN (14)

SELECT "UserPermission"."UP_U_ID" , "DataBaseApplicationMapping"."DBAM_MA_ID", "DataBaseApplicationMapping"."DBAM_DBT_ID",  "DataBaseApplicationMapping"."DBAM_DBName", 
"UserPermission"."UP_RightToRead", "UserPermission"."UP_RightToCreate", 
"UserPermission"."UP_RightToUpdate", "UserPermission"."UP_RightToDelete" 
FROM "UserPermission" LEFT JOIN "DataBaseApplicationMapping" ON
"UserPermission"."UP_DBAM_ID" = "DataBaseApplicationMapping"."DBAM_ID" LEFT JOIN "User" ON
"UserPermission"."UP_U_ID" = "User"."U_ID" WHERE "UserPermission"."UP_U_ID" = 12 AND "UserPermission"."UP_RightToRead" = TRUE;


delete from "UserPermission" where "UserPermission"."UP_U_ID" in (12, 13, 14, 15, 16, 17, 18)

select * from "UserPermission"
SELECT "ApplicationScreenRightsMapping"."ASR_U_ID", "ApplicationScreen"."AS_Name",
"ApplicationScreenRightsMapping"."ASR_RightToView", "ApplicationScreenRightsMapping"."ASR_RightToAdd", 
"ApplicationScreenRightsMapping"."ASR_RightToEdit", "ApplicationScreenRightsMapping"."ASR_RightToDelete" 
FROM "ApplicationScreenRightsMapping" LEFT JOIN "ApplicationScreen" ON 
"ApplicationScreenRightsMapping"."ASR_AS_ID" = "ApplicationScreen"."AS_ID"  WHERE "ASR_U_ID" = 12;

SELECT * FROM "User" LEFT JOIN "UserType" ON "User"."U_UT_ID" = "UserType"."UT_ID" WHERE "User"."U_ID" = 1;

SELECT * FROM "User" ORDER BY "User"."U_AddedOn" DESC;
UPDATE "MasterApplication" SET "MA_NAME" = $2, "MA_Owner1" = $3, "MA_Owner2" = $4, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=$5 WHERE "MA_ID"=$1;

UPDATE "User" SET "User"."U_FirstName" = 'Jai' , "User"."U_LastName" = 'SONI' , "User"."U_Email" = 'sjai260260@gmail.com', "User"."U_Password" = 'jai', "User"."U_UT_ID" = $6, "User"."U_UpdatedOn" = NOW(), "User"."U_UpdatedBy" = $7, "User"."U_IsActive" = $8, "User"."U_IsActDrtUser" = $9 WHERE "User"."U_ID" = $1;

UPDATE "MasterApplication" SET "MA_Name" = 'TEst APPLICATION', "MA_Owner1" = 1, "MA_Owner2" = 1, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=1 WHERE "MasterApplication"."MA_ID"=11;

UPDATE "DataBaseApplicationMapping" SET "DBAM_MA_ID" = 2 , "DBAM_MA_Name" = 'E-wealth Management', "DBAM_DBName" = 'DB_2', "DBAM_DBT_ID"=2, "DBAM_DBT_Name"='UAT', "DBAM_DBConnectionString"= 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', "DBAM_DBPortNumber"='testpass' , "DBAM_DBHostName"= 'test-db.c7csrrpjyten.ap-south-1.rds.amazonaws.com', "DBAM_DBUserName"= $10 , "DBAM_DBPassword" = $11, "DBAM_UpdatedOn"= NOW(), "DBAM_UpdatedBy"=$12 WHERE "DataBaseApplicationMapping"."DBAM_ID"=$1;

UPDATE "MasterApplication" SET "MA_Name" = 'Test Application 123', "MA_Owner1" = 1, "MA_Owner2" = 2, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=1 WHERE "MA_ID"=12;

SELECT * FROM "DataBaseApplicationMapping" LEFT JOIN "MasterApplication" ON "MasterApplication"."MA_ID" = "DataBaseApplicationMapping"."DBAM_MA_ID" LEFT JOIN "DataBaseType" ON "DataBaseType"."DBT_ID" = "DataBaseApplicationMapping"."DBAM_DBT_ID"  ORDER BY "DataBaseApplicationMapping"."DBAM_AddedOn" DESC

UPDATE "MasterApplication" SET "MA_Name" = 'OKKOK', "MA_Owner1" = 1, "MA_Owner2" = 1, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=1 WHERE "MA_ID"=11;

SELECT * FROM "MasterApplication" WHERE "MA_ID" = 1;
SELECT * FROM "User" LEFT JOIN "UserType" ON "User"."U_UT_ID" = "UserType"."UT_ID" WHERE "User"."U_ID" = 1;
SELECT * FROM "UserPermission" WHERE "UserPermission"."UP_U_ID" = 1 ORDER BY "UserPermission"."UP_AddedOn" DESC
SELECT * FROM "User" ORDER BY "User"."U_AddedOn" DESC;
DELETE FROM "User" WHERE "User"."U_ID" = 11;
UPDATE "MasterApplication" SET "MA_Name" = 'New Application 1', "MA_Owner1" = 1, "MA_Owner2" = 1, "MA_UpdatedOn"=NOW(), "MA_UpdatedBy"=1 WHERE "MA_ID"=13;

INSERT INTO "DataBaseApplicationMapping"("DBAM_MA_ID", "DBAM_DBName", "DBAM_DBT_ID",  "DBAM_DBConnectionString", "DBAM_DBPortNumber", "DBAM_DBHostName", "DBAM_DBUserName" ,"DBAM_DBPassword", "DBAM_AddedOn", "DBAM_AddedBy", "DBAM_UpdatedOn", "DBAM_UpdatedBy") VALUES(
	'3',
  	'DB_1',
  	'3',
  	'connnection',
  	'7777',
  	'host',
  	'user',
  	'pass',
	NOW(),
  	'1',
	NOW(),
  	'1'
  ) ON CONFLICT DO NOTHING;

SELECT * FROM "MasterApplication" JOIN "User" ON "User"."U_ID" = "MasterApplication"."MA_Owner1" JOIN "User" ON "User"."U_ID" = "MasterApplication"."MA_Owner2"

SELECT * FROM "ApplicationScreen";

select cust.customer_id,
      cust.firstname,
      cust.lastname,
      cust.birthdate,
      cust.residence_city_id,
      cust.notice_city_id,
      residence_city.name as residence_city_name,
      notice_city.name as notice_city_name
from customer cust
join city residence_city
on cust.residence_city_id=residence_city.city_id
join city notice_city
on cust.notice_city_id=notice_city.city_id;

select * from "ApplicationScreen"
delete from "ApplicationScreenRightsMapping" where "ApplicationScreenRightsMapping"."ASR_U_ID" = 12

select * from "MasterApplication"

select * from "DataBaseApplicationMapping"

select * from "User"

select * from "UserPermission"

select * from "ApplicationScreenRightsMapping"

select * from "DataBaseType"

DELETE FROM "User" WHERE "User"."U_ID" IN (1,2,3, 4, 5, 6, 7, 8, 9, 10, 11)
select * from "UserType"
