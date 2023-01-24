
export function mappingDocument<T>(collectionInserted: any): T {
  const { _id, __v, ...collectionWithoutId } = collectionInserted.toObject()!

  const collection = Object.assign({}, collectionWithoutId, { id: _id.toString() })

  return collection
}
