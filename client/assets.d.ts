declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
declare module '*.eot';
declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
