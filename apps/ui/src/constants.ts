const isInDevelopment = import.meta.env.MODE === "development";

const apiHostname = isInDevelopment ? "localhost:8080" : "ddd-lab.gabrielhamel.fr";
const sslActivated = !isInDevelopment;

export const apiWebsocketBaseUrl = `${sslActivated ? "wss" : "ws"}://${apiHostname}/api`;
export const apiBaseUrl = `${sslActivated ? "https" : "http"}://${apiHostname}/api`;
