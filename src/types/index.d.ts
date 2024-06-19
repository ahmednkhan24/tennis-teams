declare module '*.module.scss' {
  const content: Record<string, string>;
  export default content;
}

declare type Player = {
  id: string;
  name: string;
};
