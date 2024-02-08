export function getDeepCopy<TypeObject>(obj: TypeObject) {
  return JSON.parse(JSON.stringify(obj)) as TypeObject;
}
