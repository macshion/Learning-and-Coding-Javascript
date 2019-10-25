import React,{useState,useEffect,useRef} from 'react'

const useTitleHook = (title) => {
	useEffect(() => {
		document.title = title
	},[title])
}


const App = (props) => {
	let [title,setTitle] = useState('hello')
	useTitleHook(title)
	return (
		<div >
			sss
			<input value={title} onChange={(e) => setTitle(e.target.value)}/>
		</div>
	)
}

export default App
