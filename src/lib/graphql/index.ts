import {
  ObjectType,
  getCustomRepository,
  Repository,
  getRepository
} from 'typeorm'
import DataLoader from 'dataloader'

export interface CreateDataLoaderOptions {
  method?: string
  key?: string
  multiple?: boolean
}

/**
 * Creates a new dataloader with the typeorm repository
 */
export function createDataLoader<T>(
  obj: ObjectType<T>,
  options: CreateDataLoaderOptions = {}
): DataLoader<any, any> {
  let repository: Repository<T>
  try {
    repository = getCustomRepository<Repository<any>>(obj)
  } catch (errRepo) {
    try {
      repository = getRepository(obj)
    } catch (errModel) {
      throw new Error(
        'Could not create a dataloder. obj is neither a model nor a repository'
      )
    }
  }

  return new DataLoader(async (ids: ReadonlyArray<number>) => {
    let items = []
    if (options.method) {
      items = await repository[options.method](ids)
    } else {
      // @ts-ignore
      items = await repository.findByIds(ids)
    }

    const handleBatch = (arr: any[]) =>
      options.multiple === true ? arr : arr[0]
    return ids.map(id =>
      handleBatch(items.filter(item => item[options.key || 'id'] === id))
    )
  })
}
