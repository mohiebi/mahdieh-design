import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/brief-submissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::index
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:15
 * @route '/admin/brief-submissions'
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
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
export const show = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/brief-submissions/{briefSubmission}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
show.url = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { briefSubmission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { briefSubmission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    briefSubmission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        briefSubmission: typeof args.briefSubmission === 'object'
                ? args.briefSubmission.id
                : args.briefSubmission,
                }

    return show.definition.url
            .replace('{briefSubmission}', parsedArgs.briefSubmission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
show.get = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
show.head = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
    const showForm = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
        showForm.get = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::show
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:33
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
        showForm.head = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::update
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:56
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
export const update = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/admin/brief-submissions/{briefSubmission}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::update
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:56
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
update.url = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { briefSubmission: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { briefSubmission: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    briefSubmission: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        briefSubmission: typeof args.briefSubmission === 'object'
                ? args.briefSubmission.id
                : args.briefSubmission,
                }

    return update.definition.url
            .replace('{briefSubmission}', parsedArgs.briefSubmission.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::update
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:56
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
update.patch = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::update
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:56
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
    const updateForm = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\BriefSubmissionController::update
 * @see app/Http/Controllers/Admin/BriefSubmissionController.php:56
 * @route '/admin/brief-submissions/{briefSubmission}'
 */
        updateForm.patch = (args: { briefSubmission: string | number | { id: string | number } } | [briefSubmission: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const BriefSubmissionController = { index, show, update }

export default BriefSubmissionController