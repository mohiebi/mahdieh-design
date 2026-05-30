import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/brief',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BriefController::show
 * @see app/Http/Controllers/BriefController.php:16
 * @route '/brief'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\BriefController::store
 * @see app/Http/Controllers/BriefController.php:26
 * @route '/brief'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/brief',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BriefController::store
 * @see app/Http/Controllers/BriefController.php:26
 * @route '/brief'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BriefController::store
 * @see app/Http/Controllers/BriefController.php:26
 * @route '/brief'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BriefController::store
 * @see app/Http/Controllers/BriefController.php:26
 * @route '/brief'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BriefController::store
 * @see app/Http/Controllers/BriefController.php:26
 * @route '/brief'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const BriefController = { show, store }

export default BriefController