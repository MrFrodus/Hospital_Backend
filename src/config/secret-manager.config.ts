import { fetchSecrets } from "../fetch-secrets";

export default async () => {
  const secrets = await fetchSecrets("Hospital_bk");

  return {
    aws_bucket_name: secrets.AWS_BUCKET_NAME,
    aws_region: secrets.AWS_BUCKET_REGION,
    token: secrets.ACCESS_TOKEN_SECRET,
    refresh_token: secrets.REFRESH_TOKEN_SECRET,
    app_host: +secrets.APP_HOST,
    database: {
      db_host: secrets.DB_HOST,
      db_port: secrets.DB_PORT,
      db_username: secrets.DB_USERNAME,
      db_password: secrets.DB_PASSWORD,
      db_database: secrets.DB_DATABASE,
    },
  };
};
