/**
 * Hashmin - A tiny library for client-side routing with URL hashes
 * Copyright(c) 2018 bukharim96 https://www.github.com/bukharim96
 *
*/

class Hashmin {
	constructor() {
		let locationObject = top.location.hash

		this.currentHash = locationObject.split('').splice(1, locationObject.length).join('')
		this.origin = this.currentHash.split('/')[0]
		this.url = location.href

		this.anchorFriendly()
	}

	anchorFriendly() {
		let anchors = document.querySelectorAll('[route]')
		let ref = this

		anchors.forEach(function(a, i) {
			a.onclick = function(e) {
				// Prevent page from reloading
				e.preventDefault()

				// Set page hash
				location.hash = '#' + this.attributes.route.value

				// Allocate hash into memory
				ref.currentHash = this.attributes.route.value
			}
		})
	}

	when(hashPath, whenHashMatchCallback) {
		/**
		 * Hashmin Route Params Algorithm
		 * Copyright(c) 2018 undefinedbuddy https://www.github.com/undefinedbuddy
		*/

		let
			// Cache current state
			cachedState = this.currentHash.split('/'),
			// Radical might just change so extra lookups are saved
			radical = ':',
			// Setup clean params object
			params = Object.create(null),
			// Stores all route params and their indices releative to cachedState
			mappedParameters = [],
			// Array collection of all paths with undefined values
			parametersLiteral = hashPath.split('/').filter((path, index) => {
				if (path.indexOf(radical) > -1) {
					mappedParameters[index] = { id: index, path: path.replace(':', '') }
				}
			}),
			// Sort out the params and remove any undefined values
			filteredParameters = mappedParameters.filter((mappedParam) => !!mappedParam),
			// Setting up internal uninterpretedHash for testing when binding callback to path str
			uninterpretedHash = ''

		// Set params
		filteredParameters.forEach((fp) => {
			// Path name: fp.path
			// Path value (from URL): cachedState[fp.id]

			// Populate params object
			params[fp.path] = cachedState[fp.id]
		})

		filteredParameters.forEach((fp) => {
			cachedState.splice(fp.id, 1, `:${fp.path}`)

			uninterpretedHash = cachedState.join('/')
		})
		// Expose params query order
		this.__paramsQuery = uninterpretedHash


		// If query path matches current path the problem is that it will interpret
		// the route params as a path
		
		// And there we go!
		if (hashPath === uninterpretedHash) {
			whenHashMatchCallback.bind(this)(params)
		}
	}

	bind(hashPath) {
		let boundPath = '/' + hashPath,
			origin = this.currentHash.split('/')[0]

		// Origin path has to exist
		if (origin) {
			// When path is not set to required path i.e hashPath
			if (location.hash !== this.currentHash + boundPath) {
				location.hash = origin + boundPath
			}
		}

		return boundPath
	}
}