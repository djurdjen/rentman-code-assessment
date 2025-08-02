export function mapColumnData<T extends Record<string, any>>(payload: { columns: string[], data: any[][] }): T[] {
  return payload.data.map((item) => item.reduce((obj, item, key) => {
      const colItemMatch = payload.columns[key]
      return { ...obj, ...(colItemMatch ? { [colItemMatch]: item } : {}) }
    }, <T>{})
  )
}