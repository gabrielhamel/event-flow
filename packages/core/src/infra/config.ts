export const getInfraConfig = (isInDevelopment: boolean, hostname: string | null) => {
  const apiHostname = isInDevelopment ? "localhost:8080" : hostname;
  const uiHostname = isInDevelopment ? "localhost:5173" : hostname;
  const sslActivated = !isInDevelopment;

  const apiWebsocketBaseUrl = `${sslActivated ? "wss" : "ws"}://${apiHostname}/api`;
  const apiBaseUrl = `${sslActivated ? "https" : "http"}://${apiHostname}/api`;
  const uiBaseUrl = `${sslActivated ? "https" : "http"}://${uiHostname}`;

  return {
    apiBaseUrl,
    apiWebsocketBaseUrl,
    uiBaseUrl,
  };
};
