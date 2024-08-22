import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV ?? 'development';
export const envFilePath = `${process.cwd()}/src/configs/.${env}.env`;

dotenv.config({
  path: envFilePath,
});

function getEnvConfigs() {
  return {
    appName: process.env.NEST_APP_NAME ?? 'heygoody',
    dbURL: process.env.DATABASE_URL,
    dbName: process.env.DATABASE_NAME,
    env,
    insurers: {
      sompo: {
        apiBaseUrl: process.env.INS_SOMPO_API_URL,
        username: process.env.INS_SOMPO_USERNAME,
        password: process.env.INS_SOMPO_PASSWORD,
        path: {
          auth: process.env.INS_SOMPO_API_PATH_AUTH,
          createPolicy: process.env.INS_SOMPO_API_PATH_CREATE_POLICY,
        },
      },
      msig: {
        apiBaseUrl: process.env.INS_MSIG_API_URL,
        appId: process.env.INS_MSIG_APP_ID,
        secretKey: process.env.INS_MSIG_SECRET,
        agentCode: process.env.INS_MSIG_AGENT_CODE,
        path: {
          createPolicy: process.env.INS_MSIG_API_PATH_CREATE_POLICY,
          auth: process.env.INS_MSIG_API_PATH_AUTH,
          getFile: process.env.INS_MSIG_API_PATH_GET_FILE,
        },
        encryption: {
          key: process.env.INS_MSIG_ENCRYPTION_KEY,
          iv: process.env.INS_MSIG_ENCRYPTION_IV,
          salt: process.env.INS_MSIG_ENCRYPTION_SALT,
        },

        v1: {
          apiBaseUrl: process.env.INS_MSIG_API_URL,
          appId: process.env.INS_MSIG_APP_ID,
          secretKey: process.env.INS_MSIG_SECRET,
          agentCode: process.env.INS_MSIG_AGENT_CODE,
          path: {
            createPolicy: process.env.INS_MSIG_V1_API_PATH_CREATE_POLICY,
            auth: process.env.INS_MSIG_API_PATH_AUTH,
            getFile: process.env.INS_MSIG_API_PATH_GET_FILE,
          },
        },
      },
      kpi: {
        apiBaseUrl: process.env.INS_KPI_API_URL,
        path: {
          createPolicy: process.env.INS_KPI_API_PATH_SUBMIT,
          getFile:
            process.env.INS_KPI_API_PATH_GET_FILE ??
            '/public/policy/v2/travel-download',
        },
        publicKey: process.env.INS_KPI_API_PUBLIC_KEY,
        secretKey: process.env.INS_KPI_API_SECRET_KEY,
      },
    },
    s3: {
      bucket: process.env.S3_STORAGE_BUCKET,
      accessId: process.env.S3_STORAGE_ACCESS_ID,
      secretAccessId: process.env.S3_STORAGE_SECRET_ACCESS_KEY,
      location: process.env.S3_STORAGE_LOCATION,
    },
    saml: {
      issuer: process.env.SAML_ISSUER,
      callbackUrl: process.env.SAML_CALLBACK_URL,
      entryPoint: process.env.SAML_ENTRY_POINT,
      authnContext: [process.env.SAML_AUTH_N_CONTEXT],
      signatureAlgorithm: process.env.SAML_ALGORITHM,
      logoutUrl: process.env.SAML_LOGOUT_URL,
      logoutCallbackUrl: process.env.SAML_LOGOUT_CALLBACK_URL,
    },
    jwt: {
      accessTokenExpire: Number(process.env.CMS_ACCESS_TOKEN_EXPIRE ?? 60),
      RefreshTokenExpire: Number(process.env.CMS_REFRESH_TOKEN_EXPIRE ?? 1440),
    },
    cms: {
      signature_key:
        process.env.HEYGOODY_CMS_SIGNATURE_KEY ??
        `l6bu9rXs9v2mc3U74PtsZXCoKUQbJZGT`,
      signature_encode_key:
        process.env.HEYGOODY_CMS_SIGNATURE_ENCODE_KEY ?? `547E237D7B27353D`,
    },
  } as const;
}

export type ENVConfig = ReturnType<typeof getEnvConfigs>;

export default getEnvConfigs;
