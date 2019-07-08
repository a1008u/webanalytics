import dotenv from 'dotenv'

dotenv.config();
let path: string;
switch (process.env.NODE_ENV) {
  case "dev":
  case "local_dev":
    path = `${__dirname}/../../webpack/dev/.env/.env.dev`;
    break;
  case "staging":
    path = `${__dirname}/../../webpack/staging/.env/.env.dev`;
    break;
  case "production":
    path = `${__dirname}/../../webpack/production/.env/.env.dev`;
    break;
  default:
    path = `${__dirname}/../../webpack/dev/.env/.env.dev`;
    break;
}
dotenv.config({ path: path });

export const IMPLEMENTORJSACCESSURL: string =
  process.env.NODE_ENV === "dev"
    ? process.env.IMPLEMENTORJSACCESSURL
    : process.env.LOCALIMPLEMENTORJSACCESSURL;
export const DATALYACCESSURL: string =
  process.env.NODE_ENV === "dev"
    ? process.env.DATALYACCESSURL
    : process.env.LOCALDATALYACCESSURL;
