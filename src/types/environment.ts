export interface IEnvironment {
  port: string;
  env: string;
  mongoDB: {
    url: string;
  };
}
