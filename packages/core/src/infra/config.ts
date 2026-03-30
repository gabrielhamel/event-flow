export const getInfraConfig = (isInDevelopment: boolean) => {
  const apiHostname = isInDevelopment ? "localhost:8080" : "ddd-lab.gabrielhamel.fr";
  const uiHostname = isInDevelopment ? "localhost:5173" : "ddd-lab.gabrielhamel.fr";
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
