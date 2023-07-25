'use client'

import dynamic from "next/dynamic"
import { useState, useEffect, useRef } from "react"
import Graph from "./components/graph"
import { ToastContainer } from "react-toastify"
import { useRouter } from "next/navigation"
const Note = dynamic(() => import('./components/note'), {
	ssr: false,
})

export interface Wiki {
	id: number;
	title: string;
}

export interface Relation {
	source: number;
	target: number;
}

export default function Write() {
	const [currentWiki, setCurrentWiki] = useState<Wiki | null>(null);
	const _createWiki = useRef<() => Promise<void>>();
	const _saveWiki = useRef<(id: number, title: string, content: any) => Promise<void>>();
	const _closeWiki = useRef<() => void>();

	const router = useRouter();

	return (
		<>
			<div className="relative w-screen min-w-[350px] h-screen flex tablet:grid tablet:grid-cols-2">
				{
					currentWiki ?

						<div className="relative flex flex-col w-full h-full pb-20 phone:pt-8 phone:px-12">
							<input value={currentWiki.title} onChange={e => {
								setCurrentWiki({ ...currentWiki, title: e.target.value });
							}} className="w-full font-noto font-semibold p-4 text-[230%] focus:outline-none" type="text" placeholder="제목을 입력하세요" />
							<div className="w-full p-4">
								<div className="mb-4 bg-black bg-opacity-70 w-16 h-[6px]"></div>
							</div>

							<Note currentWiki={currentWiki} />
							<div className="absolute bottom-0 left-0 z-10 flex justify-between w-full px-4 py-4 text-lg shadow-2xl h-fit shadow-black font-noto">
								<button onClick={() => router.back()} className="px-4 py-2 rounded-md whitespace-nowrap hover:bg-gray-100">
									⬅ 나가기
								</button>
								<div className="flex gap-x-4">
									<button className="px-4 py-2 text-white bg-red-300 rounded-md whitespace-nowrap hover:bg-opacity-80"
										onClick={() => { _saveWiki.current?.(currentWiki.id, currentWiki.title, localStorage.getItem(currentWiki.id.toString())); }} >
										저장하기
									</button>
								</div>
							</div>
							<button className="absolute top-5 right-5" onClick={() => _closeWiki.current?.()}>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						:
						/**
						 * 어떤 글도 선택되지 않았을 때 새로운 위키 만들기
						 */
						<div id="makeNewWiki" className="relative flex items-center justify-center w-full h-full text-center cursor-pointer"
							onClick={() => _createWiki.current?.()}>
							<span className="relative">
								<span className="absolute w-3 h-3 rounded-full opacity-75 -top-2 -right-3 animate-ping bg-[orange]"></span>
								<span className="absolute w-3 h-3 rounded-full opacity-75 -top-2 -right-3 bg-[orange]"></span>
								<h3 className="text-2xl font-noto-sans-kr">새로운 위키 만들기 +</h3>
							</span>
						</div>
				}
				<div className="relative hidden w-full tablet:block">
					<Graph _createWiki={_createWiki} _saveWiki={_saveWiki} _closeWiki={_closeWiki} setCurrentWiki={setCurrentWiki} />
				</div>
			</div>
			<ToastContainer
				className="absolute"
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</>
	)
}