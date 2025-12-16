export type LogLevel =
  | "info"
  | "debug"
  | "error"
  | "warn"
  | "verbose"
  | "silly"
  | false

export interface UserConfig {
  logLevel?: LogLevel
  ipcLogLevel?: LogLevel
  traceApiCalls?: boolean
}
