import React from 'react'
// import ids from 'virtual:svg-icons-names'

/**
 * 判断svg 是否为项目内部
 * @param path
 * @returns
 */
function isExternal(path) {
	return /^(https?:|mailto:|tel:)/.test(path)
}

// const requireAll = (requireContext) => requireContext.keys().map(requireContext)

const SvgIcon = () => {
	// const symbolId = `#${prefix}-${name}`
	// console.log('--> symbolId:', symbolId)
	// const symbolId = `#${name}`
	// const logoSvg = require('./svg/article-create.svg')
	return (
		<>
			<svg width="200" height="100" aria-hidden="true">
				{/* <use href={`#icon-svg-article-create`} fill={'#333'} /> */}
				{/* <use xlinkHref={'#icon-article-ranking'}></use> */}
				<use xlinkHref={'/src/assets/images/svg#article-ranking'}></use>
			</svg>
		</>
	)
}

export default SvgIcon
