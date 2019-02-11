import * as React from "react";

/**
 * @template T Object
 * @template K Union of T keys
 */
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

/**
 * Render prop type
 * @template P Props
 */
export type RenderProp<P = {}> = (props: P) => React.ReactElement<any>;

/**
 * "as" prop
 * @template P Props
 */
export type As<P = any> = React.ReactType<P>;

/**
 * @template P Props
 * @template T Element type
 */
export type PropsWithRef<P, T = any> = P & React.RefAttributes<T>;

/**
 * @template T Element type
 */
export type HTMLAttributesWithRef<T = any> = PropsWithRef<
  React.HTMLAttributes<T>,
  T
>;

/**
 * Converts T to its element type
 * @example
 * type HTMLDivElement = ElementType<"div">;
 * type FunctionalComponent = ElementType<() => null>;
 * type Never = ElementType<"foo">;
 * @template T Component type or string tag
 */
export type ElementType<T> = T extends keyof JSX.IntrinsicElements
  ? JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
      React.HTMLAttributes<infer E>,
      infer E
    >
    ? E
    : never
  : T extends React.ComponentType<any> | React.ExoticComponent<any>
  ? T
  : never;

/**
 * Returns only the HTML attributes inside P
 * @example
 * type OnlyId = ExtractHTMLAttributes<{ id: string; foo: string }>;
 * type HTMLAttributes = ExtractHTMLAttributes<any>;
 * @template P Props
 */
export type ExtractHTMLAttributes<P> = Pick<
  HTMLAttributesWithRef,
  Extract<keyof HTMLAttributesWithRef, keyof P>
>;

/**
 * ComponentPropsWithRef without the "as" prop
 * @template T "as" prop
 */
export type ComponentPropsWithoutAs<T extends As> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
>;

/**
 * Generic component props with "as" prop
 * @template P Additional props
 * @template T React component or string element
 */
export type ComponentPropsWithAs<T extends As> = {
  as?: T;
  children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>;
} & ComponentPropsWithoutAs<T>;

/**
 * Transform `"a" | "b"` into `"a" & "b"`
 * @template U Union
 */
export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;

/**
 * Same as Pick, but with value types instead of key
 * @template T Object
 * @template V Value
 */
export type PickByValue<T, V> = Pick<
  T,
  { [K in keyof T]: T[K] extends V ? K : never }[keyof T]
>;
