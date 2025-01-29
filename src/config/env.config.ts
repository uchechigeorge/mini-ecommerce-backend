const nodeEnv = process.env.NODE_ENV;
const path = `app-settings${nodeEnv ? "." + nodeEnv : ".development"}.env`;

const getPath = (env: string) => {
  return `app-settings${env ? "." + env : ""}.env`;
};

const envOptions = {
  path,
  getPath,
};

export default envOptions;
