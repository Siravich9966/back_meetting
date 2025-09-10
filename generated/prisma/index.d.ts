
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model admin
 * 
 */
export type admin = $Result.DefaultSelection<Prisma.$adminPayload>
/**
 * Model equipment
 * 
 */
export type equipment = $Result.DefaultSelection<Prisma.$equipmentPayload>
/**
 * Model meeting_room
 * 
 */
export type meeting_room = $Result.DefaultSelection<Prisma.$meeting_roomPayload>
/**
 * Model officer
 * 
 */
export type officer = $Result.DefaultSelection<Prisma.$officerPayload>
/**
 * Model reservation
 * 
 */
export type reservation = $Result.DefaultSelection<Prisma.$reservationPayload>
/**
 * Model review
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type review = $Result.DefaultSelection<Prisma.$reviewPayload>
/**
 * Model roles
 * 
 */
export type roles = $Result.DefaultSelection<Prisma.$rolesPayload>
/**
 * Model users
 * 
 */
export type users = $Result.DefaultSelection<Prisma.$usersPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.adminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.equipment`: Exposes CRUD operations for the **equipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Equipment
    * const equipment = await prisma.equipment.findMany()
    * ```
    */
  get equipment(): Prisma.equipmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.meeting_room`: Exposes CRUD operations for the **meeting_room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Meeting_rooms
    * const meeting_rooms = await prisma.meeting_room.findMany()
    * ```
    */
  get meeting_room(): Prisma.meeting_roomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.officer`: Exposes CRUD operations for the **officer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Officers
    * const officers = await prisma.officer.findMany()
    * ```
    */
  get officer(): Prisma.officerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reservation`: Exposes CRUD operations for the **reservation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservations
    * const reservations = await prisma.reservation.findMany()
    * ```
    */
  get reservation(): Prisma.reservationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.reviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.rolesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    admin: 'admin',
    equipment: 'equipment',
    meeting_room: 'meeting_room',
    officer: 'officer',
    reservation: 'reservation',
    review: 'review',
    roles: 'roles',
    users: 'users'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admin" | "equipment" | "meeting_room" | "officer" | "reservation" | "review" | "roles" | "users"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      admin: {
        payload: Prisma.$adminPayload<ExtArgs>
        fields: Prisma.adminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.adminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.adminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findFirst: {
            args: Prisma.adminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.adminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          findMany: {
            args: Prisma.adminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          create: {
            args: Prisma.adminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          createMany: {
            args: Prisma.adminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.adminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          delete: {
            args: Prisma.adminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          update: {
            args: Prisma.adminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          deleteMany: {
            args: Prisma.adminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.adminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.adminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>[]
          }
          upsert: {
            args: Prisma.adminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$adminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.adminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.adminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      equipment: {
        payload: Prisma.$equipmentPayload<ExtArgs>
        fields: Prisma.equipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.equipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.equipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          findFirst: {
            args: Prisma.equipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.equipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          findMany: {
            args: Prisma.equipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>[]
          }
          create: {
            args: Prisma.equipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          createMany: {
            args: Prisma.equipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.equipmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>[]
          }
          delete: {
            args: Prisma.equipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          update: {
            args: Prisma.equipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          deleteMany: {
            args: Prisma.equipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.equipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.equipmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>[]
          }
          upsert: {
            args: Prisma.equipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$equipmentPayload>
          }
          aggregate: {
            args: Prisma.EquipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipment>
          }
          groupBy: {
            args: Prisma.equipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.equipmentCountArgs<ExtArgs>
            result: $Utils.Optional<EquipmentCountAggregateOutputType> | number
          }
        }
      }
      meeting_room: {
        payload: Prisma.$meeting_roomPayload<ExtArgs>
        fields: Prisma.meeting_roomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.meeting_roomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.meeting_roomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          findFirst: {
            args: Prisma.meeting_roomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.meeting_roomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          findMany: {
            args: Prisma.meeting_roomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>[]
          }
          create: {
            args: Prisma.meeting_roomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          createMany: {
            args: Prisma.meeting_roomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.meeting_roomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>[]
          }
          delete: {
            args: Prisma.meeting_roomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          update: {
            args: Prisma.meeting_roomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          deleteMany: {
            args: Prisma.meeting_roomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.meeting_roomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.meeting_roomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>[]
          }
          upsert: {
            args: Prisma.meeting_roomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$meeting_roomPayload>
          }
          aggregate: {
            args: Prisma.Meeting_roomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMeeting_room>
          }
          groupBy: {
            args: Prisma.meeting_roomGroupByArgs<ExtArgs>
            result: $Utils.Optional<Meeting_roomGroupByOutputType>[]
          }
          count: {
            args: Prisma.meeting_roomCountArgs<ExtArgs>
            result: $Utils.Optional<Meeting_roomCountAggregateOutputType> | number
          }
        }
      }
      officer: {
        payload: Prisma.$officerPayload<ExtArgs>
        fields: Prisma.officerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.officerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.officerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          findFirst: {
            args: Prisma.officerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.officerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          findMany: {
            args: Prisma.officerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>[]
          }
          create: {
            args: Prisma.officerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          createMany: {
            args: Prisma.officerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.officerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>[]
          }
          delete: {
            args: Prisma.officerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          update: {
            args: Prisma.officerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          deleteMany: {
            args: Prisma.officerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.officerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.officerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>[]
          }
          upsert: {
            args: Prisma.officerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$officerPayload>
          }
          aggregate: {
            args: Prisma.OfficerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfficer>
          }
          groupBy: {
            args: Prisma.officerGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfficerGroupByOutputType>[]
          }
          count: {
            args: Prisma.officerCountArgs<ExtArgs>
            result: $Utils.Optional<OfficerCountAggregateOutputType> | number
          }
        }
      }
      reservation: {
        payload: Prisma.$reservationPayload<ExtArgs>
        fields: Prisma.reservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          findFirst: {
            args: Prisma.reservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          findMany: {
            args: Prisma.reservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>[]
          }
          create: {
            args: Prisma.reservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          createMany: {
            args: Prisma.reservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>[]
          }
          delete: {
            args: Prisma.reservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          update: {
            args: Prisma.reservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          deleteMany: {
            args: Prisma.reservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reservationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>[]
          }
          upsert: {
            args: Prisma.reservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reservationPayload>
          }
          aggregate: {
            args: Prisma.ReservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReservation>
          }
          groupBy: {
            args: Prisma.reservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.reservationCountArgs<ExtArgs>
            result: $Utils.Optional<ReservationCountAggregateOutputType> | number
          }
        }
      }
      review: {
        payload: Prisma.$reviewPayload<ExtArgs>
        fields: Prisma.reviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findFirst: {
            args: Prisma.reviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findMany: {
            args: Prisma.reviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          create: {
            args: Prisma.reviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          createMany: {
            args: Prisma.reviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.reviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          delete: {
            args: Prisma.reviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          update: {
            args: Prisma.reviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          deleteMany: {
            args: Prisma.reviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.reviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          upsert: {
            args: Prisma.reviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.reviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.reviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      roles: {
        payload: Prisma.$rolesPayload<ExtArgs>
        fields: Prisma.rolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.rolesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.rolesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findFirst: {
            args: Prisma.rolesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.rolesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          findMany: {
            args: Prisma.rolesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          create: {
            args: Prisma.rolesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          createMany: {
            args: Prisma.rolesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.rolesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          delete: {
            args: Prisma.rolesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          update: {
            args: Prisma.rolesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          deleteMany: {
            args: Prisma.rolesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.rolesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.rolesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>[]
          }
          upsert: {
            args: Prisma.rolesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$rolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.rolesGroupByArgs<ExtArgs>
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.rolesCountArgs<ExtArgs>
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: Prisma.$usersPayload<ExtArgs>
        fields: Prisma.usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usersCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usersUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>[]
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    admin?: adminOmit
    equipment?: equipmentOmit
    meeting_room?: meeting_roomOmit
    officer?: officerOmit
    reservation?: reservationOmit
    review?: reviewOmit
    roles?: rolesOmit
    users?: usersOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Meeting_roomCountOutputType
   */

  export type Meeting_roomCountOutputType = {
    equipment: number
    reservation: number
    review: number
  }

  export type Meeting_roomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipment?: boolean | Meeting_roomCountOutputTypeCountEquipmentArgs
    reservation?: boolean | Meeting_roomCountOutputTypeCountReservationArgs
    review?: boolean | Meeting_roomCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * Meeting_roomCountOutputType without action
   */
  export type Meeting_roomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Meeting_roomCountOutputType
     */
    select?: Meeting_roomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Meeting_roomCountOutputType without action
   */
  export type Meeting_roomCountOutputTypeCountEquipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: equipmentWhereInput
  }

  /**
   * Meeting_roomCountOutputType without action
   */
  export type Meeting_roomCountOutputTypeCountReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservationWhereInput
  }

  /**
   * Meeting_roomCountOutputType without action
   */
  export type Meeting_roomCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }


  /**
   * Count Type OfficerCountOutputType
   */

  export type OfficerCountOutputType = {
    reservation: number
  }

  export type OfficerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | OfficerCountOutputTypeCountReservationArgs
  }

  // Custom InputTypes
  /**
   * OfficerCountOutputType without action
   */
  export type OfficerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfficerCountOutputType
     */
    select?: OfficerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OfficerCountOutputType without action
   */
  export type OfficerCountOutputTypeCountReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservationWhereInput
  }


  /**
   * Count Type RolesCountOutputType
   */

  export type RolesCountOutputType = {
    admin: number
    officer: number
    users: number
  }

  export type RolesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | RolesCountOutputTypeCountAdminArgs
    officer?: boolean | RolesCountOutputTypeCountOfficerArgs
    users?: boolean | RolesCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RolesCountOutputType
     */
    select?: RolesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountAdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountOfficerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: officerWhereInput
  }

  /**
   * RolesCountOutputType without action
   */
  export type RolesCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }


  /**
   * Count Type UsersCountOutputType
   */

  export type UsersCountOutputType = {
    reservation: number
    review: number
  }

  export type UsersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | UsersCountOutputTypeCountReservationArgs
    review?: boolean | UsersCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     */
    select?: UsersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservationWhereInput
  }

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }


  /**
   * Models
   */

  /**
   * Model admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    admin_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type AdminSumAggregateOutputType = {
    admin_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type AdminMinAggregateOutputType = {
    admin_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    admin_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AdminCountAggregateOutputType = {
    admin_id: number
    role_id: number
    first_name: number
    last_name: number
    email: number
    password: number
    citizen_id: number
    position: number
    department: number
    zip_code: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    admin_id?: true
    role_id?: true
    zip_code?: true
  }

  export type AdminSumAggregateInputType = {
    admin_id?: true
    role_id?: true
    zip_code?: true
  }

  export type AdminMinAggregateInputType = {
    admin_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminMaxAggregateInputType = {
    admin_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type AdminCountAggregateInputType = {
    admin_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admin to aggregate.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type adminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: adminWhereInput
    orderBy?: adminOrderByWithAggregationInput | adminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: adminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    admin_id: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends adminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type adminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    admin_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type adminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    admin_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type adminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    admin_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type adminSelectScalar = {
    admin_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type adminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"admin_id" | "role_id" | "first_name" | "last_name" | "email" | "password" | "citizen_id" | "position" | "department" | "zip_code" | "created_at" | "updated_at", ExtArgs["result"]["admin"]>
  export type adminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }
  export type adminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }
  export type adminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }

  export type $adminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "admin"
    objects: {
      roles: Prisma.$rolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      admin_id: number
      role_id: number
      first_name: string
      last_name: string
      email: string
      password: string
      citizen_id: string | null
      position: string | null
      department: string | null
      zip_code: number | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type adminGetPayload<S extends boolean | null | undefined | adminDefaultArgs> = $Result.GetResult<Prisma.$adminPayload, S>

  type adminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<adminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface adminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['admin'], meta: { name: 'admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {adminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends adminFindUniqueArgs>(args: SelectSubset<T, adminFindUniqueArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {adminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends adminFindUniqueOrThrowArgs>(args: SelectSubset<T, adminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends adminFindFirstArgs>(args?: SelectSubset<T, adminFindFirstArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends adminFindFirstOrThrowArgs>(args?: SelectSubset<T, adminFindFirstOrThrowArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `admin_id`
     * const adminWithAdmin_idOnly = await prisma.admin.findMany({ select: { admin_id: true } })
     * 
     */
    findMany<T extends adminFindManyArgs>(args?: SelectSubset<T, adminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {adminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends adminCreateArgs>(args: SelectSubset<T, adminCreateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {adminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends adminCreateManyArgs>(args?: SelectSubset<T, adminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {adminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `admin_id`
     * const adminWithAdmin_idOnly = await prisma.admin.createManyAndReturn({
     *   select: { admin_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends adminCreateManyAndReturnArgs>(args?: SelectSubset<T, adminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {adminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends adminDeleteArgs>(args: SelectSubset<T, adminDeleteArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {adminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends adminUpdateArgs>(args: SelectSubset<T, adminUpdateArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {adminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends adminDeleteManyArgs>(args?: SelectSubset<T, adminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends adminUpdateManyArgs>(args: SelectSubset<T, adminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {adminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `admin_id`
     * const adminWithAdmin_idOnly = await prisma.admin.updateManyAndReturn({
     *   select: { admin_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends adminUpdateManyAndReturnArgs>(args: SelectSubset<T, adminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {adminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends adminUpsertArgs>(args: SelectSubset<T, adminUpsertArgs<ExtArgs>>): Prisma__adminClient<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends adminCountArgs>(
      args?: Subset<T, adminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {adminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends adminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: adminGroupByArgs['orderBy'] }
        : { orderBy?: adminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, adminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the admin model
   */
  readonly fields: adminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__adminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends rolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, rolesDefaultArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the admin model
   */
  interface adminFieldRefs {
    readonly admin_id: FieldRef<"admin", 'Int'>
    readonly role_id: FieldRef<"admin", 'Int'>
    readonly first_name: FieldRef<"admin", 'String'>
    readonly last_name: FieldRef<"admin", 'String'>
    readonly email: FieldRef<"admin", 'String'>
    readonly password: FieldRef<"admin", 'String'>
    readonly citizen_id: FieldRef<"admin", 'String'>
    readonly position: FieldRef<"admin", 'String'>
    readonly department: FieldRef<"admin", 'String'>
    readonly zip_code: FieldRef<"admin", 'Int'>
    readonly created_at: FieldRef<"admin", 'DateTime'>
    readonly updated_at: FieldRef<"admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * admin findUnique
   */
  export type adminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findUniqueOrThrow
   */
  export type adminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin findFirst
   */
  export type adminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findFirstOrThrow
   */
  export type adminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admin to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin findMany
   */
  export type adminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter, which admins to fetch.
     */
    where?: adminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of admins to fetch.
     */
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing admins.
     */
    cursor?: adminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * admin create
   */
  export type adminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to create a admin.
     */
    data: XOR<adminCreateInput, adminUncheckedCreateInput>
  }

  /**
   * admin createMany
   */
  export type adminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * admin createManyAndReturn
   */
  export type adminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data used to create many admins.
     */
    data: adminCreateManyInput | adminCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * admin update
   */
  export type adminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The data needed to update a admin.
     */
    data: XOR<adminUpdateInput, adminUncheckedUpdateInput>
    /**
     * Choose, which admin to update.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin updateMany
   */
  export type adminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
  }

  /**
   * admin updateManyAndReturn
   */
  export type adminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * The data used to update admins.
     */
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyInput>
    /**
     * Filter which admins to update
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * admin upsert
   */
  export type adminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * The filter to search for the admin to update in case it exists.
     */
    where: adminWhereUniqueInput
    /**
     * In case the admin found by the `where` argument doesn't exist, create a new admin with this data.
     */
    create: XOR<adminCreateInput, adminUncheckedCreateInput>
    /**
     * In case the admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<adminUpdateInput, adminUncheckedUpdateInput>
  }

  /**
   * admin delete
   */
  export type adminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    /**
     * Filter which admin to delete.
     */
    where: adminWhereUniqueInput
  }

  /**
   * admin deleteMany
   */
  export type adminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which admins to delete
     */
    where?: adminWhereInput
    /**
     * Limit how many admins to delete.
     */
    limit?: number
  }

  /**
   * admin without action
   */
  export type adminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
  }


  /**
   * Model equipment
   */

  export type AggregateEquipment = {
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  export type EquipmentAvgAggregateOutputType = {
    equipment_id: number | null
    room_id: number | null
    quantity: number | null
  }

  export type EquipmentSumAggregateOutputType = {
    equipment_id: number | null
    room_id: number | null
    quantity: number | null
  }

  export type EquipmentMinAggregateOutputType = {
    equipment_id: number | null
    room_id: number | null
    equipment_n: string | null
    quantity: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EquipmentMaxAggregateOutputType = {
    equipment_id: number | null
    room_id: number | null
    equipment_n: string | null
    quantity: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type EquipmentCountAggregateOutputType = {
    equipment_id: number
    room_id: number
    equipment_n: number
    quantity: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type EquipmentAvgAggregateInputType = {
    equipment_id?: true
    room_id?: true
    quantity?: true
  }

  export type EquipmentSumAggregateInputType = {
    equipment_id?: true
    room_id?: true
    quantity?: true
  }

  export type EquipmentMinAggregateInputType = {
    equipment_id?: true
    room_id?: true
    equipment_n?: true
    quantity?: true
    created_at?: true
    updated_at?: true
  }

  export type EquipmentMaxAggregateInputType = {
    equipment_id?: true
    room_id?: true
    equipment_n?: true
    quantity?: true
    created_at?: true
    updated_at?: true
  }

  export type EquipmentCountAggregateInputType = {
    equipment_id?: true
    room_id?: true
    equipment_n?: true
    quantity?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type EquipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which equipment to aggregate.
     */
    where?: equipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of equipment to fetch.
     */
    orderBy?: equipmentOrderByWithRelationInput | equipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: equipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned equipment
    **/
    _count?: true | EquipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipmentMaxAggregateInputType
  }

  export type GetEquipmentAggregateType<T extends EquipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipment[P]>
      : GetScalarType<T[P], AggregateEquipment[P]>
  }




  export type equipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: equipmentWhereInput
    orderBy?: equipmentOrderByWithAggregationInput | equipmentOrderByWithAggregationInput[]
    by: EquipmentScalarFieldEnum[] | EquipmentScalarFieldEnum
    having?: equipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipmentCountAggregateInputType | true
    _avg?: EquipmentAvgAggregateInputType
    _sum?: EquipmentSumAggregateInputType
    _min?: EquipmentMinAggregateInputType
    _max?: EquipmentMaxAggregateInputType
  }

  export type EquipmentGroupByOutputType = {
    equipment_id: number
    room_id: number
    equipment_n: string
    quantity: number
    created_at: Date | null
    updated_at: Date | null
    _count: EquipmentCountAggregateOutputType | null
    _avg: EquipmentAvgAggregateOutputType | null
    _sum: EquipmentSumAggregateOutputType | null
    _min: EquipmentMinAggregateOutputType | null
    _max: EquipmentMaxAggregateOutputType | null
  }

  type GetEquipmentGroupByPayload<T extends equipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
            : GetScalarType<T[P], EquipmentGroupByOutputType[P]>
        }
      >
    >


  export type equipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    equipment_id?: boolean
    room_id?: boolean
    equipment_n?: boolean
    quantity?: boolean
    created_at?: boolean
    updated_at?: boolean
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipment"]>

  export type equipmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    equipment_id?: boolean
    room_id?: boolean
    equipment_n?: boolean
    quantity?: boolean
    created_at?: boolean
    updated_at?: boolean
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipment"]>

  export type equipmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    equipment_id?: boolean
    room_id?: boolean
    equipment_n?: boolean
    quantity?: boolean
    created_at?: boolean
    updated_at?: boolean
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipment"]>

  export type equipmentSelectScalar = {
    equipment_id?: boolean
    room_id?: boolean
    equipment_n?: boolean
    quantity?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type equipmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"equipment_id" | "room_id" | "equipment_n" | "quantity" | "created_at" | "updated_at", ExtArgs["result"]["equipment"]>
  export type equipmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }
  export type equipmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }
  export type equipmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | meeting_roomDefaultArgs<ExtArgs>
  }

  export type $equipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "equipment"
    objects: {
      meeting_room: Prisma.$meeting_roomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      equipment_id: number
      room_id: number
      equipment_n: string
      quantity: number
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["equipment"]>
    composites: {}
  }

  type equipmentGetPayload<S extends boolean | null | undefined | equipmentDefaultArgs> = $Result.GetResult<Prisma.$equipmentPayload, S>

  type equipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<equipmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EquipmentCountAggregateInputType | true
    }

  export interface equipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['equipment'], meta: { name: 'equipment' } }
    /**
     * Find zero or one Equipment that matches the filter.
     * @param {equipmentFindUniqueArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends equipmentFindUniqueArgs>(args: SelectSubset<T, equipmentFindUniqueArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Equipment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {equipmentFindUniqueOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends equipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, equipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentFindFirstArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends equipmentFindFirstArgs>(args?: SelectSubset<T, equipmentFindFirstArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Equipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentFindFirstOrThrowArgs} args - Arguments to find a Equipment
     * @example
     * // Get one Equipment
     * const equipment = await prisma.equipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends equipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, equipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Equipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Equipment
     * const equipment = await prisma.equipment.findMany()
     * 
     * // Get first 10 Equipment
     * const equipment = await prisma.equipment.findMany({ take: 10 })
     * 
     * // Only select the `equipment_id`
     * const equipmentWithEquipment_idOnly = await prisma.equipment.findMany({ select: { equipment_id: true } })
     * 
     */
    findMany<T extends equipmentFindManyArgs>(args?: SelectSubset<T, equipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Equipment.
     * @param {equipmentCreateArgs} args - Arguments to create a Equipment.
     * @example
     * // Create one Equipment
     * const Equipment = await prisma.equipment.create({
     *   data: {
     *     // ... data to create a Equipment
     *   }
     * })
     * 
     */
    create<T extends equipmentCreateArgs>(args: SelectSubset<T, equipmentCreateArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Equipment.
     * @param {equipmentCreateManyArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends equipmentCreateManyArgs>(args?: SelectSubset<T, equipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Equipment and returns the data saved in the database.
     * @param {equipmentCreateManyAndReturnArgs} args - Arguments to create many Equipment.
     * @example
     * // Create many Equipment
     * const equipment = await prisma.equipment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Equipment and only return the `equipment_id`
     * const equipmentWithEquipment_idOnly = await prisma.equipment.createManyAndReturn({
     *   select: { equipment_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends equipmentCreateManyAndReturnArgs>(args?: SelectSubset<T, equipmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Equipment.
     * @param {equipmentDeleteArgs} args - Arguments to delete one Equipment.
     * @example
     * // Delete one Equipment
     * const Equipment = await prisma.equipment.delete({
     *   where: {
     *     // ... filter to delete one Equipment
     *   }
     * })
     * 
     */
    delete<T extends equipmentDeleteArgs>(args: SelectSubset<T, equipmentDeleteArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Equipment.
     * @param {equipmentUpdateArgs} args - Arguments to update one Equipment.
     * @example
     * // Update one Equipment
     * const equipment = await prisma.equipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends equipmentUpdateArgs>(args: SelectSubset<T, equipmentUpdateArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Equipment.
     * @param {equipmentDeleteManyArgs} args - Arguments to filter Equipment to delete.
     * @example
     * // Delete a few Equipment
     * const { count } = await prisma.equipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends equipmentDeleteManyArgs>(args?: SelectSubset<T, equipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends equipmentUpdateManyArgs>(args: SelectSubset<T, equipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipment and returns the data updated in the database.
     * @param {equipmentUpdateManyAndReturnArgs} args - Arguments to update many Equipment.
     * @example
     * // Update many Equipment
     * const equipment = await prisma.equipment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Equipment and only return the `equipment_id`
     * const equipmentWithEquipment_idOnly = await prisma.equipment.updateManyAndReturn({
     *   select: { equipment_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends equipmentUpdateManyAndReturnArgs>(args: SelectSubset<T, equipmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Equipment.
     * @param {equipmentUpsertArgs} args - Arguments to update or create a Equipment.
     * @example
     * // Update or create a Equipment
     * const equipment = await prisma.equipment.upsert({
     *   create: {
     *     // ... data to create a Equipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Equipment we want to update
     *   }
     * })
     */
    upsert<T extends equipmentUpsertArgs>(args: SelectSubset<T, equipmentUpsertArgs<ExtArgs>>): Prisma__equipmentClient<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentCountArgs} args - Arguments to filter Equipment to count.
     * @example
     * // Count the number of Equipment
     * const count = await prisma.equipment.count({
     *   where: {
     *     // ... the filter for the Equipment we want to count
     *   }
     * })
    **/
    count<T extends equipmentCountArgs>(
      args?: Subset<T, equipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipmentAggregateArgs>(args: Subset<T, EquipmentAggregateArgs>): Prisma.PrismaPromise<GetEquipmentAggregateType<T>>

    /**
     * Group by Equipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {equipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends equipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: equipmentGroupByArgs['orderBy'] }
        : { orderBy?: equipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, equipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the equipment model
   */
  readonly fields: equipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for equipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__equipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting_room<T extends meeting_roomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, meeting_roomDefaultArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the equipment model
   */
  interface equipmentFieldRefs {
    readonly equipment_id: FieldRef<"equipment", 'Int'>
    readonly room_id: FieldRef<"equipment", 'Int'>
    readonly equipment_n: FieldRef<"equipment", 'String'>
    readonly quantity: FieldRef<"equipment", 'Int'>
    readonly created_at: FieldRef<"equipment", 'DateTime'>
    readonly updated_at: FieldRef<"equipment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * equipment findUnique
   */
  export type equipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter, which equipment to fetch.
     */
    where: equipmentWhereUniqueInput
  }

  /**
   * equipment findUniqueOrThrow
   */
  export type equipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter, which equipment to fetch.
     */
    where: equipmentWhereUniqueInput
  }

  /**
   * equipment findFirst
   */
  export type equipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter, which equipment to fetch.
     */
    where?: equipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of equipment to fetch.
     */
    orderBy?: equipmentOrderByWithRelationInput | equipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for equipment.
     */
    cursor?: equipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * equipment findFirstOrThrow
   */
  export type equipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter, which equipment to fetch.
     */
    where?: equipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of equipment to fetch.
     */
    orderBy?: equipmentOrderByWithRelationInput | equipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for equipment.
     */
    cursor?: equipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` equipment.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of equipment.
     */
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * equipment findMany
   */
  export type equipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter, which equipment to fetch.
     */
    where?: equipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of equipment to fetch.
     */
    orderBy?: equipmentOrderByWithRelationInput | equipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing equipment.
     */
    cursor?: equipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` equipment from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` equipment.
     */
    skip?: number
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * equipment create
   */
  export type equipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * The data needed to create a equipment.
     */
    data: XOR<equipmentCreateInput, equipmentUncheckedCreateInput>
  }

  /**
   * equipment createMany
   */
  export type equipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many equipment.
     */
    data: equipmentCreateManyInput | equipmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * equipment createManyAndReturn
   */
  export type equipmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * The data used to create many equipment.
     */
    data: equipmentCreateManyInput | equipmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * equipment update
   */
  export type equipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * The data needed to update a equipment.
     */
    data: XOR<equipmentUpdateInput, equipmentUncheckedUpdateInput>
    /**
     * Choose, which equipment to update.
     */
    where: equipmentWhereUniqueInput
  }

  /**
   * equipment updateMany
   */
  export type equipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update equipment.
     */
    data: XOR<equipmentUpdateManyMutationInput, equipmentUncheckedUpdateManyInput>
    /**
     * Filter which equipment to update
     */
    where?: equipmentWhereInput
    /**
     * Limit how many equipment to update.
     */
    limit?: number
  }

  /**
   * equipment updateManyAndReturn
   */
  export type equipmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * The data used to update equipment.
     */
    data: XOR<equipmentUpdateManyMutationInput, equipmentUncheckedUpdateManyInput>
    /**
     * Filter which equipment to update
     */
    where?: equipmentWhereInput
    /**
     * Limit how many equipment to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * equipment upsert
   */
  export type equipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * The filter to search for the equipment to update in case it exists.
     */
    where: equipmentWhereUniqueInput
    /**
     * In case the equipment found by the `where` argument doesn't exist, create a new equipment with this data.
     */
    create: XOR<equipmentCreateInput, equipmentUncheckedCreateInput>
    /**
     * In case the equipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<equipmentUpdateInput, equipmentUncheckedUpdateInput>
  }

  /**
   * equipment delete
   */
  export type equipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    /**
     * Filter which equipment to delete.
     */
    where: equipmentWhereUniqueInput
  }

  /**
   * equipment deleteMany
   */
  export type equipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which equipment to delete
     */
    where?: equipmentWhereInput
    /**
     * Limit how many equipment to delete.
     */
    limit?: number
  }

  /**
   * equipment without action
   */
  export type equipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
  }


  /**
   * Model meeting_room
   */

  export type AggregateMeeting_room = {
    _count: Meeting_roomCountAggregateOutputType | null
    _avg: Meeting_roomAvgAggregateOutputType | null
    _sum: Meeting_roomSumAggregateOutputType | null
    _min: Meeting_roomMinAggregateOutputType | null
    _max: Meeting_roomMaxAggregateOutputType | null
  }

  export type Meeting_roomAvgAggregateOutputType = {
    room_id: number | null
    capacity: number | null
  }

  export type Meeting_roomSumAggregateOutputType = {
    room_id: number | null
    capacity: number | null
  }

  export type Meeting_roomMinAggregateOutputType = {
    room_id: number | null
    room_name: string | null
    capacity: number | null
    location_m: string | null
    status_m: string | null
    image: string | null
    details_m: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Meeting_roomMaxAggregateOutputType = {
    room_id: number | null
    room_name: string | null
    capacity: number | null
    location_m: string | null
    status_m: string | null
    image: string | null
    details_m: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Meeting_roomCountAggregateOutputType = {
    room_id: number
    room_name: number
    capacity: number
    location_m: number
    status_m: number
    image: number
    details_m: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Meeting_roomAvgAggregateInputType = {
    room_id?: true
    capacity?: true
  }

  export type Meeting_roomSumAggregateInputType = {
    room_id?: true
    capacity?: true
  }

  export type Meeting_roomMinAggregateInputType = {
    room_id?: true
    room_name?: true
    capacity?: true
    location_m?: true
    status_m?: true
    image?: true
    details_m?: true
    created_at?: true
    updated_at?: true
  }

  export type Meeting_roomMaxAggregateInputType = {
    room_id?: true
    room_name?: true
    capacity?: true
    location_m?: true
    status_m?: true
    image?: true
    details_m?: true
    created_at?: true
    updated_at?: true
  }

  export type Meeting_roomCountAggregateInputType = {
    room_id?: true
    room_name?: true
    capacity?: true
    location_m?: true
    status_m?: true
    image?: true
    details_m?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Meeting_roomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meeting_room to aggregate.
     */
    where?: meeting_roomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomOrderByWithRelationInput | meeting_roomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: meeting_roomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned meeting_rooms
    **/
    _count?: true | Meeting_roomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Meeting_roomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Meeting_roomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Meeting_roomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Meeting_roomMaxAggregateInputType
  }

  export type GetMeeting_roomAggregateType<T extends Meeting_roomAggregateArgs> = {
        [P in keyof T & keyof AggregateMeeting_room]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMeeting_room[P]>
      : GetScalarType<T[P], AggregateMeeting_room[P]>
  }




  export type meeting_roomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: meeting_roomWhereInput
    orderBy?: meeting_roomOrderByWithAggregationInput | meeting_roomOrderByWithAggregationInput[]
    by: Meeting_roomScalarFieldEnum[] | Meeting_roomScalarFieldEnum
    having?: meeting_roomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Meeting_roomCountAggregateInputType | true
    _avg?: Meeting_roomAvgAggregateInputType
    _sum?: Meeting_roomSumAggregateInputType
    _min?: Meeting_roomMinAggregateInputType
    _max?: Meeting_roomMaxAggregateInputType
  }

  export type Meeting_roomGroupByOutputType = {
    room_id: number
    room_name: string
    capacity: number
    location_m: string
    status_m: string | null
    image: string | null
    details_m: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: Meeting_roomCountAggregateOutputType | null
    _avg: Meeting_roomAvgAggregateOutputType | null
    _sum: Meeting_roomSumAggregateOutputType | null
    _min: Meeting_roomMinAggregateOutputType | null
    _max: Meeting_roomMaxAggregateOutputType | null
  }

  type GetMeeting_roomGroupByPayload<T extends meeting_roomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Meeting_roomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Meeting_roomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Meeting_roomGroupByOutputType[P]>
            : GetScalarType<T[P], Meeting_roomGroupByOutputType[P]>
        }
      >
    >


  export type meeting_roomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_name?: boolean
    capacity?: boolean
    location_m?: boolean
    status_m?: boolean
    image?: boolean
    details_m?: boolean
    created_at?: boolean
    updated_at?: boolean
    equipment?: boolean | meeting_room$equipmentArgs<ExtArgs>
    reservation?: boolean | meeting_room$reservationArgs<ExtArgs>
    review?: boolean | meeting_room$reviewArgs<ExtArgs>
    _count?: boolean | Meeting_roomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["meeting_room"]>

  export type meeting_roomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_name?: boolean
    capacity?: boolean
    location_m?: boolean
    status_m?: boolean
    image?: boolean
    details_m?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meeting_room"]>

  export type meeting_roomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_name?: boolean
    capacity?: boolean
    location_m?: boolean
    status_m?: boolean
    image?: boolean
    details_m?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["meeting_room"]>

  export type meeting_roomSelectScalar = {
    room_id?: boolean
    room_name?: boolean
    capacity?: boolean
    location_m?: boolean
    status_m?: boolean
    image?: boolean
    details_m?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type meeting_roomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"room_id" | "room_name" | "capacity" | "location_m" | "status_m" | "image" | "details_m" | "created_at" | "updated_at", ExtArgs["result"]["meeting_room"]>
  export type meeting_roomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    equipment?: boolean | meeting_room$equipmentArgs<ExtArgs>
    reservation?: boolean | meeting_room$reservationArgs<ExtArgs>
    review?: boolean | meeting_room$reviewArgs<ExtArgs>
    _count?: boolean | Meeting_roomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type meeting_roomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type meeting_roomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $meeting_roomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "meeting_room"
    objects: {
      equipment: Prisma.$equipmentPayload<ExtArgs>[]
      reservation: Prisma.$reservationPayload<ExtArgs>[]
      review: Prisma.$reviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      room_id: number
      room_name: string
      capacity: number
      location_m: string
      status_m: string | null
      image: string | null
      details_m: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["meeting_room"]>
    composites: {}
  }

  type meeting_roomGetPayload<S extends boolean | null | undefined | meeting_roomDefaultArgs> = $Result.GetResult<Prisma.$meeting_roomPayload, S>

  type meeting_roomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<meeting_roomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Meeting_roomCountAggregateInputType | true
    }

  export interface meeting_roomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['meeting_room'], meta: { name: 'meeting_room' } }
    /**
     * Find zero or one Meeting_room that matches the filter.
     * @param {meeting_roomFindUniqueArgs} args - Arguments to find a Meeting_room
     * @example
     * // Get one Meeting_room
     * const meeting_room = await prisma.meeting_room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends meeting_roomFindUniqueArgs>(args: SelectSubset<T, meeting_roomFindUniqueArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Meeting_room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {meeting_roomFindUniqueOrThrowArgs} args - Arguments to find a Meeting_room
     * @example
     * // Get one Meeting_room
     * const meeting_room = await prisma.meeting_room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends meeting_roomFindUniqueOrThrowArgs>(args: SelectSubset<T, meeting_roomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting_room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomFindFirstArgs} args - Arguments to find a Meeting_room
     * @example
     * // Get one Meeting_room
     * const meeting_room = await prisma.meeting_room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends meeting_roomFindFirstArgs>(args?: SelectSubset<T, meeting_roomFindFirstArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Meeting_room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomFindFirstOrThrowArgs} args - Arguments to find a Meeting_room
     * @example
     * // Get one Meeting_room
     * const meeting_room = await prisma.meeting_room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends meeting_roomFindFirstOrThrowArgs>(args?: SelectSubset<T, meeting_roomFindFirstOrThrowArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Meeting_rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Meeting_rooms
     * const meeting_rooms = await prisma.meeting_room.findMany()
     * 
     * // Get first 10 Meeting_rooms
     * const meeting_rooms = await prisma.meeting_room.findMany({ take: 10 })
     * 
     * // Only select the `room_id`
     * const meeting_roomWithRoom_idOnly = await prisma.meeting_room.findMany({ select: { room_id: true } })
     * 
     */
    findMany<T extends meeting_roomFindManyArgs>(args?: SelectSubset<T, meeting_roomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Meeting_room.
     * @param {meeting_roomCreateArgs} args - Arguments to create a Meeting_room.
     * @example
     * // Create one Meeting_room
     * const Meeting_room = await prisma.meeting_room.create({
     *   data: {
     *     // ... data to create a Meeting_room
     *   }
     * })
     * 
     */
    create<T extends meeting_roomCreateArgs>(args: SelectSubset<T, meeting_roomCreateArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Meeting_rooms.
     * @param {meeting_roomCreateManyArgs} args - Arguments to create many Meeting_rooms.
     * @example
     * // Create many Meeting_rooms
     * const meeting_room = await prisma.meeting_room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends meeting_roomCreateManyArgs>(args?: SelectSubset<T, meeting_roomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Meeting_rooms and returns the data saved in the database.
     * @param {meeting_roomCreateManyAndReturnArgs} args - Arguments to create many Meeting_rooms.
     * @example
     * // Create many Meeting_rooms
     * const meeting_room = await prisma.meeting_room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Meeting_rooms and only return the `room_id`
     * const meeting_roomWithRoom_idOnly = await prisma.meeting_room.createManyAndReturn({
     *   select: { room_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends meeting_roomCreateManyAndReturnArgs>(args?: SelectSubset<T, meeting_roomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Meeting_room.
     * @param {meeting_roomDeleteArgs} args - Arguments to delete one Meeting_room.
     * @example
     * // Delete one Meeting_room
     * const Meeting_room = await prisma.meeting_room.delete({
     *   where: {
     *     // ... filter to delete one Meeting_room
     *   }
     * })
     * 
     */
    delete<T extends meeting_roomDeleteArgs>(args: SelectSubset<T, meeting_roomDeleteArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Meeting_room.
     * @param {meeting_roomUpdateArgs} args - Arguments to update one Meeting_room.
     * @example
     * // Update one Meeting_room
     * const meeting_room = await prisma.meeting_room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends meeting_roomUpdateArgs>(args: SelectSubset<T, meeting_roomUpdateArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Meeting_rooms.
     * @param {meeting_roomDeleteManyArgs} args - Arguments to filter Meeting_rooms to delete.
     * @example
     * // Delete a few Meeting_rooms
     * const { count } = await prisma.meeting_room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends meeting_roomDeleteManyArgs>(args?: SelectSubset<T, meeting_roomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Meeting_rooms
     * const meeting_room = await prisma.meeting_room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends meeting_roomUpdateManyArgs>(args: SelectSubset<T, meeting_roomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Meeting_rooms and returns the data updated in the database.
     * @param {meeting_roomUpdateManyAndReturnArgs} args - Arguments to update many Meeting_rooms.
     * @example
     * // Update many Meeting_rooms
     * const meeting_room = await prisma.meeting_room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Meeting_rooms and only return the `room_id`
     * const meeting_roomWithRoom_idOnly = await prisma.meeting_room.updateManyAndReturn({
     *   select: { room_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends meeting_roomUpdateManyAndReturnArgs>(args: SelectSubset<T, meeting_roomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Meeting_room.
     * @param {meeting_roomUpsertArgs} args - Arguments to update or create a Meeting_room.
     * @example
     * // Update or create a Meeting_room
     * const meeting_room = await prisma.meeting_room.upsert({
     *   create: {
     *     // ... data to create a Meeting_room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Meeting_room we want to update
     *   }
     * })
     */
    upsert<T extends meeting_roomUpsertArgs>(args: SelectSubset<T, meeting_roomUpsertArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Meeting_rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomCountArgs} args - Arguments to filter Meeting_rooms to count.
     * @example
     * // Count the number of Meeting_rooms
     * const count = await prisma.meeting_room.count({
     *   where: {
     *     // ... the filter for the Meeting_rooms we want to count
     *   }
     * })
    **/
    count<T extends meeting_roomCountArgs>(
      args?: Subset<T, meeting_roomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Meeting_roomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Meeting_room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Meeting_roomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Meeting_roomAggregateArgs>(args: Subset<T, Meeting_roomAggregateArgs>): Prisma.PrismaPromise<GetMeeting_roomAggregateType<T>>

    /**
     * Group by Meeting_room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {meeting_roomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends meeting_roomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: meeting_roomGroupByArgs['orderBy'] }
        : { orderBy?: meeting_roomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, meeting_roomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMeeting_roomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the meeting_room model
   */
  readonly fields: meeting_roomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for meeting_room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__meeting_roomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    equipment<T extends meeting_room$equipmentArgs<ExtArgs> = {}>(args?: Subset<T, meeting_room$equipmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$equipmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reservation<T extends meeting_room$reservationArgs<ExtArgs> = {}>(args?: Subset<T, meeting_room$reservationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends meeting_room$reviewArgs<ExtArgs> = {}>(args?: Subset<T, meeting_room$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the meeting_room model
   */
  interface meeting_roomFieldRefs {
    readonly room_id: FieldRef<"meeting_room", 'Int'>
    readonly room_name: FieldRef<"meeting_room", 'String'>
    readonly capacity: FieldRef<"meeting_room", 'Int'>
    readonly location_m: FieldRef<"meeting_room", 'String'>
    readonly status_m: FieldRef<"meeting_room", 'String'>
    readonly image: FieldRef<"meeting_room", 'String'>
    readonly details_m: FieldRef<"meeting_room", 'String'>
    readonly created_at: FieldRef<"meeting_room", 'DateTime'>
    readonly updated_at: FieldRef<"meeting_room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * meeting_room findUnique
   */
  export type meeting_roomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter, which meeting_room to fetch.
     */
    where: meeting_roomWhereUniqueInput
  }

  /**
   * meeting_room findUniqueOrThrow
   */
  export type meeting_roomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter, which meeting_room to fetch.
     */
    where: meeting_roomWhereUniqueInput
  }

  /**
   * meeting_room findFirst
   */
  export type meeting_roomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter, which meeting_room to fetch.
     */
    where?: meeting_roomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomOrderByWithRelationInput | meeting_roomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meeting_rooms.
     */
    cursor?: meeting_roomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meeting_rooms.
     */
    distinct?: Meeting_roomScalarFieldEnum | Meeting_roomScalarFieldEnum[]
  }

  /**
   * meeting_room findFirstOrThrow
   */
  export type meeting_roomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter, which meeting_room to fetch.
     */
    where?: meeting_roomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomOrderByWithRelationInput | meeting_roomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for meeting_rooms.
     */
    cursor?: meeting_roomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of meeting_rooms.
     */
    distinct?: Meeting_roomScalarFieldEnum | Meeting_roomScalarFieldEnum[]
  }

  /**
   * meeting_room findMany
   */
  export type meeting_roomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter, which meeting_rooms to fetch.
     */
    where?: meeting_roomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of meeting_rooms to fetch.
     */
    orderBy?: meeting_roomOrderByWithRelationInput | meeting_roomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing meeting_rooms.
     */
    cursor?: meeting_roomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` meeting_rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` meeting_rooms.
     */
    skip?: number
    distinct?: Meeting_roomScalarFieldEnum | Meeting_roomScalarFieldEnum[]
  }

  /**
   * meeting_room create
   */
  export type meeting_roomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * The data needed to create a meeting_room.
     */
    data: XOR<meeting_roomCreateInput, meeting_roomUncheckedCreateInput>
  }

  /**
   * meeting_room createMany
   */
  export type meeting_roomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many meeting_rooms.
     */
    data: meeting_roomCreateManyInput | meeting_roomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meeting_room createManyAndReturn
   */
  export type meeting_roomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * The data used to create many meeting_rooms.
     */
    data: meeting_roomCreateManyInput | meeting_roomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * meeting_room update
   */
  export type meeting_roomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * The data needed to update a meeting_room.
     */
    data: XOR<meeting_roomUpdateInput, meeting_roomUncheckedUpdateInput>
    /**
     * Choose, which meeting_room to update.
     */
    where: meeting_roomWhereUniqueInput
  }

  /**
   * meeting_room updateMany
   */
  export type meeting_roomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update meeting_rooms.
     */
    data: XOR<meeting_roomUpdateManyMutationInput, meeting_roomUncheckedUpdateManyInput>
    /**
     * Filter which meeting_rooms to update
     */
    where?: meeting_roomWhereInput
    /**
     * Limit how many meeting_rooms to update.
     */
    limit?: number
  }

  /**
   * meeting_room updateManyAndReturn
   */
  export type meeting_roomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * The data used to update meeting_rooms.
     */
    data: XOR<meeting_roomUpdateManyMutationInput, meeting_roomUncheckedUpdateManyInput>
    /**
     * Filter which meeting_rooms to update
     */
    where?: meeting_roomWhereInput
    /**
     * Limit how many meeting_rooms to update.
     */
    limit?: number
  }

  /**
   * meeting_room upsert
   */
  export type meeting_roomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * The filter to search for the meeting_room to update in case it exists.
     */
    where: meeting_roomWhereUniqueInput
    /**
     * In case the meeting_room found by the `where` argument doesn't exist, create a new meeting_room with this data.
     */
    create: XOR<meeting_roomCreateInput, meeting_roomUncheckedCreateInput>
    /**
     * In case the meeting_room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<meeting_roomUpdateInput, meeting_roomUncheckedUpdateInput>
  }

  /**
   * meeting_room delete
   */
  export type meeting_roomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    /**
     * Filter which meeting_room to delete.
     */
    where: meeting_roomWhereUniqueInput
  }

  /**
   * meeting_room deleteMany
   */
  export type meeting_roomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which meeting_rooms to delete
     */
    where?: meeting_roomWhereInput
    /**
     * Limit how many meeting_rooms to delete.
     */
    limit?: number
  }

  /**
   * meeting_room.equipment
   */
  export type meeting_room$equipmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the equipment
     */
    select?: equipmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the equipment
     */
    omit?: equipmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: equipmentInclude<ExtArgs> | null
    where?: equipmentWhereInput
    orderBy?: equipmentOrderByWithRelationInput | equipmentOrderByWithRelationInput[]
    cursor?: equipmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EquipmentScalarFieldEnum | EquipmentScalarFieldEnum[]
  }

  /**
   * meeting_room.reservation
   */
  export type meeting_room$reservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    where?: reservationWhereInput
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    cursor?: reservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * meeting_room.review
   */
  export type meeting_room$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * meeting_room without action
   */
  export type meeting_roomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
  }


  /**
   * Model officer
   */

  export type AggregateOfficer = {
    _count: OfficerCountAggregateOutputType | null
    _avg: OfficerAvgAggregateOutputType | null
    _sum: OfficerSumAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  export type OfficerAvgAggregateOutputType = {
    officer_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type OfficerSumAggregateOutputType = {
    officer_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type OfficerMinAggregateOutputType = {
    officer_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OfficerMaxAggregateOutputType = {
    officer_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OfficerCountAggregateOutputType = {
    officer_id: number
    role_id: number
    first_name: number
    last_name: number
    email: number
    password: number
    citizen_id: number
    position: number
    department: number
    zip_code: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type OfficerAvgAggregateInputType = {
    officer_id?: true
    role_id?: true
    zip_code?: true
  }

  export type OfficerSumAggregateInputType = {
    officer_id?: true
    role_id?: true
    zip_code?: true
  }

  export type OfficerMinAggregateInputType = {
    officer_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type OfficerMaxAggregateInputType = {
    officer_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type OfficerCountAggregateInputType = {
    officer_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OfficerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which officer to aggregate.
     */
    where?: officerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of officers to fetch.
     */
    orderBy?: officerOrderByWithRelationInput | officerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: officerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned officers
    **/
    _count?: true | OfficerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfficerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfficerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfficerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfficerMaxAggregateInputType
  }

  export type GetOfficerAggregateType<T extends OfficerAggregateArgs> = {
        [P in keyof T & keyof AggregateOfficer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfficer[P]>
      : GetScalarType<T[P], AggregateOfficer[P]>
  }




  export type officerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: officerWhereInput
    orderBy?: officerOrderByWithAggregationInput | officerOrderByWithAggregationInput[]
    by: OfficerScalarFieldEnum[] | OfficerScalarFieldEnum
    having?: officerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfficerCountAggregateInputType | true
    _avg?: OfficerAvgAggregateInputType
    _sum?: OfficerSumAggregateInputType
    _min?: OfficerMinAggregateInputType
    _max?: OfficerMaxAggregateInputType
  }

  export type OfficerGroupByOutputType = {
    officer_id: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
    _count: OfficerCountAggregateOutputType | null
    _avg: OfficerAvgAggregateOutputType | null
    _sum: OfficerSumAggregateOutputType | null
    _min: OfficerMinAggregateOutputType | null
    _max: OfficerMaxAggregateOutputType | null
  }

  type GetOfficerGroupByPayload<T extends officerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfficerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfficerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfficerGroupByOutputType[P]>
            : GetScalarType<T[P], OfficerGroupByOutputType[P]>
        }
      >
    >


  export type officerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    officer_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    reservation?: boolean | officer$reservationArgs<ExtArgs>
    _count?: boolean | OfficerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type officerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    officer_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type officerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    officer_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["officer"]>

  export type officerSelectScalar = {
    officer_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type officerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"officer_id" | "role_id" | "first_name" | "last_name" | "email" | "password" | "citizen_id" | "position" | "department" | "zip_code" | "created_at" | "updated_at", ExtArgs["result"]["officer"]>
  export type officerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    reservation?: boolean | officer$reservationArgs<ExtArgs>
    _count?: boolean | OfficerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type officerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }
  export type officerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }

  export type $officerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "officer"
    objects: {
      roles: Prisma.$rolesPayload<ExtArgs>
      reservation: Prisma.$reservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      officer_id: number
      role_id: number
      first_name: string
      last_name: string
      email: string
      password: string
      citizen_id: string | null
      position: string | null
      department: string | null
      zip_code: number | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["officer"]>
    composites: {}
  }

  type officerGetPayload<S extends boolean | null | undefined | officerDefaultArgs> = $Result.GetResult<Prisma.$officerPayload, S>

  type officerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<officerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfficerCountAggregateInputType | true
    }

  export interface officerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['officer'], meta: { name: 'officer' } }
    /**
     * Find zero or one Officer that matches the filter.
     * @param {officerFindUniqueArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends officerFindUniqueArgs>(args: SelectSubset<T, officerFindUniqueArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Officer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {officerFindUniqueOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends officerFindUniqueOrThrowArgs>(args: SelectSubset<T, officerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerFindFirstArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends officerFindFirstArgs>(args?: SelectSubset<T, officerFindFirstArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Officer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerFindFirstOrThrowArgs} args - Arguments to find a Officer
     * @example
     * // Get one Officer
     * const officer = await prisma.officer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends officerFindFirstOrThrowArgs>(args?: SelectSubset<T, officerFindFirstOrThrowArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Officers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Officers
     * const officers = await prisma.officer.findMany()
     * 
     * // Get first 10 Officers
     * const officers = await prisma.officer.findMany({ take: 10 })
     * 
     * // Only select the `officer_id`
     * const officerWithOfficer_idOnly = await prisma.officer.findMany({ select: { officer_id: true } })
     * 
     */
    findMany<T extends officerFindManyArgs>(args?: SelectSubset<T, officerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Officer.
     * @param {officerCreateArgs} args - Arguments to create a Officer.
     * @example
     * // Create one Officer
     * const Officer = await prisma.officer.create({
     *   data: {
     *     // ... data to create a Officer
     *   }
     * })
     * 
     */
    create<T extends officerCreateArgs>(args: SelectSubset<T, officerCreateArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Officers.
     * @param {officerCreateManyArgs} args - Arguments to create many Officers.
     * @example
     * // Create many Officers
     * const officer = await prisma.officer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends officerCreateManyArgs>(args?: SelectSubset<T, officerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Officers and returns the data saved in the database.
     * @param {officerCreateManyAndReturnArgs} args - Arguments to create many Officers.
     * @example
     * // Create many Officers
     * const officer = await prisma.officer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Officers and only return the `officer_id`
     * const officerWithOfficer_idOnly = await prisma.officer.createManyAndReturn({
     *   select: { officer_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends officerCreateManyAndReturnArgs>(args?: SelectSubset<T, officerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Officer.
     * @param {officerDeleteArgs} args - Arguments to delete one Officer.
     * @example
     * // Delete one Officer
     * const Officer = await prisma.officer.delete({
     *   where: {
     *     // ... filter to delete one Officer
     *   }
     * })
     * 
     */
    delete<T extends officerDeleteArgs>(args: SelectSubset<T, officerDeleteArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Officer.
     * @param {officerUpdateArgs} args - Arguments to update one Officer.
     * @example
     * // Update one Officer
     * const officer = await prisma.officer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends officerUpdateArgs>(args: SelectSubset<T, officerUpdateArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Officers.
     * @param {officerDeleteManyArgs} args - Arguments to filter Officers to delete.
     * @example
     * // Delete a few Officers
     * const { count } = await prisma.officer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends officerDeleteManyArgs>(args?: SelectSubset<T, officerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Officers
     * const officer = await prisma.officer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends officerUpdateManyArgs>(args: SelectSubset<T, officerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Officers and returns the data updated in the database.
     * @param {officerUpdateManyAndReturnArgs} args - Arguments to update many Officers.
     * @example
     * // Update many Officers
     * const officer = await prisma.officer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Officers and only return the `officer_id`
     * const officerWithOfficer_idOnly = await prisma.officer.updateManyAndReturn({
     *   select: { officer_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends officerUpdateManyAndReturnArgs>(args: SelectSubset<T, officerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Officer.
     * @param {officerUpsertArgs} args - Arguments to update or create a Officer.
     * @example
     * // Update or create a Officer
     * const officer = await prisma.officer.upsert({
     *   create: {
     *     // ... data to create a Officer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Officer we want to update
     *   }
     * })
     */
    upsert<T extends officerUpsertArgs>(args: SelectSubset<T, officerUpsertArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Officers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerCountArgs} args - Arguments to filter Officers to count.
     * @example
     * // Count the number of Officers
     * const count = await prisma.officer.count({
     *   where: {
     *     // ... the filter for the Officers we want to count
     *   }
     * })
    **/
    count<T extends officerCountArgs>(
      args?: Subset<T, officerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfficerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfficerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfficerAggregateArgs>(args: Subset<T, OfficerAggregateArgs>): Prisma.PrismaPromise<GetOfficerAggregateType<T>>

    /**
     * Group by Officer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {officerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends officerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: officerGroupByArgs['orderBy'] }
        : { orderBy?: officerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, officerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfficerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the officer model
   */
  readonly fields: officerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for officer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__officerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends rolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, rolesDefaultArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reservation<T extends officer$reservationArgs<ExtArgs> = {}>(args?: Subset<T, officer$reservationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the officer model
   */
  interface officerFieldRefs {
    readonly officer_id: FieldRef<"officer", 'Int'>
    readonly role_id: FieldRef<"officer", 'Int'>
    readonly first_name: FieldRef<"officer", 'String'>
    readonly last_name: FieldRef<"officer", 'String'>
    readonly email: FieldRef<"officer", 'String'>
    readonly password: FieldRef<"officer", 'String'>
    readonly citizen_id: FieldRef<"officer", 'String'>
    readonly position: FieldRef<"officer", 'String'>
    readonly department: FieldRef<"officer", 'String'>
    readonly zip_code: FieldRef<"officer", 'Int'>
    readonly created_at: FieldRef<"officer", 'DateTime'>
    readonly updated_at: FieldRef<"officer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * officer findUnique
   */
  export type officerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter, which officer to fetch.
     */
    where: officerWhereUniqueInput
  }

  /**
   * officer findUniqueOrThrow
   */
  export type officerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter, which officer to fetch.
     */
    where: officerWhereUniqueInput
  }

  /**
   * officer findFirst
   */
  export type officerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter, which officer to fetch.
     */
    where?: officerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of officers to fetch.
     */
    orderBy?: officerOrderByWithRelationInput | officerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for officers.
     */
    cursor?: officerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * officer findFirstOrThrow
   */
  export type officerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter, which officer to fetch.
     */
    where?: officerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of officers to fetch.
     */
    orderBy?: officerOrderByWithRelationInput | officerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for officers.
     */
    cursor?: officerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` officers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of officers.
     */
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * officer findMany
   */
  export type officerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter, which officers to fetch.
     */
    where?: officerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of officers to fetch.
     */
    orderBy?: officerOrderByWithRelationInput | officerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing officers.
     */
    cursor?: officerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` officers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` officers.
     */
    skip?: number
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * officer create
   */
  export type officerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * The data needed to create a officer.
     */
    data: XOR<officerCreateInput, officerUncheckedCreateInput>
  }

  /**
   * officer createMany
   */
  export type officerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many officers.
     */
    data: officerCreateManyInput | officerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * officer createManyAndReturn
   */
  export type officerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * The data used to create many officers.
     */
    data: officerCreateManyInput | officerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * officer update
   */
  export type officerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * The data needed to update a officer.
     */
    data: XOR<officerUpdateInput, officerUncheckedUpdateInput>
    /**
     * Choose, which officer to update.
     */
    where: officerWhereUniqueInput
  }

  /**
   * officer updateMany
   */
  export type officerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update officers.
     */
    data: XOR<officerUpdateManyMutationInput, officerUncheckedUpdateManyInput>
    /**
     * Filter which officers to update
     */
    where?: officerWhereInput
    /**
     * Limit how many officers to update.
     */
    limit?: number
  }

  /**
   * officer updateManyAndReturn
   */
  export type officerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * The data used to update officers.
     */
    data: XOR<officerUpdateManyMutationInput, officerUncheckedUpdateManyInput>
    /**
     * Filter which officers to update
     */
    where?: officerWhereInput
    /**
     * Limit how many officers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * officer upsert
   */
  export type officerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * The filter to search for the officer to update in case it exists.
     */
    where: officerWhereUniqueInput
    /**
     * In case the officer found by the `where` argument doesn't exist, create a new officer with this data.
     */
    create: XOR<officerCreateInput, officerUncheckedCreateInput>
    /**
     * In case the officer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<officerUpdateInput, officerUncheckedUpdateInput>
  }

  /**
   * officer delete
   */
  export type officerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    /**
     * Filter which officer to delete.
     */
    where: officerWhereUniqueInput
  }

  /**
   * officer deleteMany
   */
  export type officerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which officers to delete
     */
    where?: officerWhereInput
    /**
     * Limit how many officers to delete.
     */
    limit?: number
  }

  /**
   * officer.reservation
   */
  export type officer$reservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    where?: reservationWhereInput
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    cursor?: reservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * officer without action
   */
  export type officerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
  }


  /**
   * Model reservation
   */

  export type AggregateReservation = {
    _count: ReservationCountAggregateOutputType | null
    _avg: ReservationAvgAggregateOutputType | null
    _sum: ReservationSumAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  export type ReservationAvgAggregateOutputType = {
    reservation_id: number | null
    user_id: number | null
    room_id: number | null
    officer_id: number | null
  }

  export type ReservationSumAggregateOutputType = {
    reservation_id: number | null
    user_id: number | null
    room_id: number | null
    officer_id: number | null
  }

  export type ReservationMinAggregateOutputType = {
    reservation_id: number | null
    user_id: number | null
    room_id: number | null
    start_at: Date | null
    end_at: Date | null
    start_time: Date | null
    end_time: Date | null
    status_r: string | null
    officer_id: number | null
    details_r: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReservationMaxAggregateOutputType = {
    reservation_id: number | null
    user_id: number | null
    room_id: number | null
    start_at: Date | null
    end_at: Date | null
    start_time: Date | null
    end_time: Date | null
    status_r: string | null
    officer_id: number | null
    details_r: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ReservationCountAggregateOutputType = {
    reservation_id: number
    user_id: number
    room_id: number
    start_at: number
    end_at: number
    start_time: number
    end_time: number
    status_r: number
    officer_id: number
    details_r: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ReservationAvgAggregateInputType = {
    reservation_id?: true
    user_id?: true
    room_id?: true
    officer_id?: true
  }

  export type ReservationSumAggregateInputType = {
    reservation_id?: true
    user_id?: true
    room_id?: true
    officer_id?: true
  }

  export type ReservationMinAggregateInputType = {
    reservation_id?: true
    user_id?: true
    room_id?: true
    start_at?: true
    end_at?: true
    start_time?: true
    end_time?: true
    status_r?: true
    officer_id?: true
    details_r?: true
    created_at?: true
    updated_at?: true
  }

  export type ReservationMaxAggregateInputType = {
    reservation_id?: true
    user_id?: true
    room_id?: true
    start_at?: true
    end_at?: true
    start_time?: true
    end_time?: true
    status_r?: true
    officer_id?: true
    details_r?: true
    created_at?: true
    updated_at?: true
  }

  export type ReservationCountAggregateInputType = {
    reservation_id?: true
    user_id?: true
    room_id?: true
    start_at?: true
    end_at?: true
    start_time?: true
    end_time?: true
    status_r?: true
    officer_id?: true
    details_r?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ReservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reservation to aggregate.
     */
    where?: reservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservations to fetch.
     */
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reservations
    **/
    _count?: true | ReservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReservationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReservationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservationMaxAggregateInputType
  }

  export type GetReservationAggregateType<T extends ReservationAggregateArgs> = {
        [P in keyof T & keyof AggregateReservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReservation[P]>
      : GetScalarType<T[P], AggregateReservation[P]>
  }




  export type reservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reservationWhereInput
    orderBy?: reservationOrderByWithAggregationInput | reservationOrderByWithAggregationInput[]
    by: ReservationScalarFieldEnum[] | ReservationScalarFieldEnum
    having?: reservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservationCountAggregateInputType | true
    _avg?: ReservationAvgAggregateInputType
    _sum?: ReservationSumAggregateInputType
    _min?: ReservationMinAggregateInputType
    _max?: ReservationMaxAggregateInputType
  }

  export type ReservationGroupByOutputType = {
    reservation_id: number
    user_id: number | null
    room_id: number | null
    start_at: Date
    end_at: Date
    start_time: Date | null
    end_time: Date | null
    status_r: string | null
    officer_id: number | null
    details_r: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: ReservationCountAggregateOutputType | null
    _avg: ReservationAvgAggregateOutputType | null
    _sum: ReservationSumAggregateOutputType | null
    _min: ReservationMinAggregateOutputType | null
    _max: ReservationMaxAggregateOutputType | null
  }

  type GetReservationGroupByPayload<T extends reservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservationGroupByOutputType[P]>
            : GetScalarType<T[P], ReservationGroupByOutputType[P]>
        }
      >
    >


  export type reservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservation_id?: boolean
    user_id?: boolean
    room_id?: boolean
    start_at?: boolean
    end_at?: boolean
    start_time?: boolean
    end_time?: boolean
    status_r?: boolean
    officer_id?: boolean
    details_r?: boolean
    created_at?: boolean
    updated_at?: boolean
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type reservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservation_id?: boolean
    user_id?: boolean
    room_id?: boolean
    start_at?: boolean
    end_at?: boolean
    start_time?: boolean
    end_time?: boolean
    status_r?: boolean
    officer_id?: boolean
    details_r?: boolean
    created_at?: boolean
    updated_at?: boolean
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type reservationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    reservation_id?: boolean
    user_id?: boolean
    room_id?: boolean
    start_at?: boolean
    end_at?: boolean
    start_time?: boolean
    end_time?: boolean
    status_r?: boolean
    officer_id?: boolean
    details_r?: boolean
    created_at?: boolean
    updated_at?: boolean
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }, ExtArgs["result"]["reservation"]>

  export type reservationSelectScalar = {
    reservation_id?: boolean
    user_id?: boolean
    room_id?: boolean
    start_at?: boolean
    end_at?: boolean
    start_time?: boolean
    end_time?: boolean
    status_r?: boolean
    officer_id?: boolean
    details_r?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type reservationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"reservation_id" | "user_id" | "room_id" | "start_at" | "end_at" | "start_time" | "end_time" | "status_r" | "officer_id" | "details_r" | "created_at" | "updated_at", ExtArgs["result"]["reservation"]>
  export type reservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }
  export type reservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }
  export type reservationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    officer?: boolean | reservation$officerArgs<ExtArgs>
    meeting_room?: boolean | reservation$meeting_roomArgs<ExtArgs>
    users?: boolean | reservation$usersArgs<ExtArgs>
  }

  export type $reservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "reservation"
    objects: {
      officer: Prisma.$officerPayload<ExtArgs> | null
      meeting_room: Prisma.$meeting_roomPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      reservation_id: number
      user_id: number | null
      room_id: number | null
      start_at: Date
      end_at: Date
      start_time: Date | null
      end_time: Date | null
      status_r: string | null
      officer_id: number | null
      details_r: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["reservation"]>
    composites: {}
  }

  type reservationGetPayload<S extends boolean | null | undefined | reservationDefaultArgs> = $Result.GetResult<Prisma.$reservationPayload, S>

  type reservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reservationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReservationCountAggregateInputType | true
    }

  export interface reservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['reservation'], meta: { name: 'reservation' } }
    /**
     * Find zero or one Reservation that matches the filter.
     * @param {reservationFindUniqueArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reservationFindUniqueArgs>(args: SelectSubset<T, reservationFindUniqueArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reservation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reservationFindUniqueOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reservationFindUniqueOrThrowArgs>(args: SelectSubset<T, reservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationFindFirstArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reservationFindFirstArgs>(args?: SelectSubset<T, reservationFindFirstArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reservation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationFindFirstOrThrowArgs} args - Arguments to find a Reservation
     * @example
     * // Get one Reservation
     * const reservation = await prisma.reservation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reservationFindFirstOrThrowArgs>(args?: SelectSubset<T, reservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reservations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservations
     * const reservations = await prisma.reservation.findMany()
     * 
     * // Get first 10 Reservations
     * const reservations = await prisma.reservation.findMany({ take: 10 })
     * 
     * // Only select the `reservation_id`
     * const reservationWithReservation_idOnly = await prisma.reservation.findMany({ select: { reservation_id: true } })
     * 
     */
    findMany<T extends reservationFindManyArgs>(args?: SelectSubset<T, reservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reservation.
     * @param {reservationCreateArgs} args - Arguments to create a Reservation.
     * @example
     * // Create one Reservation
     * const Reservation = await prisma.reservation.create({
     *   data: {
     *     // ... data to create a Reservation
     *   }
     * })
     * 
     */
    create<T extends reservationCreateArgs>(args: SelectSubset<T, reservationCreateArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reservations.
     * @param {reservationCreateManyArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reservationCreateManyArgs>(args?: SelectSubset<T, reservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservations and returns the data saved in the database.
     * @param {reservationCreateManyAndReturnArgs} args - Arguments to create many Reservations.
     * @example
     * // Create many Reservations
     * const reservation = await prisma.reservation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservations and only return the `reservation_id`
     * const reservationWithReservation_idOnly = await prisma.reservation.createManyAndReturn({
     *   select: { reservation_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reservationCreateManyAndReturnArgs>(args?: SelectSubset<T, reservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reservation.
     * @param {reservationDeleteArgs} args - Arguments to delete one Reservation.
     * @example
     * // Delete one Reservation
     * const Reservation = await prisma.reservation.delete({
     *   where: {
     *     // ... filter to delete one Reservation
     *   }
     * })
     * 
     */
    delete<T extends reservationDeleteArgs>(args: SelectSubset<T, reservationDeleteArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reservation.
     * @param {reservationUpdateArgs} args - Arguments to update one Reservation.
     * @example
     * // Update one Reservation
     * const reservation = await prisma.reservation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reservationUpdateArgs>(args: SelectSubset<T, reservationUpdateArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reservations.
     * @param {reservationDeleteManyArgs} args - Arguments to filter Reservations to delete.
     * @example
     * // Delete a few Reservations
     * const { count } = await prisma.reservation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reservationDeleteManyArgs>(args?: SelectSubset<T, reservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reservationUpdateManyArgs>(args: SelectSubset<T, reservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservations and returns the data updated in the database.
     * @param {reservationUpdateManyAndReturnArgs} args - Arguments to update many Reservations.
     * @example
     * // Update many Reservations
     * const reservation = await prisma.reservation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reservations and only return the `reservation_id`
     * const reservationWithReservation_idOnly = await prisma.reservation.updateManyAndReturn({
     *   select: { reservation_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends reservationUpdateManyAndReturnArgs>(args: SelectSubset<T, reservationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reservation.
     * @param {reservationUpsertArgs} args - Arguments to update or create a Reservation.
     * @example
     * // Update or create a Reservation
     * const reservation = await prisma.reservation.upsert({
     *   create: {
     *     // ... data to create a Reservation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reservation we want to update
     *   }
     * })
     */
    upsert<T extends reservationUpsertArgs>(args: SelectSubset<T, reservationUpsertArgs<ExtArgs>>): Prisma__reservationClient<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reservations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationCountArgs} args - Arguments to filter Reservations to count.
     * @example
     * // Count the number of Reservations
     * const count = await prisma.reservation.count({
     *   where: {
     *     // ... the filter for the Reservations we want to count
     *   }
     * })
    **/
    count<T extends reservationCountArgs>(
      args?: Subset<T, reservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservationAggregateArgs>(args: Subset<T, ReservationAggregateArgs>): Prisma.PrismaPromise<GetReservationAggregateType<T>>

    /**
     * Group by Reservation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reservationGroupByArgs['orderBy'] }
        : { orderBy?: reservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the reservation model
   */
  readonly fields: reservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for reservation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    officer<T extends reservation$officerArgs<ExtArgs> = {}>(args?: Subset<T, reservation$officerArgs<ExtArgs>>): Prisma__officerClient<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    meeting_room<T extends reservation$meeting_roomArgs<ExtArgs> = {}>(args?: Subset<T, reservation$meeting_roomArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends reservation$usersArgs<ExtArgs> = {}>(args?: Subset<T, reservation$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the reservation model
   */
  interface reservationFieldRefs {
    readonly reservation_id: FieldRef<"reservation", 'Int'>
    readonly user_id: FieldRef<"reservation", 'Int'>
    readonly room_id: FieldRef<"reservation", 'Int'>
    readonly start_at: FieldRef<"reservation", 'DateTime'>
    readonly end_at: FieldRef<"reservation", 'DateTime'>
    readonly start_time: FieldRef<"reservation", 'DateTime'>
    readonly end_time: FieldRef<"reservation", 'DateTime'>
    readonly status_r: FieldRef<"reservation", 'String'>
    readonly officer_id: FieldRef<"reservation", 'Int'>
    readonly details_r: FieldRef<"reservation", 'String'>
    readonly created_at: FieldRef<"reservation", 'DateTime'>
    readonly updated_at: FieldRef<"reservation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * reservation findUnique
   */
  export type reservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter, which reservation to fetch.
     */
    where: reservationWhereUniqueInput
  }

  /**
   * reservation findUniqueOrThrow
   */
  export type reservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter, which reservation to fetch.
     */
    where: reservationWhereUniqueInput
  }

  /**
   * reservation findFirst
   */
  export type reservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter, which reservation to fetch.
     */
    where?: reservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservations to fetch.
     */
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reservations.
     */
    cursor?: reservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * reservation findFirstOrThrow
   */
  export type reservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter, which reservation to fetch.
     */
    where?: reservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservations to fetch.
     */
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reservations.
     */
    cursor?: reservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reservations.
     */
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * reservation findMany
   */
  export type reservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter, which reservations to fetch.
     */
    where?: reservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reservations to fetch.
     */
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reservations.
     */
    cursor?: reservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reservations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reservations.
     */
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * reservation create
   */
  export type reservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * The data needed to create a reservation.
     */
    data: XOR<reservationCreateInput, reservationUncheckedCreateInput>
  }

  /**
   * reservation createMany
   */
  export type reservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reservations.
     */
    data: reservationCreateManyInput | reservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * reservation createManyAndReturn
   */
  export type reservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * The data used to create many reservations.
     */
    data: reservationCreateManyInput | reservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * reservation update
   */
  export type reservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * The data needed to update a reservation.
     */
    data: XOR<reservationUpdateInput, reservationUncheckedUpdateInput>
    /**
     * Choose, which reservation to update.
     */
    where: reservationWhereUniqueInput
  }

  /**
   * reservation updateMany
   */
  export type reservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reservations.
     */
    data: XOR<reservationUpdateManyMutationInput, reservationUncheckedUpdateManyInput>
    /**
     * Filter which reservations to update
     */
    where?: reservationWhereInput
    /**
     * Limit how many reservations to update.
     */
    limit?: number
  }

  /**
   * reservation updateManyAndReturn
   */
  export type reservationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * The data used to update reservations.
     */
    data: XOR<reservationUpdateManyMutationInput, reservationUncheckedUpdateManyInput>
    /**
     * Filter which reservations to update
     */
    where?: reservationWhereInput
    /**
     * Limit how many reservations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * reservation upsert
   */
  export type reservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * The filter to search for the reservation to update in case it exists.
     */
    where: reservationWhereUniqueInput
    /**
     * In case the reservation found by the `where` argument doesn't exist, create a new reservation with this data.
     */
    create: XOR<reservationCreateInput, reservationUncheckedCreateInput>
    /**
     * In case the reservation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reservationUpdateInput, reservationUncheckedUpdateInput>
  }

  /**
   * reservation delete
   */
  export type reservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    /**
     * Filter which reservation to delete.
     */
    where: reservationWhereUniqueInput
  }

  /**
   * reservation deleteMany
   */
  export type reservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reservations to delete
     */
    where?: reservationWhereInput
    /**
     * Limit how many reservations to delete.
     */
    limit?: number
  }

  /**
   * reservation.officer
   */
  export type reservation$officerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    where?: officerWhereInput
  }

  /**
   * reservation.meeting_room
   */
  export type reservation$meeting_roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    where?: meeting_roomWhereInput
  }

  /**
   * reservation.users
   */
  export type reservation$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * reservation without action
   */
  export type reservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
  }


  /**
   * Model review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    review_id: number | null
    user_id: number | null
    room_id: number | null
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    review_id: number | null
    user_id: number | null
    room_id: number | null
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    review_id: number | null
    user_id: number | null
    room_id: number | null
    comment: string | null
    rating: number | null
    created_at: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    review_id: number | null
    user_id: number | null
    room_id: number | null
    comment: string | null
    rating: number | null
    created_at: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    review_id: number
    user_id: number
    room_id: number
    comment: number
    rating: number
    created_at: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    review_id?: true
    user_id?: true
    room_id?: true
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    review_id?: true
    user_id?: true
    room_id?: true
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    review_id?: true
    user_id?: true
    room_id?: true
    comment?: true
    rating?: true
    created_at?: true
  }

  export type ReviewMaxAggregateInputType = {
    review_id?: true
    user_id?: true
    room_id?: true
    comment?: true
    rating?: true
    created_at?: true
  }

  export type ReviewCountAggregateInputType = {
    review_id?: true
    user_id?: true
    room_id?: true
    comment?: true
    rating?: true
    created_at?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which review to aggregate.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type reviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithAggregationInput | reviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: reviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    review_id: number
    user_id: number | null
    room_id: number | null
    comment: string | null
    rating: number | null
    created_at: Date | null
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends reviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type reviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    user_id?: boolean
    room_id?: boolean
    comment?: boolean
    rating?: boolean
    created_at?: boolean
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    user_id?: boolean
    room_id?: boolean
    comment?: boolean
    rating?: boolean
    created_at?: boolean
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    review_id?: boolean
    user_id?: boolean
    room_id?: boolean
    comment?: boolean
    rating?: boolean
    created_at?: boolean
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type reviewSelectScalar = {
    review_id?: boolean
    user_id?: boolean
    room_id?: boolean
    comment?: boolean
    rating?: boolean
    created_at?: boolean
  }

  export type reviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"review_id" | "user_id" | "room_id" | "comment" | "rating" | "created_at", ExtArgs["result"]["review"]>
  export type reviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }
  export type reviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }
  export type reviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meeting_room?: boolean | review$meeting_roomArgs<ExtArgs>
    users?: boolean | review$usersArgs<ExtArgs>
  }

  export type $reviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "review"
    objects: {
      meeting_room: Prisma.$meeting_roomPayload<ExtArgs> | null
      users: Prisma.$usersPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      review_id: number
      user_id: number | null
      room_id: number | null
      comment: string | null
      rating: number | null
      created_at: Date | null
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type reviewGetPayload<S extends boolean | null | undefined | reviewDefaultArgs> = $Result.GetResult<Prisma.$reviewPayload, S>

  type reviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface reviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['review'], meta: { name: 'review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {reviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewFindUniqueArgs>(args: SelectSubset<T, reviewFindUniqueArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewFindFirstArgs>(args?: SelectSubset<T, reviewFindFirstArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `review_id`
     * const reviewWithReview_idOnly = await prisma.review.findMany({ select: { review_id: true } })
     * 
     */
    findMany<T extends reviewFindManyArgs>(args?: SelectSubset<T, reviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {reviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends reviewCreateArgs>(args: SelectSubset<T, reviewCreateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewCreateManyArgs>(args?: SelectSubset<T, reviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {reviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `review_id`
     * const reviewWithReview_idOnly = await prisma.review.createManyAndReturn({
     *   select: { review_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends reviewCreateManyAndReturnArgs>(args?: SelectSubset<T, reviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {reviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends reviewDeleteArgs>(args: SelectSubset<T, reviewDeleteArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {reviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewUpdateArgs>(args: SelectSubset<T, reviewUpdateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewDeleteManyArgs>(args?: SelectSubset<T, reviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewUpdateManyArgs>(args: SelectSubset<T, reviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {reviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `review_id`
     * const reviewWithReview_idOnly = await prisma.review.updateManyAndReturn({
     *   select: { review_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends reviewUpdateManyAndReturnArgs>(args: SelectSubset<T, reviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {reviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends reviewUpsertArgs>(args: SelectSubset<T, reviewUpsertArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewCountArgs>(
      args?: Subset<T, reviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewGroupByArgs['orderBy'] }
        : { orderBy?: reviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the review model
   */
  readonly fields: reviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    meeting_room<T extends review$meeting_roomArgs<ExtArgs> = {}>(args?: Subset<T, review$meeting_roomArgs<ExtArgs>>): Prisma__meeting_roomClient<$Result.GetResult<Prisma.$meeting_roomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    users<T extends review$usersArgs<ExtArgs> = {}>(args?: Subset<T, review$usersArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the review model
   */
  interface reviewFieldRefs {
    readonly review_id: FieldRef<"review", 'Int'>
    readonly user_id: FieldRef<"review", 'Int'>
    readonly room_id: FieldRef<"review", 'Int'>
    readonly comment: FieldRef<"review", 'String'>
    readonly rating: FieldRef<"review", 'Int'>
    readonly created_at: FieldRef<"review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * review findUnique
   */
  export type reviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findUniqueOrThrow
   */
  export type reviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findFirst
   */
  export type reviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findFirstOrThrow
   */
  export type reviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findMany
   */
  export type reviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review create
   */
  export type reviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to create a review.
     */
    data?: XOR<reviewCreateInput, reviewUncheckedCreateInput>
  }

  /**
   * review createMany
   */
  export type reviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewCreateManyInput | reviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * review createManyAndReturn
   */
  export type reviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * The data used to create many reviews.
     */
    data: reviewCreateManyInput | reviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * review update
   */
  export type reviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to update a review.
     */
    data: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
    /**
     * Choose, which review to update.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review updateMany
   */
  export type reviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * review updateManyAndReturn
   */
  export type reviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * review upsert
   */
  export type reviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The filter to search for the review to update in case it exists.
     */
    where: reviewWhereUniqueInput
    /**
     * In case the review found by the `where` argument doesn't exist, create a new review with this data.
     */
    create: XOR<reviewCreateInput, reviewUncheckedCreateInput>
    /**
     * In case the review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
  }

  /**
   * review delete
   */
  export type reviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter which review to delete.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review deleteMany
   */
  export type reviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * review.meeting_room
   */
  export type review$meeting_roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the meeting_room
     */
    select?: meeting_roomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the meeting_room
     */
    omit?: meeting_roomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: meeting_roomInclude<ExtArgs> | null
    where?: meeting_roomWhereInput
  }

  /**
   * review.users
   */
  export type review$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
  }

  /**
   * review without action
   */
  export type reviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
  }


  /**
   * Model roles
   */

  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesAvgAggregateOutputType = {
    role_id: number | null
  }

  export type RolesSumAggregateOutputType = {
    role_id: number | null
  }

  export type RolesMinAggregateOutputType = {
    role_id: number | null
    role_name: string | null
    role_status: string | null
  }

  export type RolesMaxAggregateOutputType = {
    role_id: number | null
    role_name: string | null
    role_status: string | null
  }

  export type RolesCountAggregateOutputType = {
    role_id: number
    role_name: number
    role_status: number
    _all: number
  }


  export type RolesAvgAggregateInputType = {
    role_id?: true
  }

  export type RolesSumAggregateInputType = {
    role_id?: true
  }

  export type RolesMinAggregateInputType = {
    role_id?: true
    role_name?: true
    role_status?: true
  }

  export type RolesMaxAggregateInputType = {
    role_id?: true
    role_name?: true
    role_status?: true
  }

  export type RolesCountAggregateInputType = {
    role_id?: true
    role_name?: true
    role_status?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to aggregate.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RolesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RolesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type rolesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: rolesWhereInput
    orderBy?: rolesOrderByWithAggregationInput | rolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: rolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _avg?: RolesAvgAggregateInputType
    _sum?: RolesSumAggregateInputType
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }

  export type RolesGroupByOutputType = {
    role_id: number
    role_name: string
    role_status: string | null
    _count: RolesCountAggregateOutputType | null
    _avg: RolesAvgAggregateOutputType | null
    _sum: RolesSumAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends rolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type rolesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_status?: boolean
    admin?: boolean | roles$adminArgs<ExtArgs>
    officer?: boolean | roles$officerArgs<ExtArgs>
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_status?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    role_id?: boolean
    role_name?: boolean
    role_status?: boolean
  }, ExtArgs["result"]["roles"]>

  export type rolesSelectScalar = {
    role_id?: boolean
    role_name?: boolean
    role_status?: boolean
  }

  export type rolesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"role_id" | "role_name" | "role_status", ExtArgs["result"]["roles"]>
  export type rolesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | roles$adminArgs<ExtArgs>
    officer?: boolean | roles$officerArgs<ExtArgs>
    users?: boolean | roles$usersArgs<ExtArgs>
    _count?: boolean | RolesCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type rolesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type rolesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $rolesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "roles"
    objects: {
      admin: Prisma.$adminPayload<ExtArgs>[]
      officer: Prisma.$officerPayload<ExtArgs>[]
      users: Prisma.$usersPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      role_id: number
      role_name: string
      role_status: string | null
    }, ExtArgs["result"]["roles"]>
    composites: {}
  }

  type rolesGetPayload<S extends boolean | null | undefined | rolesDefaultArgs> = $Result.GetResult<Prisma.$rolesPayload, S>

  type rolesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<rolesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface rolesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['roles'], meta: { name: 'roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {rolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends rolesFindUniqueArgs>(args: SelectSubset<T, rolesFindUniqueArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Roles that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {rolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends rolesFindUniqueOrThrowArgs>(args: SelectSubset<T, rolesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends rolesFindFirstArgs>(args?: SelectSubset<T, rolesFindFirstArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends rolesFindFirstOrThrowArgs>(args?: SelectSubset<T, rolesFindFirstOrThrowArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `role_id`
     * const rolesWithRole_idOnly = await prisma.roles.findMany({ select: { role_id: true } })
     * 
     */
    findMany<T extends rolesFindManyArgs>(args?: SelectSubset<T, rolesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Roles.
     * @param {rolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
     */
    create<T extends rolesCreateArgs>(args: SelectSubset<T, rolesCreateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {rolesCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends rolesCreateManyArgs>(args?: SelectSubset<T, rolesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {rolesCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const roles = await prisma.roles.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `role_id`
     * const rolesWithRole_idOnly = await prisma.roles.createManyAndReturn({
     *   select: { role_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends rolesCreateManyAndReturnArgs>(args?: SelectSubset<T, rolesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Roles.
     * @param {rolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
     */
    delete<T extends rolesDeleteArgs>(args: SelectSubset<T, rolesDeleteArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Roles.
     * @param {rolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends rolesUpdateArgs>(args: SelectSubset<T, rolesUpdateArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {rolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends rolesDeleteManyArgs>(args?: SelectSubset<T, rolesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends rolesUpdateManyArgs>(args: SelectSubset<T, rolesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {rolesUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `role_id`
     * const rolesWithRole_idOnly = await prisma.roles.updateManyAndReturn({
     *   select: { role_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends rolesUpdateManyAndReturnArgs>(args: SelectSubset<T, rolesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Roles.
     * @param {rolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
     */
    upsert<T extends rolesUpsertArgs>(args: SelectSubset<T, rolesUpsertArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends rolesCountArgs>(
      args?: Subset<T, rolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {rolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends rolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: rolesGroupByArgs['orderBy'] }
        : { orderBy?: rolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, rolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the roles model
   */
  readonly fields: rolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__rolesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends roles$adminArgs<ExtArgs> = {}>(args?: Subset<T, roles$adminArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$adminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    officer<T extends roles$officerArgs<ExtArgs> = {}>(args?: Subset<T, roles$officerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$officerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends roles$usersArgs<ExtArgs> = {}>(args?: Subset<T, roles$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the roles model
   */
  interface rolesFieldRefs {
    readonly role_id: FieldRef<"roles", 'Int'>
    readonly role_name: FieldRef<"roles", 'String'>
    readonly role_status: FieldRef<"roles", 'String'>
  }
    

  // Custom InputTypes
  /**
   * roles findUnique
   */
  export type rolesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findUniqueOrThrow
   */
  export type rolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles findFirst
   */
  export type rolesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findFirstOrThrow
   */
  export type rolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles findMany
   */
  export type rolesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter, which roles to fetch.
     */
    where?: rolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of roles to fetch.
     */
    orderBy?: rolesOrderByWithRelationInput | rolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing roles.
     */
    cursor?: rolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }

  /**
   * roles create
   */
  export type rolesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to create a roles.
     */
    data: XOR<rolesCreateInput, rolesUncheckedCreateInput>
  }

  /**
   * roles createMany
   */
  export type rolesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles createManyAndReturn
   */
  export type rolesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to create many roles.
     */
    data: rolesCreateManyInput | rolesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * roles update
   */
  export type rolesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The data needed to update a roles.
     */
    data: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
    /**
     * Choose, which roles to update.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles updateMany
   */
  export type rolesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles updateManyAndReturn
   */
  export type rolesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * The data used to update roles.
     */
    data: XOR<rolesUpdateManyMutationInput, rolesUncheckedUpdateManyInput>
    /**
     * Filter which roles to update
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to update.
     */
    limit?: number
  }

  /**
   * roles upsert
   */
  export type rolesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * The filter to search for the roles to update in case it exists.
     */
    where: rolesWhereUniqueInput
    /**
     * In case the roles found by the `where` argument doesn't exist, create a new roles with this data.
     */
    create: XOR<rolesCreateInput, rolesUncheckedCreateInput>
    /**
     * In case the roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<rolesUpdateInput, rolesUncheckedUpdateInput>
  }

  /**
   * roles delete
   */
  export type rolesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
    /**
     * Filter which roles to delete.
     */
    where: rolesWhereUniqueInput
  }

  /**
   * roles deleteMany
   */
  export type rolesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which roles to delete
     */
    where?: rolesWhereInput
    /**
     * Limit how many roles to delete.
     */
    limit?: number
  }

  /**
   * roles.admin
   */
  export type roles$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the admin
     */
    select?: adminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the admin
     */
    omit?: adminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: adminInclude<ExtArgs> | null
    where?: adminWhereInput
    orderBy?: adminOrderByWithRelationInput | adminOrderByWithRelationInput[]
    cursor?: adminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * roles.officer
   */
  export type roles$officerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the officer
     */
    select?: officerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the officer
     */
    omit?: officerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: officerInclude<ExtArgs> | null
    where?: officerWhereInput
    orderBy?: officerOrderByWithRelationInput | officerOrderByWithRelationInput[]
    cursor?: officerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfficerScalarFieldEnum | OfficerScalarFieldEnum[]
  }

  /**
   * roles.users
   */
  export type roles$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * roles without action
   */
  export type rolesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the roles
     */
    select?: rolesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the roles
     */
    omit?: rolesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: rolesInclude<ExtArgs> | null
  }


  /**
   * Model users
   */

  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersAvgAggregateOutputType = {
    user_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type UsersSumAggregateOutputType = {
    user_id: number | null
    role_id: number | null
    zip_code: number | null
  }

  export type UsersMinAggregateOutputType = {
    user_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    user_id: number | null
    role_id: number | null
    first_name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    user_id: number
    role_id: number
    first_name: number
    last_name: number
    email: number
    password: number
    citizen_id: number
    position: number
    department: number
    zip_code: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UsersAvgAggregateInputType = {
    user_id?: true
    role_id?: true
    zip_code?: true
  }

  export type UsersSumAggregateInputType = {
    user_id?: true
    role_id?: true
    zip_code?: true
  }

  export type UsersMinAggregateInputType = {
    user_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersMaxAggregateInputType = {
    user_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
  }

  export type UsersCountAggregateInputType = {
    user_id?: true
    role_id?: true
    first_name?: true
    last_name?: true
    email?: true
    password?: true
    citizen_id?: true
    position?: true
    department?: true
    zip_code?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: usersOrderByWithAggregationInput | usersOrderByWithAggregationInput[]
    by: UsersScalarFieldEnum[] | UsersScalarFieldEnum
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _avg?: UsersAvgAggregateInputType
    _sum?: UsersSumAggregateInputType
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }

  export type UsersGroupByOutputType = {
    user_id: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id: string | null
    position: string | null
    department: string | null
    zip_code: number | null
    created_at: Date | null
    updated_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _avg: UsersAvgAggregateOutputType | null
    _sum: UsersSumAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    reservation?: boolean | users$reservationArgs<ExtArgs>
    review?: boolean | users$reviewArgs<ExtArgs>
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    user_id?: boolean
    role_id?: boolean
    first_name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    citizen_id?: boolean
    position?: boolean
    department?: boolean
    zip_code?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "role_id" | "first_name" | "last_name" | "email" | "password" | "citizen_id" | "position" | "department" | "zip_code" | "created_at" | "updated_at", ExtArgs["result"]["users"]>
  export type usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservation?: boolean | users$reservationArgs<ExtArgs>
    review?: boolean | users$reviewArgs<ExtArgs>
    roles?: boolean | rolesDefaultArgs<ExtArgs>
    _count?: boolean | UsersCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usersIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }
  export type usersIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | rolesDefaultArgs<ExtArgs>
  }

  export type $usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "users"
    objects: {
      reservation: Prisma.$reservationPayload<ExtArgs>[]
      review: Prisma.$reviewPayload<ExtArgs>[]
      roles: Prisma.$rolesPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      role_id: number
      first_name: string
      last_name: string
      email: string
      password: string
      citizen_id: string | null
      position: string | null
      department: string | null
      zip_code: number | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["users"]>
    composites: {}
  }

  type usersGetPayload<S extends boolean | null | undefined | usersDefaultArgs> = $Result.GetResult<Prisma.$usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usersFindUniqueArgs>(args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs>(args: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usersFindFirstArgs>(args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs>(args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const usersWithUser_idOnly = await prisma.users.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends usersFindManyArgs>(args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
     */
    create<T extends usersCreateArgs>(args: SelectSubset<T, usersCreateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {usersCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usersCreateManyArgs>(args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {usersCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const users = await prisma.users.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usersCreateManyAndReturnArgs>(args?: SelectSubset<T, usersCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
     */
    delete<T extends usersDeleteArgs>(args: SelectSubset<T, usersDeleteArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usersUpdateArgs>(args: SelectSubset<T, usersUpdateArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usersDeleteManyArgs>(args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usersUpdateManyArgs>(args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {usersUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const usersWithUser_idOnly = await prisma.users.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usersUpdateManyAndReturnArgs>(args: SelectSubset<T, usersUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
     */
    upsert<T extends usersUpsertArgs>(args: SelectSubset<T, usersUpsertArgs<ExtArgs>>): Prisma__usersClient<$Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usersGroupByArgs['orderBy'] }
        : { orderBy?: usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the users model
   */
  readonly fields: usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reservation<T extends users$reservationArgs<ExtArgs> = {}>(args?: Subset<T, users$reservationArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reservationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends users$reviewArgs<ExtArgs> = {}>(args?: Subset<T, users$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roles<T extends rolesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, rolesDefaultArgs<ExtArgs>>): Prisma__rolesClient<$Result.GetResult<Prisma.$rolesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the users model
   */
  interface usersFieldRefs {
    readonly user_id: FieldRef<"users", 'Int'>
    readonly role_id: FieldRef<"users", 'Int'>
    readonly first_name: FieldRef<"users", 'String'>
    readonly last_name: FieldRef<"users", 'String'>
    readonly email: FieldRef<"users", 'String'>
    readonly password: FieldRef<"users", 'String'>
    readonly citizen_id: FieldRef<"users", 'String'>
    readonly position: FieldRef<"users", 'String'>
    readonly department: FieldRef<"users", 'String'>
    readonly zip_code: FieldRef<"users", 'Int'>
    readonly created_at: FieldRef<"users", 'DateTime'>
    readonly updated_at: FieldRef<"users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * users findUnique
   */
  export type usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findFirst
   */
  export type usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: usersOrderByWithRelationInput | usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UsersScalarFieldEnum | UsersScalarFieldEnum[]
  }

  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }

  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * users createManyAndReturn
   */
  export type usersCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: usersCreateManyInput | usersCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * users updateManyAndReturn
   */
  export type usersUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }

  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * users.reservation
   */
  export type users$reservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the reservation
     */
    select?: reservationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the reservation
     */
    omit?: reservationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reservationInclude<ExtArgs> | null
    where?: reservationWhereInput
    orderBy?: reservationOrderByWithRelationInput | reservationOrderByWithRelationInput[]
    cursor?: reservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservationScalarFieldEnum | ReservationScalarFieldEnum[]
  }

  /**
   * users.review
   */
  export type users$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * users without action
   */
  export type usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the users
     */
    omit?: usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usersInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    admin_id: 'admin_id',
    role_id: 'role_id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    password: 'password',
    citizen_id: 'citizen_id',
    position: 'position',
    department: 'department',
    zip_code: 'zip_code',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const EquipmentScalarFieldEnum: {
    equipment_id: 'equipment_id',
    room_id: 'room_id',
    equipment_n: 'equipment_n',
    quantity: 'quantity',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type EquipmentScalarFieldEnum = (typeof EquipmentScalarFieldEnum)[keyof typeof EquipmentScalarFieldEnum]


  export const Meeting_roomScalarFieldEnum: {
    room_id: 'room_id',
    room_name: 'room_name',
    capacity: 'capacity',
    location_m: 'location_m',
    status_m: 'status_m',
    image: 'image',
    details_m: 'details_m',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Meeting_roomScalarFieldEnum = (typeof Meeting_roomScalarFieldEnum)[keyof typeof Meeting_roomScalarFieldEnum]


  export const OfficerScalarFieldEnum: {
    officer_id: 'officer_id',
    role_id: 'role_id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    password: 'password',
    citizen_id: 'citizen_id',
    position: 'position',
    department: 'department',
    zip_code: 'zip_code',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OfficerScalarFieldEnum = (typeof OfficerScalarFieldEnum)[keyof typeof OfficerScalarFieldEnum]


  export const ReservationScalarFieldEnum: {
    reservation_id: 'reservation_id',
    user_id: 'user_id',
    room_id: 'room_id',
    start_at: 'start_at',
    end_at: 'end_at',
    start_time: 'start_time',
    end_time: 'end_time',
    status_r: 'status_r',
    officer_id: 'officer_id',
    details_r: 'details_r',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ReservationScalarFieldEnum = (typeof ReservationScalarFieldEnum)[keyof typeof ReservationScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    review_id: 'review_id',
    user_id: 'user_id',
    room_id: 'room_id',
    comment: 'comment',
    rating: 'rating',
    created_at: 'created_at'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    role_id: 'role_id',
    role_name: 'role_name',
    role_status: 'role_status'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    user_id: 'user_id',
    role_id: 'role_id',
    first_name: 'first_name',
    last_name: 'last_name',
    email: 'email',
    password: 'password',
    citizen_id: 'citizen_id',
    position: 'position',
    department: 'department',
    zip_code: 'zip_code',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type adminWhereInput = {
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    admin_id?: IntFilter<"admin"> | number
    role_id?: IntFilter<"admin"> | number
    first_name?: StringFilter<"admin"> | string
    last_name?: StringFilter<"admin"> | string
    email?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    citizen_id?: StringNullableFilter<"admin"> | string | null
    position?: StringNullableFilter<"admin"> | string | null
    department?: StringNullableFilter<"admin"> | string | null
    zip_code?: IntNullableFilter<"admin"> | number | null
    created_at?: DateTimeNullableFilter<"admin"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"admin"> | Date | string | null
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }

  export type adminOrderByWithRelationInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    roles?: rolesOrderByWithRelationInput
  }

  export type adminWhereUniqueInput = Prisma.AtLeast<{
    admin_id?: number
    email?: string
    citizen_id?: string
    AND?: adminWhereInput | adminWhereInput[]
    OR?: adminWhereInput[]
    NOT?: adminWhereInput | adminWhereInput[]
    role_id?: IntFilter<"admin"> | number
    first_name?: StringFilter<"admin"> | string
    last_name?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    position?: StringNullableFilter<"admin"> | string | null
    department?: StringNullableFilter<"admin"> | string | null
    zip_code?: IntNullableFilter<"admin"> | number | null
    created_at?: DateTimeNullableFilter<"admin"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"admin"> | Date | string | null
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }, "admin_id" | "email" | "citizen_id">

  export type adminOrderByWithAggregationInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: adminCountOrderByAggregateInput
    _avg?: adminAvgOrderByAggregateInput
    _max?: adminMaxOrderByAggregateInput
    _min?: adminMinOrderByAggregateInput
    _sum?: adminSumOrderByAggregateInput
  }

  export type adminScalarWhereWithAggregatesInput = {
    AND?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    OR?: adminScalarWhereWithAggregatesInput[]
    NOT?: adminScalarWhereWithAggregatesInput | adminScalarWhereWithAggregatesInput[]
    admin_id?: IntWithAggregatesFilter<"admin"> | number
    role_id?: IntWithAggregatesFilter<"admin"> | number
    first_name?: StringWithAggregatesFilter<"admin"> | string
    last_name?: StringWithAggregatesFilter<"admin"> | string
    email?: StringWithAggregatesFilter<"admin"> | string
    password?: StringWithAggregatesFilter<"admin"> | string
    citizen_id?: StringNullableWithAggregatesFilter<"admin"> | string | null
    position?: StringNullableWithAggregatesFilter<"admin"> | string | null
    department?: StringNullableWithAggregatesFilter<"admin"> | string | null
    zip_code?: IntNullableWithAggregatesFilter<"admin"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"admin"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"admin"> | Date | string | null
  }

  export type equipmentWhereInput = {
    AND?: equipmentWhereInput | equipmentWhereInput[]
    OR?: equipmentWhereInput[]
    NOT?: equipmentWhereInput | equipmentWhereInput[]
    equipment_id?: IntFilter<"equipment"> | number
    room_id?: IntFilter<"equipment"> | number
    equipment_n?: StringFilter<"equipment"> | string
    quantity?: IntFilter<"equipment"> | number
    created_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
    meeting_room?: XOR<Meeting_roomScalarRelationFilter, meeting_roomWhereInput>
  }

  export type equipmentOrderByWithRelationInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    equipment_n?: SortOrder
    quantity?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    meeting_room?: meeting_roomOrderByWithRelationInput
  }

  export type equipmentWhereUniqueInput = Prisma.AtLeast<{
    equipment_id?: number
    AND?: equipmentWhereInput | equipmentWhereInput[]
    OR?: equipmentWhereInput[]
    NOT?: equipmentWhereInput | equipmentWhereInput[]
    room_id?: IntFilter<"equipment"> | number
    equipment_n?: StringFilter<"equipment"> | string
    quantity?: IntFilter<"equipment"> | number
    created_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
    meeting_room?: XOR<Meeting_roomScalarRelationFilter, meeting_roomWhereInput>
  }, "equipment_id">

  export type equipmentOrderByWithAggregationInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    equipment_n?: SortOrder
    quantity?: SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: equipmentCountOrderByAggregateInput
    _avg?: equipmentAvgOrderByAggregateInput
    _max?: equipmentMaxOrderByAggregateInput
    _min?: equipmentMinOrderByAggregateInput
    _sum?: equipmentSumOrderByAggregateInput
  }

  export type equipmentScalarWhereWithAggregatesInput = {
    AND?: equipmentScalarWhereWithAggregatesInput | equipmentScalarWhereWithAggregatesInput[]
    OR?: equipmentScalarWhereWithAggregatesInput[]
    NOT?: equipmentScalarWhereWithAggregatesInput | equipmentScalarWhereWithAggregatesInput[]
    equipment_id?: IntWithAggregatesFilter<"equipment"> | number
    room_id?: IntWithAggregatesFilter<"equipment"> | number
    equipment_n?: StringWithAggregatesFilter<"equipment"> | string
    quantity?: IntWithAggregatesFilter<"equipment"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"equipment"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"equipment"> | Date | string | null
  }

  export type meeting_roomWhereInput = {
    AND?: meeting_roomWhereInput | meeting_roomWhereInput[]
    OR?: meeting_roomWhereInput[]
    NOT?: meeting_roomWhereInput | meeting_roomWhereInput[]
    room_id?: IntFilter<"meeting_room"> | number
    room_name?: StringFilter<"meeting_room"> | string
    capacity?: IntFilter<"meeting_room"> | number
    location_m?: StringFilter<"meeting_room"> | string
    status_m?: StringNullableFilter<"meeting_room"> | string | null
    image?: StringNullableFilter<"meeting_room"> | string | null
    details_m?: StringNullableFilter<"meeting_room"> | string | null
    created_at?: DateTimeNullableFilter<"meeting_room"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"meeting_room"> | Date | string | null
    equipment?: EquipmentListRelationFilter
    reservation?: ReservationListRelationFilter
    review?: ReviewListRelationFilter
  }

  export type meeting_roomOrderByWithRelationInput = {
    room_id?: SortOrder
    room_name?: SortOrder
    capacity?: SortOrder
    location_m?: SortOrder
    status_m?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    details_m?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    equipment?: equipmentOrderByRelationAggregateInput
    reservation?: reservationOrderByRelationAggregateInput
    review?: reviewOrderByRelationAggregateInput
  }

  export type meeting_roomWhereUniqueInput = Prisma.AtLeast<{
    room_id?: number
    AND?: meeting_roomWhereInput | meeting_roomWhereInput[]
    OR?: meeting_roomWhereInput[]
    NOT?: meeting_roomWhereInput | meeting_roomWhereInput[]
    room_name?: StringFilter<"meeting_room"> | string
    capacity?: IntFilter<"meeting_room"> | number
    location_m?: StringFilter<"meeting_room"> | string
    status_m?: StringNullableFilter<"meeting_room"> | string | null
    image?: StringNullableFilter<"meeting_room"> | string | null
    details_m?: StringNullableFilter<"meeting_room"> | string | null
    created_at?: DateTimeNullableFilter<"meeting_room"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"meeting_room"> | Date | string | null
    equipment?: EquipmentListRelationFilter
    reservation?: ReservationListRelationFilter
    review?: ReviewListRelationFilter
  }, "room_id">

  export type meeting_roomOrderByWithAggregationInput = {
    room_id?: SortOrder
    room_name?: SortOrder
    capacity?: SortOrder
    location_m?: SortOrder
    status_m?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    details_m?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: meeting_roomCountOrderByAggregateInput
    _avg?: meeting_roomAvgOrderByAggregateInput
    _max?: meeting_roomMaxOrderByAggregateInput
    _min?: meeting_roomMinOrderByAggregateInput
    _sum?: meeting_roomSumOrderByAggregateInput
  }

  export type meeting_roomScalarWhereWithAggregatesInput = {
    AND?: meeting_roomScalarWhereWithAggregatesInput | meeting_roomScalarWhereWithAggregatesInput[]
    OR?: meeting_roomScalarWhereWithAggregatesInput[]
    NOT?: meeting_roomScalarWhereWithAggregatesInput | meeting_roomScalarWhereWithAggregatesInput[]
    room_id?: IntWithAggregatesFilter<"meeting_room"> | number
    room_name?: StringWithAggregatesFilter<"meeting_room"> | string
    capacity?: IntWithAggregatesFilter<"meeting_room"> | number
    location_m?: StringWithAggregatesFilter<"meeting_room"> | string
    status_m?: StringNullableWithAggregatesFilter<"meeting_room"> | string | null
    image?: StringNullableWithAggregatesFilter<"meeting_room"> | string | null
    details_m?: StringNullableWithAggregatesFilter<"meeting_room"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"meeting_room"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"meeting_room"> | Date | string | null
  }

  export type officerWhereInput = {
    AND?: officerWhereInput | officerWhereInput[]
    OR?: officerWhereInput[]
    NOT?: officerWhereInput | officerWhereInput[]
    officer_id?: IntFilter<"officer"> | number
    role_id?: IntFilter<"officer"> | number
    first_name?: StringFilter<"officer"> | string
    last_name?: StringFilter<"officer"> | string
    email?: StringFilter<"officer"> | string
    password?: StringFilter<"officer"> | string
    citizen_id?: StringNullableFilter<"officer"> | string | null
    position?: StringNullableFilter<"officer"> | string | null
    department?: StringNullableFilter<"officer"> | string | null
    zip_code?: IntNullableFilter<"officer"> | number | null
    created_at?: DateTimeNullableFilter<"officer"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"officer"> | Date | string | null
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
    reservation?: ReservationListRelationFilter
  }

  export type officerOrderByWithRelationInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    roles?: rolesOrderByWithRelationInput
    reservation?: reservationOrderByRelationAggregateInput
  }

  export type officerWhereUniqueInput = Prisma.AtLeast<{
    officer_id?: number
    email?: string
    citizen_id?: string
    AND?: officerWhereInput | officerWhereInput[]
    OR?: officerWhereInput[]
    NOT?: officerWhereInput | officerWhereInput[]
    role_id?: IntFilter<"officer"> | number
    first_name?: StringFilter<"officer"> | string
    last_name?: StringFilter<"officer"> | string
    password?: StringFilter<"officer"> | string
    position?: StringNullableFilter<"officer"> | string | null
    department?: StringNullableFilter<"officer"> | string | null
    zip_code?: IntNullableFilter<"officer"> | number | null
    created_at?: DateTimeNullableFilter<"officer"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"officer"> | Date | string | null
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
    reservation?: ReservationListRelationFilter
  }, "officer_id" | "email" | "citizen_id">

  export type officerOrderByWithAggregationInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: officerCountOrderByAggregateInput
    _avg?: officerAvgOrderByAggregateInput
    _max?: officerMaxOrderByAggregateInput
    _min?: officerMinOrderByAggregateInput
    _sum?: officerSumOrderByAggregateInput
  }

  export type officerScalarWhereWithAggregatesInput = {
    AND?: officerScalarWhereWithAggregatesInput | officerScalarWhereWithAggregatesInput[]
    OR?: officerScalarWhereWithAggregatesInput[]
    NOT?: officerScalarWhereWithAggregatesInput | officerScalarWhereWithAggregatesInput[]
    officer_id?: IntWithAggregatesFilter<"officer"> | number
    role_id?: IntWithAggregatesFilter<"officer"> | number
    first_name?: StringWithAggregatesFilter<"officer"> | string
    last_name?: StringWithAggregatesFilter<"officer"> | string
    email?: StringWithAggregatesFilter<"officer"> | string
    password?: StringWithAggregatesFilter<"officer"> | string
    citizen_id?: StringNullableWithAggregatesFilter<"officer"> | string | null
    position?: StringNullableWithAggregatesFilter<"officer"> | string | null
    department?: StringNullableWithAggregatesFilter<"officer"> | string | null
    zip_code?: IntNullableWithAggregatesFilter<"officer"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"officer"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"officer"> | Date | string | null
  }

  export type reservationWhereInput = {
    AND?: reservationWhereInput | reservationWhereInput[]
    OR?: reservationWhereInput[]
    NOT?: reservationWhereInput | reservationWhereInput[]
    reservation_id?: IntFilter<"reservation"> | number
    user_id?: IntNullableFilter<"reservation"> | number | null
    room_id?: IntNullableFilter<"reservation"> | number | null
    start_at?: DateTimeFilter<"reservation"> | Date | string
    end_at?: DateTimeFilter<"reservation"> | Date | string
    start_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    end_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    status_r?: StringNullableFilter<"reservation"> | string | null
    officer_id?: IntNullableFilter<"reservation"> | number | null
    details_r?: StringNullableFilter<"reservation"> | string | null
    created_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
    officer?: XOR<OfficerNullableScalarRelationFilter, officerWhereInput> | null
    meeting_room?: XOR<Meeting_roomNullableScalarRelationFilter, meeting_roomWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type reservationOrderByWithRelationInput = {
    reservation_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    room_id?: SortOrderInput | SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    start_time?: SortOrderInput | SortOrder
    end_time?: SortOrderInput | SortOrder
    status_r?: SortOrderInput | SortOrder
    officer_id?: SortOrderInput | SortOrder
    details_r?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    officer?: officerOrderByWithRelationInput
    meeting_room?: meeting_roomOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type reservationWhereUniqueInput = Prisma.AtLeast<{
    reservation_id?: number
    AND?: reservationWhereInput | reservationWhereInput[]
    OR?: reservationWhereInput[]
    NOT?: reservationWhereInput | reservationWhereInput[]
    user_id?: IntNullableFilter<"reservation"> | number | null
    room_id?: IntNullableFilter<"reservation"> | number | null
    start_at?: DateTimeFilter<"reservation"> | Date | string
    end_at?: DateTimeFilter<"reservation"> | Date | string
    start_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    end_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    status_r?: StringNullableFilter<"reservation"> | string | null
    officer_id?: IntNullableFilter<"reservation"> | number | null
    details_r?: StringNullableFilter<"reservation"> | string | null
    created_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
    officer?: XOR<OfficerNullableScalarRelationFilter, officerWhereInput> | null
    meeting_room?: XOR<Meeting_roomNullableScalarRelationFilter, meeting_roomWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "reservation_id">

  export type reservationOrderByWithAggregationInput = {
    reservation_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    room_id?: SortOrderInput | SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    start_time?: SortOrderInput | SortOrder
    end_time?: SortOrderInput | SortOrder
    status_r?: SortOrderInput | SortOrder
    officer_id?: SortOrderInput | SortOrder
    details_r?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: reservationCountOrderByAggregateInput
    _avg?: reservationAvgOrderByAggregateInput
    _max?: reservationMaxOrderByAggregateInput
    _min?: reservationMinOrderByAggregateInput
    _sum?: reservationSumOrderByAggregateInput
  }

  export type reservationScalarWhereWithAggregatesInput = {
    AND?: reservationScalarWhereWithAggregatesInput | reservationScalarWhereWithAggregatesInput[]
    OR?: reservationScalarWhereWithAggregatesInput[]
    NOT?: reservationScalarWhereWithAggregatesInput | reservationScalarWhereWithAggregatesInput[]
    reservation_id?: IntWithAggregatesFilter<"reservation"> | number
    user_id?: IntNullableWithAggregatesFilter<"reservation"> | number | null
    room_id?: IntNullableWithAggregatesFilter<"reservation"> | number | null
    start_at?: DateTimeWithAggregatesFilter<"reservation"> | Date | string
    end_at?: DateTimeWithAggregatesFilter<"reservation"> | Date | string
    start_time?: DateTimeNullableWithAggregatesFilter<"reservation"> | Date | string | null
    end_time?: DateTimeNullableWithAggregatesFilter<"reservation"> | Date | string | null
    status_r?: StringNullableWithAggregatesFilter<"reservation"> | string | null
    officer_id?: IntNullableWithAggregatesFilter<"reservation"> | number | null
    details_r?: StringNullableWithAggregatesFilter<"reservation"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"reservation"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"reservation"> | Date | string | null
  }

  export type reviewWhereInput = {
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    review_id?: IntFilter<"review"> | number
    user_id?: IntNullableFilter<"review"> | number | null
    room_id?: IntNullableFilter<"review"> | number | null
    comment?: StringNullableFilter<"review"> | string | null
    rating?: IntNullableFilter<"review"> | number | null
    created_at?: DateTimeNullableFilter<"review"> | Date | string | null
    meeting_room?: XOR<Meeting_roomNullableScalarRelationFilter, meeting_roomWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }

  export type reviewOrderByWithRelationInput = {
    review_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    room_id?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    meeting_room?: meeting_roomOrderByWithRelationInput
    users?: usersOrderByWithRelationInput
  }

  export type reviewWhereUniqueInput = Prisma.AtLeast<{
    review_id?: number
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    user_id?: IntNullableFilter<"review"> | number | null
    room_id?: IntNullableFilter<"review"> | number | null
    comment?: StringNullableFilter<"review"> | string | null
    rating?: IntNullableFilter<"review"> | number | null
    created_at?: DateTimeNullableFilter<"review"> | Date | string | null
    meeting_room?: XOR<Meeting_roomNullableScalarRelationFilter, meeting_roomWhereInput> | null
    users?: XOR<UsersNullableScalarRelationFilter, usersWhereInput> | null
  }, "review_id">

  export type reviewOrderByWithAggregationInput = {
    review_id?: SortOrder
    user_id?: SortOrderInput | SortOrder
    room_id?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    rating?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: reviewCountOrderByAggregateInput
    _avg?: reviewAvgOrderByAggregateInput
    _max?: reviewMaxOrderByAggregateInput
    _min?: reviewMinOrderByAggregateInput
    _sum?: reviewSumOrderByAggregateInput
  }

  export type reviewScalarWhereWithAggregatesInput = {
    AND?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    OR?: reviewScalarWhereWithAggregatesInput[]
    NOT?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    review_id?: IntWithAggregatesFilter<"review"> | number
    user_id?: IntNullableWithAggregatesFilter<"review"> | number | null
    room_id?: IntNullableWithAggregatesFilter<"review"> | number | null
    comment?: StringNullableWithAggregatesFilter<"review"> | string | null
    rating?: IntNullableWithAggregatesFilter<"review"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"review"> | Date | string | null
  }

  export type rolesWhereInput = {
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    role_id?: IntFilter<"roles"> | number
    role_name?: StringFilter<"roles"> | string
    role_status?: StringNullableFilter<"roles"> | string | null
    admin?: AdminListRelationFilter
    officer?: OfficerListRelationFilter
    users?: UsersListRelationFilter
  }

  export type rolesOrderByWithRelationInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_status?: SortOrderInput | SortOrder
    admin?: adminOrderByRelationAggregateInput
    officer?: officerOrderByRelationAggregateInput
    users?: usersOrderByRelationAggregateInput
  }

  export type rolesWhereUniqueInput = Prisma.AtLeast<{
    role_id?: number
    AND?: rolesWhereInput | rolesWhereInput[]
    OR?: rolesWhereInput[]
    NOT?: rolesWhereInput | rolesWhereInput[]
    role_name?: StringFilter<"roles"> | string
    role_status?: StringNullableFilter<"roles"> | string | null
    admin?: AdminListRelationFilter
    officer?: OfficerListRelationFilter
    users?: UsersListRelationFilter
  }, "role_id">

  export type rolesOrderByWithAggregationInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_status?: SortOrderInput | SortOrder
    _count?: rolesCountOrderByAggregateInput
    _avg?: rolesAvgOrderByAggregateInput
    _max?: rolesMaxOrderByAggregateInput
    _min?: rolesMinOrderByAggregateInput
    _sum?: rolesSumOrderByAggregateInput
  }

  export type rolesScalarWhereWithAggregatesInput = {
    AND?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    OR?: rolesScalarWhereWithAggregatesInput[]
    NOT?: rolesScalarWhereWithAggregatesInput | rolesScalarWhereWithAggregatesInput[]
    role_id?: IntWithAggregatesFilter<"roles"> | number
    role_name?: StringWithAggregatesFilter<"roles"> | string
    role_status?: StringNullableWithAggregatesFilter<"roles"> | string | null
  }

  export type usersWhereInput = {
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    user_id?: IntFilter<"users"> | number
    role_id?: IntFilter<"users"> | number
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    citizen_id?: StringNullableFilter<"users"> | string | null
    position?: StringNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    zip_code?: IntNullableFilter<"users"> | number | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    reservation?: ReservationListRelationFilter
    review?: ReviewListRelationFilter
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }

  export type usersOrderByWithRelationInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    reservation?: reservationOrderByRelationAggregateInput
    review?: reviewOrderByRelationAggregateInput
    roles?: rolesOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    email?: string
    citizen_id?: string
    AND?: usersWhereInput | usersWhereInput[]
    OR?: usersWhereInput[]
    NOT?: usersWhereInput | usersWhereInput[]
    role_id?: IntFilter<"users"> | number
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    position?: StringNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    zip_code?: IntNullableFilter<"users"> | number | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
    reservation?: ReservationListRelationFilter
    review?: ReviewListRelationFilter
    roles?: XOR<RolesScalarRelationFilter, rolesWhereInput>
  }, "user_id" | "email" | "citizen_id">

  export type usersOrderByWithAggregationInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _avg?: usersAvgOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
    _sum?: usersSumOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    OR?: usersScalarWhereWithAggregatesInput[]
    NOT?: usersScalarWhereWithAggregatesInput | usersScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"users"> | number
    role_id?: IntWithAggregatesFilter<"users"> | number
    first_name?: StringWithAggregatesFilter<"users"> | string
    last_name?: StringWithAggregatesFilter<"users"> | string
    email?: StringWithAggregatesFilter<"users"> | string
    password?: StringWithAggregatesFilter<"users"> | string
    citizen_id?: StringNullableWithAggregatesFilter<"users"> | string | null
    position?: StringNullableWithAggregatesFilter<"users"> | string | null
    department?: StringNullableWithAggregatesFilter<"users"> | string | null
    zip_code?: IntNullableWithAggregatesFilter<"users"> | number | null
    created_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"users"> | Date | string | null
  }

  export type adminCreateInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    roles: rolesCreateNestedOneWithoutAdminInput
  }

  export type adminUncheckedCreateInput = {
    admin_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type adminUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roles?: rolesUpdateOneRequiredWithoutAdminNestedInput
  }

  export type adminUncheckedUpdateInput = {
    admin_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type adminCreateManyInput = {
    admin_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type adminUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type adminUncheckedUpdateManyInput = {
    admin_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type equipmentCreateInput = {
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meeting_room: meeting_roomCreateNestedOneWithoutEquipmentInput
  }

  export type equipmentUncheckedCreateInput = {
    equipment_id?: number
    room_id: number
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type equipmentUpdateInput = {
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meeting_room?: meeting_roomUpdateOneRequiredWithoutEquipmentNestedInput
  }

  export type equipmentUncheckedUpdateInput = {
    equipment_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type equipmentCreateManyInput = {
    equipment_id?: number
    room_id: number
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type equipmentUpdateManyMutationInput = {
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type equipmentUncheckedUpdateManyInput = {
    equipment_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type meeting_roomCreateInput = {
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentCreateNestedManyWithoutMeeting_roomInput
    reservation?: reservationCreateNestedManyWithoutMeeting_roomInput
    review?: reviewCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomUncheckedCreateInput = {
    room_id?: number
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentUncheckedCreateNestedManyWithoutMeeting_roomInput
    reservation?: reservationUncheckedCreateNestedManyWithoutMeeting_roomInput
    review?: reviewUncheckedCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomUpdateInput = {
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUpdateManyWithoutMeeting_roomNestedInput
    reservation?: reservationUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUpdateManyWithoutMeeting_roomNestedInput
  }

  export type meeting_roomUncheckedUpdateInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUncheckedUpdateManyWithoutMeeting_roomNestedInput
    reservation?: reservationUncheckedUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUncheckedUpdateManyWithoutMeeting_roomNestedInput
  }

  export type meeting_roomCreateManyInput = {
    room_id?: number
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type meeting_roomUpdateManyMutationInput = {
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type meeting_roomUncheckedUpdateManyInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type officerCreateInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    roles: rolesCreateNestedOneWithoutOfficerInput
    reservation?: reservationCreateNestedManyWithoutOfficerInput
  }

  export type officerUncheckedCreateInput = {
    officer_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutOfficerInput
  }

  export type officerUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roles?: rolesUpdateOneRequiredWithoutOfficerNestedInput
    reservation?: reservationUpdateManyWithoutOfficerNestedInput
  }

  export type officerUncheckedUpdateInput = {
    officer_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutOfficerNestedInput
  }

  export type officerCreateManyInput = {
    officer_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type officerUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type officerUncheckedUpdateManyInput = {
    officer_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationCreateInput = {
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    officer?: officerCreateNestedOneWithoutReservationInput
    meeting_room?: meeting_roomCreateNestedOneWithoutReservationInput
    users?: usersCreateNestedOneWithoutReservationInput
  }

  export type reservationUncheckedCreateInput = {
    reservation_id?: number
    user_id?: number | null
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationUpdateInput = {
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    officer?: officerUpdateOneWithoutReservationNestedInput
    meeting_room?: meeting_roomUpdateOneWithoutReservationNestedInput
    users?: usersUpdateOneWithoutReservationNestedInput
  }

  export type reservationUncheckedUpdateInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationCreateManyInput = {
    reservation_id?: number
    user_id?: number | null
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationUpdateManyMutationInput = {
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationUncheckedUpdateManyInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewCreateInput = {
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
    meeting_room?: meeting_roomCreateNestedOneWithoutReviewInput
    users?: usersCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateInput = {
    review_id?: number
    user_id?: number | null
    room_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type reviewUpdateInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meeting_room?: meeting_roomUpdateOneWithoutReviewNestedInput
    users?: usersUpdateOneWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewCreateManyInput = {
    review_id?: number
    user_id?: number | null
    room_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type reviewUpdateManyMutationInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUncheckedUpdateManyInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type rolesCreateInput = {
    role_name: string
    role_status?: string | null
    admin?: adminCreateNestedManyWithoutRolesInput
    officer?: officerCreateNestedManyWithoutRolesInput
    users?: usersCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateInput = {
    role_id?: number
    role_name: string
    role_status?: string | null
    admin?: adminUncheckedCreateNestedManyWithoutRolesInput
    officer?: officerUncheckedCreateNestedManyWithoutRolesInput
    users?: usersUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesUpdateInput = {
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUpdateManyWithoutRolesNestedInput
    officer?: officerUpdateManyWithoutRolesNestedInput
    users?: usersUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateInput = {
    role_id?: IntFieldUpdateOperationsInput | number
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUncheckedUpdateManyWithoutRolesNestedInput
    officer?: officerUncheckedUpdateManyWithoutRolesNestedInput
    users?: usersUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type rolesCreateManyInput = {
    role_id?: number
    role_name: string
    role_status?: string | null
  }

  export type rolesUpdateManyMutationInput = {
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type rolesUncheckedUpdateManyInput = {
    role_id?: IntFieldUpdateOperationsInput | number
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationCreateNestedManyWithoutUsersInput
    review?: reviewCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    user_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutUsersInput
    review?: reviewUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersUpdateInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUpdateManyWithoutUsersNestedInput
    review?: reviewUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutUsersNestedInput
    review?: reviewUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersCreateManyInput = {
    user_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RolesScalarRelationFilter = {
    is?: rolesWhereInput
    isNot?: rolesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type adminCountOrderByAggregateInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type adminAvgOrderByAggregateInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type adminMaxOrderByAggregateInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type adminMinOrderByAggregateInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type adminSumOrderByAggregateInput = {
    admin_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type Meeting_roomScalarRelationFilter = {
    is?: meeting_roomWhereInput
    isNot?: meeting_roomWhereInput
  }

  export type equipmentCountOrderByAggregateInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    equipment_n?: SortOrder
    quantity?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type equipmentAvgOrderByAggregateInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    quantity?: SortOrder
  }

  export type equipmentMaxOrderByAggregateInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    equipment_n?: SortOrder
    quantity?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type equipmentMinOrderByAggregateInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    equipment_n?: SortOrder
    quantity?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type equipmentSumOrderByAggregateInput = {
    equipment_id?: SortOrder
    room_id?: SortOrder
    quantity?: SortOrder
  }

  export type EquipmentListRelationFilter = {
    every?: equipmentWhereInput
    some?: equipmentWhereInput
    none?: equipmentWhereInput
  }

  export type ReservationListRelationFilter = {
    every?: reservationWhereInput
    some?: reservationWhereInput
    none?: reservationWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: reviewWhereInput
    some?: reviewWhereInput
    none?: reviewWhereInput
  }

  export type equipmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type reviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type meeting_roomCountOrderByAggregateInput = {
    room_id?: SortOrder
    room_name?: SortOrder
    capacity?: SortOrder
    location_m?: SortOrder
    status_m?: SortOrder
    image?: SortOrder
    details_m?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomAvgOrderByAggregateInput = {
    room_id?: SortOrder
    capacity?: SortOrder
  }

  export type meeting_roomMaxOrderByAggregateInput = {
    room_id?: SortOrder
    room_name?: SortOrder
    capacity?: SortOrder
    location_m?: SortOrder
    status_m?: SortOrder
    image?: SortOrder
    details_m?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomMinOrderByAggregateInput = {
    room_id?: SortOrder
    room_name?: SortOrder
    capacity?: SortOrder
    location_m?: SortOrder
    status_m?: SortOrder
    image?: SortOrder
    details_m?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type meeting_roomSumOrderByAggregateInput = {
    room_id?: SortOrder
    capacity?: SortOrder
  }

  export type officerCountOrderByAggregateInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type officerAvgOrderByAggregateInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type officerMaxOrderByAggregateInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type officerMinOrderByAggregateInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type officerSumOrderByAggregateInput = {
    officer_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type OfficerNullableScalarRelationFilter = {
    is?: officerWhereInput | null
    isNot?: officerWhereInput | null
  }

  export type Meeting_roomNullableScalarRelationFilter = {
    is?: meeting_roomWhereInput | null
    isNot?: meeting_roomWhereInput | null
  }

  export type UsersNullableScalarRelationFilter = {
    is?: usersWhereInput | null
    isNot?: usersWhereInput | null
  }

  export type reservationCountOrderByAggregateInput = {
    reservation_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status_r?: SortOrder
    officer_id?: SortOrder
    details_r?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reservationAvgOrderByAggregateInput = {
    reservation_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    officer_id?: SortOrder
  }

  export type reservationMaxOrderByAggregateInput = {
    reservation_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status_r?: SortOrder
    officer_id?: SortOrder
    details_r?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reservationMinOrderByAggregateInput = {
    reservation_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    start_at?: SortOrder
    end_at?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    status_r?: SortOrder
    officer_id?: SortOrder
    details_r?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type reservationSumOrderByAggregateInput = {
    reservation_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    officer_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type reviewCountOrderByAggregateInput = {
    review_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
  }

  export type reviewAvgOrderByAggregateInput = {
    review_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    rating?: SortOrder
  }

  export type reviewMaxOrderByAggregateInput = {
    review_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
  }

  export type reviewMinOrderByAggregateInput = {
    review_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    comment?: SortOrder
    rating?: SortOrder
    created_at?: SortOrder
  }

  export type reviewSumOrderByAggregateInput = {
    review_id?: SortOrder
    user_id?: SortOrder
    room_id?: SortOrder
    rating?: SortOrder
  }

  export type AdminListRelationFilter = {
    every?: adminWhereInput
    some?: adminWhereInput
    none?: adminWhereInput
  }

  export type OfficerListRelationFilter = {
    every?: officerWhereInput
    some?: officerWhereInput
    none?: officerWhereInput
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type adminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type officerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type rolesCountOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_status?: SortOrder
  }

  export type rolesAvgOrderByAggregateInput = {
    role_id?: SortOrder
  }

  export type rolesMaxOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_status?: SortOrder
  }

  export type rolesMinOrderByAggregateInput = {
    role_id?: SortOrder
    role_name?: SortOrder
    role_status?: SortOrder
  }

  export type rolesSumOrderByAggregateInput = {
    role_id?: SortOrder
  }

  export type usersCountOrderByAggregateInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersAvgOrderByAggregateInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    citizen_id?: SortOrder
    position?: SortOrder
    department?: SortOrder
    zip_code?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type usersSumOrderByAggregateInput = {
    user_id?: SortOrder
    role_id?: SortOrder
    zip_code?: SortOrder
  }

  export type rolesCreateNestedOneWithoutAdminInput = {
    create?: XOR<rolesCreateWithoutAdminInput, rolesUncheckedCreateWithoutAdminInput>
    connectOrCreate?: rolesCreateOrConnectWithoutAdminInput
    connect?: rolesWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type rolesUpdateOneRequiredWithoutAdminNestedInput = {
    create?: XOR<rolesCreateWithoutAdminInput, rolesUncheckedCreateWithoutAdminInput>
    connectOrCreate?: rolesCreateOrConnectWithoutAdminInput
    upsert?: rolesUpsertWithoutAdminInput
    connect?: rolesWhereUniqueInput
    update?: XOR<XOR<rolesUpdateToOneWithWhereWithoutAdminInput, rolesUpdateWithoutAdminInput>, rolesUncheckedUpdateWithoutAdminInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type meeting_roomCreateNestedOneWithoutEquipmentInput = {
    create?: XOR<meeting_roomCreateWithoutEquipmentInput, meeting_roomUncheckedCreateWithoutEquipmentInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutEquipmentInput
    connect?: meeting_roomWhereUniqueInput
  }

  export type meeting_roomUpdateOneRequiredWithoutEquipmentNestedInput = {
    create?: XOR<meeting_roomCreateWithoutEquipmentInput, meeting_roomUncheckedCreateWithoutEquipmentInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutEquipmentInput
    upsert?: meeting_roomUpsertWithoutEquipmentInput
    connect?: meeting_roomWhereUniqueInput
    update?: XOR<XOR<meeting_roomUpdateToOneWithWhereWithoutEquipmentInput, meeting_roomUpdateWithoutEquipmentInput>, meeting_roomUncheckedUpdateWithoutEquipmentInput>
  }

  export type equipmentCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput> | equipmentCreateWithoutMeeting_roomInput[] | equipmentUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: equipmentCreateOrConnectWithoutMeeting_roomInput | equipmentCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: equipmentCreateManyMeeting_roomInputEnvelope
    connect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
  }

  export type reservationCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput> | reservationCreateWithoutMeeting_roomInput[] | reservationUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutMeeting_roomInput | reservationCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: reservationCreateManyMeeting_roomInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type reviewCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput> | reviewCreateWithoutMeeting_roomInput[] | reviewUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutMeeting_roomInput | reviewCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: reviewCreateManyMeeting_roomInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type equipmentUncheckedCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput> | equipmentCreateWithoutMeeting_roomInput[] | equipmentUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: equipmentCreateOrConnectWithoutMeeting_roomInput | equipmentCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: equipmentCreateManyMeeting_roomInputEnvelope
    connect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
  }

  export type reservationUncheckedCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput> | reservationCreateWithoutMeeting_roomInput[] | reservationUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutMeeting_roomInput | reservationCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: reservationCreateManyMeeting_roomInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type reviewUncheckedCreateNestedManyWithoutMeeting_roomInput = {
    create?: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput> | reviewCreateWithoutMeeting_roomInput[] | reviewUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutMeeting_roomInput | reviewCreateOrConnectWithoutMeeting_roomInput[]
    createMany?: reviewCreateManyMeeting_roomInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type equipmentUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput> | equipmentCreateWithoutMeeting_roomInput[] | equipmentUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: equipmentCreateOrConnectWithoutMeeting_roomInput | equipmentCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: equipmentUpsertWithWhereUniqueWithoutMeeting_roomInput | equipmentUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: equipmentCreateManyMeeting_roomInputEnvelope
    set?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    disconnect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    delete?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    connect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    update?: equipmentUpdateWithWhereUniqueWithoutMeeting_roomInput | equipmentUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: equipmentUpdateManyWithWhereWithoutMeeting_roomInput | equipmentUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: equipmentScalarWhereInput | equipmentScalarWhereInput[]
  }

  export type reservationUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput> | reservationCreateWithoutMeeting_roomInput[] | reservationUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutMeeting_roomInput | reservationCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutMeeting_roomInput | reservationUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: reservationCreateManyMeeting_roomInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutMeeting_roomInput | reservationUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutMeeting_roomInput | reservationUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type reviewUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput> | reviewCreateWithoutMeeting_roomInput[] | reviewUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutMeeting_roomInput | reviewCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutMeeting_roomInput | reviewUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: reviewCreateManyMeeting_roomInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutMeeting_roomInput | reviewUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutMeeting_roomInput | reviewUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type equipmentUncheckedUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput> | equipmentCreateWithoutMeeting_roomInput[] | equipmentUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: equipmentCreateOrConnectWithoutMeeting_roomInput | equipmentCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: equipmentUpsertWithWhereUniqueWithoutMeeting_roomInput | equipmentUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: equipmentCreateManyMeeting_roomInputEnvelope
    set?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    disconnect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    delete?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    connect?: equipmentWhereUniqueInput | equipmentWhereUniqueInput[]
    update?: equipmentUpdateWithWhereUniqueWithoutMeeting_roomInput | equipmentUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: equipmentUpdateManyWithWhereWithoutMeeting_roomInput | equipmentUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: equipmentScalarWhereInput | equipmentScalarWhereInput[]
  }

  export type reservationUncheckedUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput> | reservationCreateWithoutMeeting_roomInput[] | reservationUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutMeeting_roomInput | reservationCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutMeeting_roomInput | reservationUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: reservationCreateManyMeeting_roomInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutMeeting_roomInput | reservationUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutMeeting_roomInput | reservationUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type reviewUncheckedUpdateManyWithoutMeeting_roomNestedInput = {
    create?: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput> | reviewCreateWithoutMeeting_roomInput[] | reviewUncheckedCreateWithoutMeeting_roomInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutMeeting_roomInput | reviewCreateOrConnectWithoutMeeting_roomInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutMeeting_roomInput | reviewUpsertWithWhereUniqueWithoutMeeting_roomInput[]
    createMany?: reviewCreateManyMeeting_roomInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutMeeting_roomInput | reviewUpdateWithWhereUniqueWithoutMeeting_roomInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutMeeting_roomInput | reviewUpdateManyWithWhereWithoutMeeting_roomInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type rolesCreateNestedOneWithoutOfficerInput = {
    create?: XOR<rolesCreateWithoutOfficerInput, rolesUncheckedCreateWithoutOfficerInput>
    connectOrCreate?: rolesCreateOrConnectWithoutOfficerInput
    connect?: rolesWhereUniqueInput
  }

  export type reservationCreateNestedManyWithoutOfficerInput = {
    create?: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput> | reservationCreateWithoutOfficerInput[] | reservationUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutOfficerInput | reservationCreateOrConnectWithoutOfficerInput[]
    createMany?: reservationCreateManyOfficerInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type reservationUncheckedCreateNestedManyWithoutOfficerInput = {
    create?: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput> | reservationCreateWithoutOfficerInput[] | reservationUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutOfficerInput | reservationCreateOrConnectWithoutOfficerInput[]
    createMany?: reservationCreateManyOfficerInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type rolesUpdateOneRequiredWithoutOfficerNestedInput = {
    create?: XOR<rolesCreateWithoutOfficerInput, rolesUncheckedCreateWithoutOfficerInput>
    connectOrCreate?: rolesCreateOrConnectWithoutOfficerInput
    upsert?: rolesUpsertWithoutOfficerInput
    connect?: rolesWhereUniqueInput
    update?: XOR<XOR<rolesUpdateToOneWithWhereWithoutOfficerInput, rolesUpdateWithoutOfficerInput>, rolesUncheckedUpdateWithoutOfficerInput>
  }

  export type reservationUpdateManyWithoutOfficerNestedInput = {
    create?: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput> | reservationCreateWithoutOfficerInput[] | reservationUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutOfficerInput | reservationCreateOrConnectWithoutOfficerInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutOfficerInput | reservationUpsertWithWhereUniqueWithoutOfficerInput[]
    createMany?: reservationCreateManyOfficerInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutOfficerInput | reservationUpdateWithWhereUniqueWithoutOfficerInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutOfficerInput | reservationUpdateManyWithWhereWithoutOfficerInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type reservationUncheckedUpdateManyWithoutOfficerNestedInput = {
    create?: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput> | reservationCreateWithoutOfficerInput[] | reservationUncheckedCreateWithoutOfficerInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutOfficerInput | reservationCreateOrConnectWithoutOfficerInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutOfficerInput | reservationUpsertWithWhereUniqueWithoutOfficerInput[]
    createMany?: reservationCreateManyOfficerInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutOfficerInput | reservationUpdateWithWhereUniqueWithoutOfficerInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutOfficerInput | reservationUpdateManyWithWhereWithoutOfficerInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type officerCreateNestedOneWithoutReservationInput = {
    create?: XOR<officerCreateWithoutReservationInput, officerUncheckedCreateWithoutReservationInput>
    connectOrCreate?: officerCreateOrConnectWithoutReservationInput
    connect?: officerWhereUniqueInput
  }

  export type meeting_roomCreateNestedOneWithoutReservationInput = {
    create?: XOR<meeting_roomCreateWithoutReservationInput, meeting_roomUncheckedCreateWithoutReservationInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutReservationInput
    connect?: meeting_roomWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutReservationInput = {
    create?: XOR<usersCreateWithoutReservationInput, usersUncheckedCreateWithoutReservationInput>
    connectOrCreate?: usersCreateOrConnectWithoutReservationInput
    connect?: usersWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type officerUpdateOneWithoutReservationNestedInput = {
    create?: XOR<officerCreateWithoutReservationInput, officerUncheckedCreateWithoutReservationInput>
    connectOrCreate?: officerCreateOrConnectWithoutReservationInput
    upsert?: officerUpsertWithoutReservationInput
    disconnect?: officerWhereInput | boolean
    delete?: officerWhereInput | boolean
    connect?: officerWhereUniqueInput
    update?: XOR<XOR<officerUpdateToOneWithWhereWithoutReservationInput, officerUpdateWithoutReservationInput>, officerUncheckedUpdateWithoutReservationInput>
  }

  export type meeting_roomUpdateOneWithoutReservationNestedInput = {
    create?: XOR<meeting_roomCreateWithoutReservationInput, meeting_roomUncheckedCreateWithoutReservationInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutReservationInput
    upsert?: meeting_roomUpsertWithoutReservationInput
    disconnect?: meeting_roomWhereInput | boolean
    delete?: meeting_roomWhereInput | boolean
    connect?: meeting_roomWhereUniqueInput
    update?: XOR<XOR<meeting_roomUpdateToOneWithWhereWithoutReservationInput, meeting_roomUpdateWithoutReservationInput>, meeting_roomUncheckedUpdateWithoutReservationInput>
  }

  export type usersUpdateOneWithoutReservationNestedInput = {
    create?: XOR<usersCreateWithoutReservationInput, usersUncheckedCreateWithoutReservationInput>
    connectOrCreate?: usersCreateOrConnectWithoutReservationInput
    upsert?: usersUpsertWithoutReservationInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReservationInput, usersUpdateWithoutReservationInput>, usersUncheckedUpdateWithoutReservationInput>
  }

  export type meeting_roomCreateNestedOneWithoutReviewInput = {
    create?: XOR<meeting_roomCreateWithoutReviewInput, meeting_roomUncheckedCreateWithoutReviewInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutReviewInput
    connect?: meeting_roomWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutReviewInput = {
    create?: XOR<usersCreateWithoutReviewInput, usersUncheckedCreateWithoutReviewInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewInput
    connect?: usersWhereUniqueInput
  }

  export type meeting_roomUpdateOneWithoutReviewNestedInput = {
    create?: XOR<meeting_roomCreateWithoutReviewInput, meeting_roomUncheckedCreateWithoutReviewInput>
    connectOrCreate?: meeting_roomCreateOrConnectWithoutReviewInput
    upsert?: meeting_roomUpsertWithoutReviewInput
    disconnect?: meeting_roomWhereInput | boolean
    delete?: meeting_roomWhereInput | boolean
    connect?: meeting_roomWhereUniqueInput
    update?: XOR<XOR<meeting_roomUpdateToOneWithWhereWithoutReviewInput, meeting_roomUpdateWithoutReviewInput>, meeting_roomUncheckedUpdateWithoutReviewInput>
  }

  export type usersUpdateOneWithoutReviewNestedInput = {
    create?: XOR<usersCreateWithoutReviewInput, usersUncheckedCreateWithoutReviewInput>
    connectOrCreate?: usersCreateOrConnectWithoutReviewInput
    upsert?: usersUpsertWithoutReviewInput
    disconnect?: usersWhereInput | boolean
    delete?: usersWhereInput | boolean
    connect?: usersWhereUniqueInput
    update?: XOR<XOR<usersUpdateToOneWithWhereWithoutReviewInput, usersUpdateWithoutReviewInput>, usersUncheckedUpdateWithoutReviewInput>
  }

  export type adminCreateNestedManyWithoutRolesInput = {
    create?: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput> | adminCreateWithoutRolesInput[] | adminUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: adminCreateOrConnectWithoutRolesInput | adminCreateOrConnectWithoutRolesInput[]
    createMany?: adminCreateManyRolesInputEnvelope
    connect?: adminWhereUniqueInput | adminWhereUniqueInput[]
  }

  export type officerCreateNestedManyWithoutRolesInput = {
    create?: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput> | officerCreateWithoutRolesInput[] | officerUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: officerCreateOrConnectWithoutRolesInput | officerCreateOrConnectWithoutRolesInput[]
    createMany?: officerCreateManyRolesInputEnvelope
    connect?: officerWhereUniqueInput | officerWhereUniqueInput[]
  }

  export type usersCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type adminUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput> | adminCreateWithoutRolesInput[] | adminUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: adminCreateOrConnectWithoutRolesInput | adminCreateOrConnectWithoutRolesInput[]
    createMany?: adminCreateManyRolesInputEnvelope
    connect?: adminWhereUniqueInput | adminWhereUniqueInput[]
  }

  export type officerUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput> | officerCreateWithoutRolesInput[] | officerUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: officerCreateOrConnectWithoutRolesInput | officerCreateOrConnectWithoutRolesInput[]
    createMany?: officerCreateManyRolesInputEnvelope
    connect?: officerWhereUniqueInput | officerWhereUniqueInput[]
  }

  export type usersUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
  }

  export type adminUpdateManyWithoutRolesNestedInput = {
    create?: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput> | adminCreateWithoutRolesInput[] | adminUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: adminCreateOrConnectWithoutRolesInput | adminCreateOrConnectWithoutRolesInput[]
    upsert?: adminUpsertWithWhereUniqueWithoutRolesInput | adminUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: adminCreateManyRolesInputEnvelope
    set?: adminWhereUniqueInput | adminWhereUniqueInput[]
    disconnect?: adminWhereUniqueInput | adminWhereUniqueInput[]
    delete?: adminWhereUniqueInput | adminWhereUniqueInput[]
    connect?: adminWhereUniqueInput | adminWhereUniqueInput[]
    update?: adminUpdateWithWhereUniqueWithoutRolesInput | adminUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: adminUpdateManyWithWhereWithoutRolesInput | adminUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: adminScalarWhereInput | adminScalarWhereInput[]
  }

  export type officerUpdateManyWithoutRolesNestedInput = {
    create?: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput> | officerCreateWithoutRolesInput[] | officerUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: officerCreateOrConnectWithoutRolesInput | officerCreateOrConnectWithoutRolesInput[]
    upsert?: officerUpsertWithWhereUniqueWithoutRolesInput | officerUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: officerCreateManyRolesInputEnvelope
    set?: officerWhereUniqueInput | officerWhereUniqueInput[]
    disconnect?: officerWhereUniqueInput | officerWhereUniqueInput[]
    delete?: officerWhereUniqueInput | officerWhereUniqueInput[]
    connect?: officerWhereUniqueInput | officerWhereUniqueInput[]
    update?: officerUpdateWithWhereUniqueWithoutRolesInput | officerUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: officerUpdateManyWithWhereWithoutRolesInput | officerUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: officerScalarWhereInput | officerScalarWhereInput[]
  }

  export type usersUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type adminUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput> | adminCreateWithoutRolesInput[] | adminUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: adminCreateOrConnectWithoutRolesInput | adminCreateOrConnectWithoutRolesInput[]
    upsert?: adminUpsertWithWhereUniqueWithoutRolesInput | adminUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: adminCreateManyRolesInputEnvelope
    set?: adminWhereUniqueInput | adminWhereUniqueInput[]
    disconnect?: adminWhereUniqueInput | adminWhereUniqueInput[]
    delete?: adminWhereUniqueInput | adminWhereUniqueInput[]
    connect?: adminWhereUniqueInput | adminWhereUniqueInput[]
    update?: adminUpdateWithWhereUniqueWithoutRolesInput | adminUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: adminUpdateManyWithWhereWithoutRolesInput | adminUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: adminScalarWhereInput | adminScalarWhereInput[]
  }

  export type officerUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput> | officerCreateWithoutRolesInput[] | officerUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: officerCreateOrConnectWithoutRolesInput | officerCreateOrConnectWithoutRolesInput[]
    upsert?: officerUpsertWithWhereUniqueWithoutRolesInput | officerUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: officerCreateManyRolesInputEnvelope
    set?: officerWhereUniqueInput | officerWhereUniqueInput[]
    disconnect?: officerWhereUniqueInput | officerWhereUniqueInput[]
    delete?: officerWhereUniqueInput | officerWhereUniqueInput[]
    connect?: officerWhereUniqueInput | officerWhereUniqueInput[]
    update?: officerUpdateWithWhereUniqueWithoutRolesInput | officerUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: officerUpdateManyWithWhereWithoutRolesInput | officerUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: officerScalarWhereInput | officerScalarWhereInput[]
  }

  export type usersUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput> | usersCreateWithoutRolesInput[] | usersUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: usersCreateOrConnectWithoutRolesInput | usersCreateOrConnectWithoutRolesInput[]
    upsert?: usersUpsertWithWhereUniqueWithoutRolesInput | usersUpsertWithWhereUniqueWithoutRolesInput[]
    createMany?: usersCreateManyRolesInputEnvelope
    set?: usersWhereUniqueInput | usersWhereUniqueInput[]
    disconnect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    delete?: usersWhereUniqueInput | usersWhereUniqueInput[]
    connect?: usersWhereUniqueInput | usersWhereUniqueInput[]
    update?: usersUpdateWithWhereUniqueWithoutRolesInput | usersUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: usersUpdateManyWithWhereWithoutRolesInput | usersUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: usersScalarWhereInput | usersScalarWhereInput[]
  }

  export type reservationCreateNestedManyWithoutUsersInput = {
    create?: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput> | reservationCreateWithoutUsersInput[] | reservationUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutUsersInput | reservationCreateOrConnectWithoutUsersInput[]
    createMany?: reservationCreateManyUsersInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type reviewCreateNestedManyWithoutUsersInput = {
    create?: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput> | reviewCreateWithoutUsersInput[] | reviewUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUsersInput | reviewCreateOrConnectWithoutUsersInput[]
    createMany?: reviewCreateManyUsersInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type rolesCreateNestedOneWithoutUsersInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    connect?: rolesWhereUniqueInput
  }

  export type reservationUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput> | reservationCreateWithoutUsersInput[] | reservationUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutUsersInput | reservationCreateOrConnectWithoutUsersInput[]
    createMany?: reservationCreateManyUsersInputEnvelope
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
  }

  export type reviewUncheckedCreateNestedManyWithoutUsersInput = {
    create?: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput> | reviewCreateWithoutUsersInput[] | reviewUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUsersInput | reviewCreateOrConnectWithoutUsersInput[]
    createMany?: reviewCreateManyUsersInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type reservationUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput> | reservationCreateWithoutUsersInput[] | reservationUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutUsersInput | reservationCreateOrConnectWithoutUsersInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutUsersInput | reservationUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reservationCreateManyUsersInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutUsersInput | reservationUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutUsersInput | reservationUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type reviewUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput> | reviewCreateWithoutUsersInput[] | reviewUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUsersInput | reviewCreateOrConnectWithoutUsersInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutUsersInput | reviewUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reviewCreateManyUsersInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutUsersInput | reviewUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutUsersInput | reviewUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type rolesUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    connectOrCreate?: rolesCreateOrConnectWithoutUsersInput
    upsert?: rolesUpsertWithoutUsersInput
    connect?: rolesWhereUniqueInput
    update?: XOR<XOR<rolesUpdateToOneWithWhereWithoutUsersInput, rolesUpdateWithoutUsersInput>, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type reservationUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput> | reservationCreateWithoutUsersInput[] | reservationUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reservationCreateOrConnectWithoutUsersInput | reservationCreateOrConnectWithoutUsersInput[]
    upsert?: reservationUpsertWithWhereUniqueWithoutUsersInput | reservationUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reservationCreateManyUsersInputEnvelope
    set?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    disconnect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    delete?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    connect?: reservationWhereUniqueInput | reservationWhereUniqueInput[]
    update?: reservationUpdateWithWhereUniqueWithoutUsersInput | reservationUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reservationUpdateManyWithWhereWithoutUsersInput | reservationUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reservationScalarWhereInput | reservationScalarWhereInput[]
  }

  export type reviewUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput> | reviewCreateWithoutUsersInput[] | reviewUncheckedCreateWithoutUsersInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUsersInput | reviewCreateOrConnectWithoutUsersInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutUsersInput | reviewUpsertWithWhereUniqueWithoutUsersInput[]
    createMany?: reviewCreateManyUsersInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutUsersInput | reviewUpdateWithWhereUniqueWithoutUsersInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutUsersInput | reviewUpdateManyWithWhereWithoutUsersInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type rolesCreateWithoutAdminInput = {
    role_name: string
    role_status?: string | null
    officer?: officerCreateNestedManyWithoutRolesInput
    users?: usersCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateWithoutAdminInput = {
    role_id?: number
    role_name: string
    role_status?: string | null
    officer?: officerUncheckedCreateNestedManyWithoutRolesInput
    users?: usersUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesCreateOrConnectWithoutAdminInput = {
    where: rolesWhereUniqueInput
    create: XOR<rolesCreateWithoutAdminInput, rolesUncheckedCreateWithoutAdminInput>
  }

  export type rolesUpsertWithoutAdminInput = {
    update: XOR<rolesUpdateWithoutAdminInput, rolesUncheckedUpdateWithoutAdminInput>
    create: XOR<rolesCreateWithoutAdminInput, rolesUncheckedCreateWithoutAdminInput>
    where?: rolesWhereInput
  }

  export type rolesUpdateToOneWithWhereWithoutAdminInput = {
    where?: rolesWhereInput
    data: XOR<rolesUpdateWithoutAdminInput, rolesUncheckedUpdateWithoutAdminInput>
  }

  export type rolesUpdateWithoutAdminInput = {
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    officer?: officerUpdateManyWithoutRolesNestedInput
    users?: usersUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateWithoutAdminInput = {
    role_id?: IntFieldUpdateOperationsInput | number
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    officer?: officerUncheckedUpdateManyWithoutRolesNestedInput
    users?: usersUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type meeting_roomCreateWithoutEquipmentInput = {
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationCreateNestedManyWithoutMeeting_roomInput
    review?: reviewCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomUncheckedCreateWithoutEquipmentInput = {
    room_id?: number
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutMeeting_roomInput
    review?: reviewUncheckedCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomCreateOrConnectWithoutEquipmentInput = {
    where: meeting_roomWhereUniqueInput
    create: XOR<meeting_roomCreateWithoutEquipmentInput, meeting_roomUncheckedCreateWithoutEquipmentInput>
  }

  export type meeting_roomUpsertWithoutEquipmentInput = {
    update: XOR<meeting_roomUpdateWithoutEquipmentInput, meeting_roomUncheckedUpdateWithoutEquipmentInput>
    create: XOR<meeting_roomCreateWithoutEquipmentInput, meeting_roomUncheckedCreateWithoutEquipmentInput>
    where?: meeting_roomWhereInput
  }

  export type meeting_roomUpdateToOneWithWhereWithoutEquipmentInput = {
    where?: meeting_roomWhereInput
    data: XOR<meeting_roomUpdateWithoutEquipmentInput, meeting_roomUncheckedUpdateWithoutEquipmentInput>
  }

  export type meeting_roomUpdateWithoutEquipmentInput = {
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUpdateManyWithoutMeeting_roomNestedInput
  }

  export type meeting_roomUncheckedUpdateWithoutEquipmentInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUncheckedUpdateManyWithoutMeeting_roomNestedInput
  }

  export type equipmentCreateWithoutMeeting_roomInput = {
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type equipmentUncheckedCreateWithoutMeeting_roomInput = {
    equipment_id?: number
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type equipmentCreateOrConnectWithoutMeeting_roomInput = {
    where: equipmentWhereUniqueInput
    create: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput>
  }

  export type equipmentCreateManyMeeting_roomInputEnvelope = {
    data: equipmentCreateManyMeeting_roomInput | equipmentCreateManyMeeting_roomInput[]
    skipDuplicates?: boolean
  }

  export type reservationCreateWithoutMeeting_roomInput = {
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    officer?: officerCreateNestedOneWithoutReservationInput
    users?: usersCreateNestedOneWithoutReservationInput
  }

  export type reservationUncheckedCreateWithoutMeeting_roomInput = {
    reservation_id?: number
    user_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationCreateOrConnectWithoutMeeting_roomInput = {
    where: reservationWhereUniqueInput
    create: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput>
  }

  export type reservationCreateManyMeeting_roomInputEnvelope = {
    data: reservationCreateManyMeeting_roomInput | reservationCreateManyMeeting_roomInput[]
    skipDuplicates?: boolean
  }

  export type reviewCreateWithoutMeeting_roomInput = {
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
    users?: usersCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutMeeting_roomInput = {
    review_id?: number
    user_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type reviewCreateOrConnectWithoutMeeting_roomInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput>
  }

  export type reviewCreateManyMeeting_roomInputEnvelope = {
    data: reviewCreateManyMeeting_roomInput | reviewCreateManyMeeting_roomInput[]
    skipDuplicates?: boolean
  }

  export type equipmentUpsertWithWhereUniqueWithoutMeeting_roomInput = {
    where: equipmentWhereUniqueInput
    update: XOR<equipmentUpdateWithoutMeeting_roomInput, equipmentUncheckedUpdateWithoutMeeting_roomInput>
    create: XOR<equipmentCreateWithoutMeeting_roomInput, equipmentUncheckedCreateWithoutMeeting_roomInput>
  }

  export type equipmentUpdateWithWhereUniqueWithoutMeeting_roomInput = {
    where: equipmentWhereUniqueInput
    data: XOR<equipmentUpdateWithoutMeeting_roomInput, equipmentUncheckedUpdateWithoutMeeting_roomInput>
  }

  export type equipmentUpdateManyWithWhereWithoutMeeting_roomInput = {
    where: equipmentScalarWhereInput
    data: XOR<equipmentUpdateManyMutationInput, equipmentUncheckedUpdateManyWithoutMeeting_roomInput>
  }

  export type equipmentScalarWhereInput = {
    AND?: equipmentScalarWhereInput | equipmentScalarWhereInput[]
    OR?: equipmentScalarWhereInput[]
    NOT?: equipmentScalarWhereInput | equipmentScalarWhereInput[]
    equipment_id?: IntFilter<"equipment"> | number
    room_id?: IntFilter<"equipment"> | number
    equipment_n?: StringFilter<"equipment"> | string
    quantity?: IntFilter<"equipment"> | number
    created_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"equipment"> | Date | string | null
  }

  export type reservationUpsertWithWhereUniqueWithoutMeeting_roomInput = {
    where: reservationWhereUniqueInput
    update: XOR<reservationUpdateWithoutMeeting_roomInput, reservationUncheckedUpdateWithoutMeeting_roomInput>
    create: XOR<reservationCreateWithoutMeeting_roomInput, reservationUncheckedCreateWithoutMeeting_roomInput>
  }

  export type reservationUpdateWithWhereUniqueWithoutMeeting_roomInput = {
    where: reservationWhereUniqueInput
    data: XOR<reservationUpdateWithoutMeeting_roomInput, reservationUncheckedUpdateWithoutMeeting_roomInput>
  }

  export type reservationUpdateManyWithWhereWithoutMeeting_roomInput = {
    where: reservationScalarWhereInput
    data: XOR<reservationUpdateManyMutationInput, reservationUncheckedUpdateManyWithoutMeeting_roomInput>
  }

  export type reservationScalarWhereInput = {
    AND?: reservationScalarWhereInput | reservationScalarWhereInput[]
    OR?: reservationScalarWhereInput[]
    NOT?: reservationScalarWhereInput | reservationScalarWhereInput[]
    reservation_id?: IntFilter<"reservation"> | number
    user_id?: IntNullableFilter<"reservation"> | number | null
    room_id?: IntNullableFilter<"reservation"> | number | null
    start_at?: DateTimeFilter<"reservation"> | Date | string
    end_at?: DateTimeFilter<"reservation"> | Date | string
    start_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    end_time?: DateTimeNullableFilter<"reservation"> | Date | string | null
    status_r?: StringNullableFilter<"reservation"> | string | null
    officer_id?: IntNullableFilter<"reservation"> | number | null
    details_r?: StringNullableFilter<"reservation"> | string | null
    created_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"reservation"> | Date | string | null
  }

  export type reviewUpsertWithWhereUniqueWithoutMeeting_roomInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutMeeting_roomInput, reviewUncheckedUpdateWithoutMeeting_roomInput>
    create: XOR<reviewCreateWithoutMeeting_roomInput, reviewUncheckedCreateWithoutMeeting_roomInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutMeeting_roomInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutMeeting_roomInput, reviewUncheckedUpdateWithoutMeeting_roomInput>
  }

  export type reviewUpdateManyWithWhereWithoutMeeting_roomInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutMeeting_roomInput>
  }

  export type reviewScalarWhereInput = {
    AND?: reviewScalarWhereInput | reviewScalarWhereInput[]
    OR?: reviewScalarWhereInput[]
    NOT?: reviewScalarWhereInput | reviewScalarWhereInput[]
    review_id?: IntFilter<"review"> | number
    user_id?: IntNullableFilter<"review"> | number | null
    room_id?: IntNullableFilter<"review"> | number | null
    comment?: StringNullableFilter<"review"> | string | null
    rating?: IntNullableFilter<"review"> | number | null
    created_at?: DateTimeNullableFilter<"review"> | Date | string | null
  }

  export type rolesCreateWithoutOfficerInput = {
    role_name: string
    role_status?: string | null
    admin?: adminCreateNestedManyWithoutRolesInput
    users?: usersCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateWithoutOfficerInput = {
    role_id?: number
    role_name: string
    role_status?: string | null
    admin?: adminUncheckedCreateNestedManyWithoutRolesInput
    users?: usersUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesCreateOrConnectWithoutOfficerInput = {
    where: rolesWhereUniqueInput
    create: XOR<rolesCreateWithoutOfficerInput, rolesUncheckedCreateWithoutOfficerInput>
  }

  export type reservationCreateWithoutOfficerInput = {
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    meeting_room?: meeting_roomCreateNestedOneWithoutReservationInput
    users?: usersCreateNestedOneWithoutReservationInput
  }

  export type reservationUncheckedCreateWithoutOfficerInput = {
    reservation_id?: number
    user_id?: number | null
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationCreateOrConnectWithoutOfficerInput = {
    where: reservationWhereUniqueInput
    create: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput>
  }

  export type reservationCreateManyOfficerInputEnvelope = {
    data: reservationCreateManyOfficerInput | reservationCreateManyOfficerInput[]
    skipDuplicates?: boolean
  }

  export type rolesUpsertWithoutOfficerInput = {
    update: XOR<rolesUpdateWithoutOfficerInput, rolesUncheckedUpdateWithoutOfficerInput>
    create: XOR<rolesCreateWithoutOfficerInput, rolesUncheckedCreateWithoutOfficerInput>
    where?: rolesWhereInput
  }

  export type rolesUpdateToOneWithWhereWithoutOfficerInput = {
    where?: rolesWhereInput
    data: XOR<rolesUpdateWithoutOfficerInput, rolesUncheckedUpdateWithoutOfficerInput>
  }

  export type rolesUpdateWithoutOfficerInput = {
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUpdateManyWithoutRolesNestedInput
    users?: usersUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateWithoutOfficerInput = {
    role_id?: IntFieldUpdateOperationsInput | number
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUncheckedUpdateManyWithoutRolesNestedInput
    users?: usersUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type reservationUpsertWithWhereUniqueWithoutOfficerInput = {
    where: reservationWhereUniqueInput
    update: XOR<reservationUpdateWithoutOfficerInput, reservationUncheckedUpdateWithoutOfficerInput>
    create: XOR<reservationCreateWithoutOfficerInput, reservationUncheckedCreateWithoutOfficerInput>
  }

  export type reservationUpdateWithWhereUniqueWithoutOfficerInput = {
    where: reservationWhereUniqueInput
    data: XOR<reservationUpdateWithoutOfficerInput, reservationUncheckedUpdateWithoutOfficerInput>
  }

  export type reservationUpdateManyWithWhereWithoutOfficerInput = {
    where: reservationScalarWhereInput
    data: XOR<reservationUpdateManyMutationInput, reservationUncheckedUpdateManyWithoutOfficerInput>
  }

  export type officerCreateWithoutReservationInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    roles: rolesCreateNestedOneWithoutOfficerInput
  }

  export type officerUncheckedCreateWithoutReservationInput = {
    officer_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type officerCreateOrConnectWithoutReservationInput = {
    where: officerWhereUniqueInput
    create: XOR<officerCreateWithoutReservationInput, officerUncheckedCreateWithoutReservationInput>
  }

  export type meeting_roomCreateWithoutReservationInput = {
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentCreateNestedManyWithoutMeeting_roomInput
    review?: reviewCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomUncheckedCreateWithoutReservationInput = {
    room_id?: number
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentUncheckedCreateNestedManyWithoutMeeting_roomInput
    review?: reviewUncheckedCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomCreateOrConnectWithoutReservationInput = {
    where: meeting_roomWhereUniqueInput
    create: XOR<meeting_roomCreateWithoutReservationInput, meeting_roomUncheckedCreateWithoutReservationInput>
  }

  export type usersCreateWithoutReservationInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    review?: reviewCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutReservationInput = {
    user_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    review?: reviewUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutReservationInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReservationInput, usersUncheckedCreateWithoutReservationInput>
  }

  export type officerUpsertWithoutReservationInput = {
    update: XOR<officerUpdateWithoutReservationInput, officerUncheckedUpdateWithoutReservationInput>
    create: XOR<officerCreateWithoutReservationInput, officerUncheckedCreateWithoutReservationInput>
    where?: officerWhereInput
  }

  export type officerUpdateToOneWithWhereWithoutReservationInput = {
    where?: officerWhereInput
    data: XOR<officerUpdateWithoutReservationInput, officerUncheckedUpdateWithoutReservationInput>
  }

  export type officerUpdateWithoutReservationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roles?: rolesUpdateOneRequiredWithoutOfficerNestedInput
  }

  export type officerUncheckedUpdateWithoutReservationInput = {
    officer_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type meeting_roomUpsertWithoutReservationInput = {
    update: XOR<meeting_roomUpdateWithoutReservationInput, meeting_roomUncheckedUpdateWithoutReservationInput>
    create: XOR<meeting_roomCreateWithoutReservationInput, meeting_roomUncheckedCreateWithoutReservationInput>
    where?: meeting_roomWhereInput
  }

  export type meeting_roomUpdateToOneWithWhereWithoutReservationInput = {
    where?: meeting_roomWhereInput
    data: XOR<meeting_roomUpdateWithoutReservationInput, meeting_roomUncheckedUpdateWithoutReservationInput>
  }

  export type meeting_roomUpdateWithoutReservationInput = {
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUpdateManyWithoutMeeting_roomNestedInput
  }

  export type meeting_roomUncheckedUpdateWithoutReservationInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUncheckedUpdateManyWithoutMeeting_roomNestedInput
    review?: reviewUncheckedUpdateManyWithoutMeeting_roomNestedInput
  }

  export type usersUpsertWithoutReservationInput = {
    update: XOR<usersUpdateWithoutReservationInput, usersUncheckedUpdateWithoutReservationInput>
    create: XOR<usersCreateWithoutReservationInput, usersUncheckedCreateWithoutReservationInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReservationInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReservationInput, usersUncheckedUpdateWithoutReservationInput>
  }

  export type usersUpdateWithoutReservationInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    review?: reviewUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutReservationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    review?: reviewUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type meeting_roomCreateWithoutReviewInput = {
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentCreateNestedManyWithoutMeeting_roomInput
    reservation?: reservationCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomUncheckedCreateWithoutReviewInput = {
    room_id?: number
    room_name: string
    capacity: number
    location_m: string
    status_m?: string | null
    image?: string | null
    details_m?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    equipment?: equipmentUncheckedCreateNestedManyWithoutMeeting_roomInput
    reservation?: reservationUncheckedCreateNestedManyWithoutMeeting_roomInput
  }

  export type meeting_roomCreateOrConnectWithoutReviewInput = {
    where: meeting_roomWhereUniqueInput
    create: XOR<meeting_roomCreateWithoutReviewInput, meeting_roomUncheckedCreateWithoutReviewInput>
  }

  export type usersCreateWithoutReviewInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationCreateNestedManyWithoutUsersInput
    roles: rolesCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutReviewInput = {
    user_id?: number
    role_id: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutReviewInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutReviewInput, usersUncheckedCreateWithoutReviewInput>
  }

  export type meeting_roomUpsertWithoutReviewInput = {
    update: XOR<meeting_roomUpdateWithoutReviewInput, meeting_roomUncheckedUpdateWithoutReviewInput>
    create: XOR<meeting_roomCreateWithoutReviewInput, meeting_roomUncheckedCreateWithoutReviewInput>
    where?: meeting_roomWhereInput
  }

  export type meeting_roomUpdateToOneWithWhereWithoutReviewInput = {
    where?: meeting_roomWhereInput
    data: XOR<meeting_roomUpdateWithoutReviewInput, meeting_roomUncheckedUpdateWithoutReviewInput>
  }

  export type meeting_roomUpdateWithoutReviewInput = {
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUpdateManyWithoutMeeting_roomNestedInput
    reservation?: reservationUpdateManyWithoutMeeting_roomNestedInput
  }

  export type meeting_roomUncheckedUpdateWithoutReviewInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_name?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location_m?: StringFieldUpdateOperationsInput | string
    status_m?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    details_m?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    equipment?: equipmentUncheckedUpdateManyWithoutMeeting_roomNestedInput
    reservation?: reservationUncheckedUpdateManyWithoutMeeting_roomNestedInput
  }

  export type usersUpsertWithoutReviewInput = {
    update: XOR<usersUpdateWithoutReviewInput, usersUncheckedUpdateWithoutReviewInput>
    create: XOR<usersCreateWithoutReviewInput, usersUncheckedCreateWithoutReviewInput>
    where?: usersWhereInput
  }

  export type usersUpdateToOneWithWhereWithoutReviewInput = {
    where?: usersWhereInput
    data: XOR<usersUpdateWithoutReviewInput, usersUncheckedUpdateWithoutReviewInput>
  }

  export type usersUpdateWithoutReviewInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUpdateManyWithoutUsersNestedInput
    roles?: rolesUpdateOneRequiredWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutReviewInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    role_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type adminCreateWithoutRolesInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type adminUncheckedCreateWithoutRolesInput = {
    admin_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type adminCreateOrConnectWithoutRolesInput = {
    where: adminWhereUniqueInput
    create: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput>
  }

  export type adminCreateManyRolesInputEnvelope = {
    data: adminCreateManyRolesInput | adminCreateManyRolesInput[]
    skipDuplicates?: boolean
  }

  export type officerCreateWithoutRolesInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationCreateNestedManyWithoutOfficerInput
  }

  export type officerUncheckedCreateWithoutRolesInput = {
    officer_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutOfficerInput
  }

  export type officerCreateOrConnectWithoutRolesInput = {
    where: officerWhereUniqueInput
    create: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput>
  }

  export type officerCreateManyRolesInputEnvelope = {
    data: officerCreateManyRolesInput | officerCreateManyRolesInput[]
    skipDuplicates?: boolean
  }

  export type usersCreateWithoutRolesInput = {
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationCreateNestedManyWithoutUsersInput
    review?: reviewCreateNestedManyWithoutUsersInput
  }

  export type usersUncheckedCreateWithoutRolesInput = {
    user_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    reservation?: reservationUncheckedCreateNestedManyWithoutUsersInput
    review?: reviewUncheckedCreateNestedManyWithoutUsersInput
  }

  export type usersCreateOrConnectWithoutRolesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersCreateManyRolesInputEnvelope = {
    data: usersCreateManyRolesInput | usersCreateManyRolesInput[]
    skipDuplicates?: boolean
  }

  export type adminUpsertWithWhereUniqueWithoutRolesInput = {
    where: adminWhereUniqueInput
    update: XOR<adminUpdateWithoutRolesInput, adminUncheckedUpdateWithoutRolesInput>
    create: XOR<adminCreateWithoutRolesInput, adminUncheckedCreateWithoutRolesInput>
  }

  export type adminUpdateWithWhereUniqueWithoutRolesInput = {
    where: adminWhereUniqueInput
    data: XOR<adminUpdateWithoutRolesInput, adminUncheckedUpdateWithoutRolesInput>
  }

  export type adminUpdateManyWithWhereWithoutRolesInput = {
    where: adminScalarWhereInput
    data: XOR<adminUpdateManyMutationInput, adminUncheckedUpdateManyWithoutRolesInput>
  }

  export type adminScalarWhereInput = {
    AND?: adminScalarWhereInput | adminScalarWhereInput[]
    OR?: adminScalarWhereInput[]
    NOT?: adminScalarWhereInput | adminScalarWhereInput[]
    admin_id?: IntFilter<"admin"> | number
    role_id?: IntFilter<"admin"> | number
    first_name?: StringFilter<"admin"> | string
    last_name?: StringFilter<"admin"> | string
    email?: StringFilter<"admin"> | string
    password?: StringFilter<"admin"> | string
    citizen_id?: StringNullableFilter<"admin"> | string | null
    position?: StringNullableFilter<"admin"> | string | null
    department?: StringNullableFilter<"admin"> | string | null
    zip_code?: IntNullableFilter<"admin"> | number | null
    created_at?: DateTimeNullableFilter<"admin"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"admin"> | Date | string | null
  }

  export type officerUpsertWithWhereUniqueWithoutRolesInput = {
    where: officerWhereUniqueInput
    update: XOR<officerUpdateWithoutRolesInput, officerUncheckedUpdateWithoutRolesInput>
    create: XOR<officerCreateWithoutRolesInput, officerUncheckedCreateWithoutRolesInput>
  }

  export type officerUpdateWithWhereUniqueWithoutRolesInput = {
    where: officerWhereUniqueInput
    data: XOR<officerUpdateWithoutRolesInput, officerUncheckedUpdateWithoutRolesInput>
  }

  export type officerUpdateManyWithWhereWithoutRolesInput = {
    where: officerScalarWhereInput
    data: XOR<officerUpdateManyMutationInput, officerUncheckedUpdateManyWithoutRolesInput>
  }

  export type officerScalarWhereInput = {
    AND?: officerScalarWhereInput | officerScalarWhereInput[]
    OR?: officerScalarWhereInput[]
    NOT?: officerScalarWhereInput | officerScalarWhereInput[]
    officer_id?: IntFilter<"officer"> | number
    role_id?: IntFilter<"officer"> | number
    first_name?: StringFilter<"officer"> | string
    last_name?: StringFilter<"officer"> | string
    email?: StringFilter<"officer"> | string
    password?: StringFilter<"officer"> | string
    citizen_id?: StringNullableFilter<"officer"> | string | null
    position?: StringNullableFilter<"officer"> | string | null
    department?: StringNullableFilter<"officer"> | string | null
    zip_code?: IntNullableFilter<"officer"> | number | null
    created_at?: DateTimeNullableFilter<"officer"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"officer"> | Date | string | null
  }

  export type usersUpsertWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
    create: XOR<usersCreateWithoutRolesInput, usersUncheckedCreateWithoutRolesInput>
  }

  export type usersUpdateWithWhereUniqueWithoutRolesInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutRolesInput, usersUncheckedUpdateWithoutRolesInput>
  }

  export type usersUpdateManyWithWhereWithoutRolesInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutRolesInput>
  }

  export type usersScalarWhereInput = {
    AND?: usersScalarWhereInput | usersScalarWhereInput[]
    OR?: usersScalarWhereInput[]
    NOT?: usersScalarWhereInput | usersScalarWhereInput[]
    user_id?: IntFilter<"users"> | number
    role_id?: IntFilter<"users"> | number
    first_name?: StringFilter<"users"> | string
    last_name?: StringFilter<"users"> | string
    email?: StringFilter<"users"> | string
    password?: StringFilter<"users"> | string
    citizen_id?: StringNullableFilter<"users"> | string | null
    position?: StringNullableFilter<"users"> | string | null
    department?: StringNullableFilter<"users"> | string | null
    zip_code?: IntNullableFilter<"users"> | number | null
    created_at?: DateTimeNullableFilter<"users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"users"> | Date | string | null
  }

  export type reservationCreateWithoutUsersInput = {
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    officer?: officerCreateNestedOneWithoutReservationInput
    meeting_room?: meeting_roomCreateNestedOneWithoutReservationInput
  }

  export type reservationUncheckedCreateWithoutUsersInput = {
    reservation_id?: number
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationCreateOrConnectWithoutUsersInput = {
    where: reservationWhereUniqueInput
    create: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput>
  }

  export type reservationCreateManyUsersInputEnvelope = {
    data: reservationCreateManyUsersInput | reservationCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type reviewCreateWithoutUsersInput = {
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
    meeting_room?: meeting_roomCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutUsersInput = {
    review_id?: number
    room_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type reviewCreateOrConnectWithoutUsersInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput>
  }

  export type reviewCreateManyUsersInputEnvelope = {
    data: reviewCreateManyUsersInput | reviewCreateManyUsersInput[]
    skipDuplicates?: boolean
  }

  export type rolesCreateWithoutUsersInput = {
    role_name: string
    role_status?: string | null
    admin?: adminCreateNestedManyWithoutRolesInput
    officer?: officerCreateNestedManyWithoutRolesInput
  }

  export type rolesUncheckedCreateWithoutUsersInput = {
    role_id?: number
    role_name: string
    role_status?: string | null
    admin?: adminUncheckedCreateNestedManyWithoutRolesInput
    officer?: officerUncheckedCreateNestedManyWithoutRolesInput
  }

  export type rolesCreateOrConnectWithoutUsersInput = {
    where: rolesWhereUniqueInput
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
  }

  export type reservationUpsertWithWhereUniqueWithoutUsersInput = {
    where: reservationWhereUniqueInput
    update: XOR<reservationUpdateWithoutUsersInput, reservationUncheckedUpdateWithoutUsersInput>
    create: XOR<reservationCreateWithoutUsersInput, reservationUncheckedCreateWithoutUsersInput>
  }

  export type reservationUpdateWithWhereUniqueWithoutUsersInput = {
    where: reservationWhereUniqueInput
    data: XOR<reservationUpdateWithoutUsersInput, reservationUncheckedUpdateWithoutUsersInput>
  }

  export type reservationUpdateManyWithWhereWithoutUsersInput = {
    where: reservationScalarWhereInput
    data: XOR<reservationUpdateManyMutationInput, reservationUncheckedUpdateManyWithoutUsersInput>
  }

  export type reviewUpsertWithWhereUniqueWithoutUsersInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutUsersInput, reviewUncheckedUpdateWithoutUsersInput>
    create: XOR<reviewCreateWithoutUsersInput, reviewUncheckedCreateWithoutUsersInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutUsersInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutUsersInput, reviewUncheckedUpdateWithoutUsersInput>
  }

  export type reviewUpdateManyWithWhereWithoutUsersInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutUsersInput>
  }

  export type rolesUpsertWithoutUsersInput = {
    update: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
    create: XOR<rolesCreateWithoutUsersInput, rolesUncheckedCreateWithoutUsersInput>
    where?: rolesWhereInput
  }

  export type rolesUpdateToOneWithWhereWithoutUsersInput = {
    where?: rolesWhereInput
    data: XOR<rolesUpdateWithoutUsersInput, rolesUncheckedUpdateWithoutUsersInput>
  }

  export type rolesUpdateWithoutUsersInput = {
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUpdateManyWithoutRolesNestedInput
    officer?: officerUpdateManyWithoutRolesNestedInput
  }

  export type rolesUncheckedUpdateWithoutUsersInput = {
    role_id?: IntFieldUpdateOperationsInput | number
    role_name?: StringFieldUpdateOperationsInput | string
    role_status?: NullableStringFieldUpdateOperationsInput | string | null
    admin?: adminUncheckedUpdateManyWithoutRolesNestedInput
    officer?: officerUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type equipmentCreateManyMeeting_roomInput = {
    equipment_id?: number
    equipment_n: string
    quantity: number
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationCreateManyMeeting_roomInput = {
    reservation_id?: number
    user_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reviewCreateManyMeeting_roomInput = {
    review_id?: number
    user_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type equipmentUpdateWithoutMeeting_roomInput = {
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type equipmentUncheckedUpdateWithoutMeeting_roomInput = {
    equipment_id?: IntFieldUpdateOperationsInput | number
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type equipmentUncheckedUpdateManyWithoutMeeting_roomInput = {
    equipment_id?: IntFieldUpdateOperationsInput | number
    equipment_n?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationUpdateWithoutMeeting_roomInput = {
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    officer?: officerUpdateOneWithoutReservationNestedInput
    users?: usersUpdateOneWithoutReservationNestedInput
  }

  export type reservationUncheckedUpdateWithoutMeeting_roomInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationUncheckedUpdateManyWithoutMeeting_roomInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUpdateWithoutMeeting_roomInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    users?: usersUpdateOneWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutMeeting_roomInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUncheckedUpdateManyWithoutMeeting_roomInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationCreateManyOfficerInput = {
    reservation_id?: number
    user_id?: number | null
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reservationUpdateWithoutOfficerInput = {
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meeting_room?: meeting_roomUpdateOneWithoutReservationNestedInput
    users?: usersUpdateOneWithoutReservationNestedInput
  }

  export type reservationUncheckedUpdateWithoutOfficerInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationUncheckedUpdateManyWithoutOfficerInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    user_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type adminCreateManyRolesInput = {
    admin_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type officerCreateManyRolesInput = {
    officer_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type usersCreateManyRolesInput = {
    user_id?: number
    first_name: string
    last_name: string
    email: string
    password: string
    citizen_id?: string | null
    position?: string | null
    department?: string | null
    zip_code?: number | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type adminUpdateWithoutRolesInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type adminUncheckedUpdateWithoutRolesInput = {
    admin_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type adminUncheckedUpdateManyWithoutRolesInput = {
    admin_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type officerUpdateWithoutRolesInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUpdateManyWithoutOfficerNestedInput
  }

  export type officerUncheckedUpdateWithoutRolesInput = {
    officer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutOfficerNestedInput
  }

  export type officerUncheckedUpdateManyWithoutRolesInput = {
    officer_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUpdateWithoutRolesInput = {
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUpdateManyWithoutUsersNestedInput
    review?: reviewUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateWithoutRolesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    reservation?: reservationUncheckedUpdateManyWithoutUsersNestedInput
    review?: reviewUncheckedUpdateManyWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateManyWithoutRolesInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    citizen_id?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationCreateManyUsersInput = {
    reservation_id?: number
    room_id?: number | null
    start_at: Date | string
    end_at: Date | string
    start_time?: Date | string | null
    end_time?: Date | string | null
    status_r?: string | null
    officer_id?: number | null
    details_r?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type reviewCreateManyUsersInput = {
    review_id?: number
    room_id?: number | null
    comment?: string | null
    rating?: number | null
    created_at?: Date | string | null
  }

  export type reservationUpdateWithoutUsersInput = {
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    officer?: officerUpdateOneWithoutReservationNestedInput
    meeting_room?: meeting_roomUpdateOneWithoutReservationNestedInput
  }

  export type reservationUncheckedUpdateWithoutUsersInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reservationUncheckedUpdateManyWithoutUsersInput = {
    reservation_id?: IntFieldUpdateOperationsInput | number
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    start_at?: DateTimeFieldUpdateOperationsInput | Date | string
    end_at?: DateTimeFieldUpdateOperationsInput | Date | string
    start_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status_r?: NullableStringFieldUpdateOperationsInput | string | null
    officer_id?: NullableIntFieldUpdateOperationsInput | number | null
    details_r?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUpdateWithoutUsersInput = {
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    meeting_room?: meeting_roomUpdateOneWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutUsersInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUncheckedUpdateManyWithoutUsersInput = {
    review_id?: IntFieldUpdateOperationsInput | number
    room_id?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}