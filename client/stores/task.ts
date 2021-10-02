// Step 9: Create SyncMap template

import { defineSyncMap } from '@logux/client'
import { TaskValue } from '../../protocol'

export const Task = defineSyncMap<TaskValue>('tasks')
