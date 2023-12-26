import React, { useState } from 'react'

const Theme = () => {
	const [visible, setVisible] = useState<boolean>(false)
	return (
		<>
			<i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					setVisible(true)
				}}
			></i>
		</>
	)
}

export default Theme
