export const USER_TYPES_FIELD_NAME = 'UT_Name';

export const USER_TYPES = {
  ADMIN: 'AD',
  APPLICATION_OWNER: 'RA',
  DEV: 'DV',
};

export const USER_TYPE_ID_MAPPING = {
  AD: 1,
  RA: 2,
  DV: 3,
};

export const USER = {
  U_ID: 'U_ID',
  U_FirstName: 'U_FirstName',
  U_LastName: 'U_LastName',
  U_Email: 'U_Email',
  U_Password: 'U_Password',
  U_UT_ID: 'U_UT_ID',
  U_AddedOn: 'U_AddedOn',
  U_AddedBy: 'U_AddedBy',
  U_UpdatedOn: 'U_UpdatedOn',
  U_UpdatedBy: 'U_UpdatedBy',
  U_IsActive: 'U_IsActive',
  U_IsActDrtUser: 'U_IsActDrtUser',
};

export const APPLICATION = {
  MA_ID: 'MA_ID',
  MA_Name: 'MA_Name',
  MA_Owner1: 'MA_Owner1',
  MA_Owner2: 'MA_Owner2',
};

export const DATABASE_APPLICATION_MAPPING = {
  DBAM_ID: 'DBAM_ID',
  DBAM_MA_ID: 'DBAM_MA_ID',
  DBAM_MA_Name: 'DBAM_MA_Name',
  DBAM_DBName: 'DBAM_DBName',
  DBAM_DBT_ID: 'DBAM_DBT_ID',
  DBAM_DBT_Name: 'DBAM_DBT_Name',
  DBAM_DBConnectionString: 'DBAM_DBConnectionString',
  DBAM_DBPortNumber: 'DBAM_DBPortNumber',
  DBAM_DBHostName: 'DBAM_DBHostName',
  DBAM_DBUserName: 'DBAM_DBUserName',
  DBAM_DBPassword: 'DBAM_DBPassword',
  DBAM_AddedOn: 'DBAM_AddedOn',
  DBAM_AddedBy: 'DBAM_AddedBy',
  DBAM_UpdatedOn: 'DBAM_UpdatedOn',
  DBAM_UpdatedBy: 'DBAM_UpdatedBy',
};

export const DATABASE_TYPES = [
  {
    id: 1,
    name: 'PRD',
  },
  {
    id: 2,
    name: 'UAT',
  },
  {
    id: 3,
    name: 'RND',
  },
  {
    id: 4,
    name: 'DEV',
  },
  {
    id: 5,
    name: 'OTH',
  },
];

export const APPLICATION_SCREENS = [
  {
    id: 1,
    name: 'User Window',
  },
  {
    id: 2,
    name: 'Master Application Window',
  },
  {
    id: 3,
    name: 'Database Mapping Window',
  },
  {
    id: 4,
    name: 'Query Window',
  },
];
