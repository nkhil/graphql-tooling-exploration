// @ts-expect-error TS7016
import avaGetPortImport from '../../get-port.cjs'

export async function getPort (): Promise<number> {
  const { default: avaGetPort } = await (avaGetPortImport as Promise<{
    default: typeof import('@ava/get-port').default
  }>)
  return avaGetPort()
}
