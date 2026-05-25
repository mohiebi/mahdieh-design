import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/brief-questions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::index
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:15
 * @route '/admin/brief-questions'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/brief-questions/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::create
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:24
 * @route '/admin/brief-questions/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::store
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:40
 * @route '/admin/brief-questions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/brief-questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::store
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:40
 * @route '/admin/brief-questions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::store
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:40
 * @route '/admin/brief-questions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::store
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:40
 * @route '/admin/brief-questions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::store
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:40
 * @route '/admin/brief-questions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
export const edit = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/brief-questions/{brief_question}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
edit.url = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { brief_question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { brief_question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    brief_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        brief_question: typeof args.brief_question === 'object'
                ? args.brief_question.id
                : args.brief_question,
                }

    return edit.definition.url
            .replace('{brief_question}', parsedArgs.brief_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
edit.get = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
edit.head = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
    const editForm = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
        editForm.get = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::edit
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:49
 * @route '/admin/brief-questions/{brief_question}/edit'
 */
        editForm.head = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
export const update = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/brief-questions/{brief_question}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
update.url = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { brief_question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { brief_question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    brief_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        brief_question: typeof args.brief_question === 'object'
                ? args.brief_question.id
                : args.brief_question,
                }

    return update.definition.url
            .replace('{brief_question}', parsedArgs.brief_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
update.put = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
update.patch = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
    const updateForm = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
        updateForm.put = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::update
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:66
 * @route '/admin/brief-questions/{brief_question}'
 */
        updateForm.patch = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::destroy
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:75
 * @route '/admin/brief-questions/{brief_question}'
 */
export const destroy = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/brief-questions/{brief_question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::destroy
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:75
 * @route '/admin/brief-questions/{brief_question}'
 */
destroy.url = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { brief_question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { brief_question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    brief_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        brief_question: typeof args.brief_question === 'object'
                ? args.brief_question.id
                : args.brief_question,
                }

    return destroy.definition.url
            .replace('{brief_question}', parsedArgs.brief_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefQuestionController::destroy
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:75
 * @route '/admin/brief-questions/{brief_question}'
 */
destroy.delete = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::destroy
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:75
 * @route '/admin/brief-questions/{brief_question}'
 */
    const destroyForm = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefQuestionController::destroy
 * @see app/Http/Controllers/Admin/BriefQuestionController.php:75
 * @route '/admin/brief-questions/{brief_question}'
 */
        destroyForm.delete = (args: { brief_question: string | number | { id: string | number } } | [brief_question: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const briefQuestions = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default briefQuestions