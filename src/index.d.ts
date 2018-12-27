interface withVersion {
  version: string;
}
declare module 'package.json' {
  const v: withVersion
  export default v;
}