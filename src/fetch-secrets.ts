import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

export const fetchSecrets = async (secretName: string) => {
  const client = new SecretsManagerClient({
    region: "us-east-1",
  });

  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT",
      })
    );

    return JSON.parse(response.SecretString);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
